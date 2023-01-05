import { describe, expect, it } from "vitest";
import { convertExternalId } from "../../src/utils/addItems";

describe("convertExternalId", () => {
  it("prefixes with the source name and a underscore", () => {
    expect(convertExternalId("SourceName", "someId")).toBe("SourceName_someId");
  });
});
