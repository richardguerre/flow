import { describe, expect, it } from "vitest";
import { convertExternalId } from "../../src/utils/addExternalItems";

describe("convertExternalId", () => {
  it("prefixes with the source name and a colon", () => {
    expect(convertExternalId("SourceName", "someId")).toBe("SourceName:someId");
  });
});
