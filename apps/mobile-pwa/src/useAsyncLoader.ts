import { useEffect, useState } from "react";

export const useAsyncLoader = <TData>(asyncFn: () => Promise<TData>, deps: any[] = []) => {
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<TData | null>(null);

  useEffect(() => {
    asyncFn()
      .then((data) => setData(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, deps);

  return [data, loading, error] as const;
};
