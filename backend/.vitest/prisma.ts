// inspired by https://github.com/prisma/prisma/issues/12458#issuecomment-1253936442
import { PrismaClient } from "@prisma/client";
import { afterEach, beforeEach, vi } from "vitest";
import * as prismaUtils from "../src/utils/prisma";
import packageJson from "../../package.json";

type CtorParams<C> = C extends new (...args: infer P) => any ? P[0] : never;
type TxClient = Parameters<Parameters<PrismaClient["$transaction"]>[0]>[0];
const ROLLBACK = { [Symbol.for("prisma.client.extension.rollback")]: true };
const PRISMA_ROLLBACK_MSG = "Prisma Client ROLLBACK";

const $begin = async (client: PrismaClient, data?: { txId: number }) => {
  let captureInnerPrismaTxClient: (txClient: TxClient) => void;
  let commit: () => void;
  let rollback: () => void;

  // a promise for getting the tx inner client
  const txClient = new Promise<TxClient>((res) => {
    captureInnerPrismaTxClient = (txClient) => res(txClient);
  });

  // a promise for controlling the transaction
  const controlTxPromise = new Promise((res, rej) => {
    commit = () => {
      console.log(`Commit called, resolving for ${data?.txId}`);
      res(undefined);
    };
    rollback = () => rej(ROLLBACK);
  });

  // opening a transaction to control externally
  const prismaTranactionResult = client.$transaction((prismaTxClient) => {
    captureInnerPrismaTxClient(prismaTxClient);

    return controlTxPromise.catch((e) => {
      if (e === ROLLBACK) throw new Error(PRISMA_ROLLBACK_MSG);
      throw e;
    });
  });

  const capturedPrismaTxClient = await txClient;

  return {
    txId: data?.txId,
    $commit: async () => {
      commit();
      await prismaTranactionResult;
    },
    $rollback: async () => {
      rollback();
      await prismaTranactionResult.catch((err) => {
        if (err.message !== PRISMA_ROLLBACK_MSG) {
          console.log(`Rollback txn, cause: ${err}`);
        }
      });
    },
    $transaction: client.$transaction,
    // @ts-ignore as Prisma doesn't expose internal methods in their types
    _hasPreviewFlag: client._hasPreviewFlag,
    // @ts-ignore as Prisma doesn't expose internal methods in their types
    _transactionWithCallback: client._transactionWithCallback,
    ...capturedPrismaTxClient,
    $executeRaw: capturedPrismaTxClient.$executeRaw,
    $executeRawUnsafe: capturedPrismaTxClient.$executeRawUnsafe,
  };
};

// patches the prisma client with a $begin method
function getTxClient(options?: CtorParams<typeof PrismaClient>) {
  const client = new PrismaClient(options);

  return Object.assign(client, {
    $begin: () => $begin(client),
  }) as PrismaClient & { $begin: () => ReturnType<typeof $begin> };
}

const prismaTestClient = getTxClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL?.replace(packageJson.name, `${packageJson.name}_test`) ?? "",
    },
  },
});

// ------------ setup and teardown ------------

const prismaMock = vi.spyOn(prismaUtils, "prisma", "get");
export const withDb = () => {
  let prismaTxClient: any;
  beforeEach(async () => {
    prismaTxClient = await prismaTestClient.$begin();
    prismaMock.mockReturnValue(prismaTxClient);
  });

  afterEach(async () => {
    await prismaTxClient.$rollback();
  });
};
