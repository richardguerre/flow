import { describe, it, expect } from "vitest";
import { pluralize } from "../../src/utils/pluralize";

describe("pluralize", () => {
  it("should return the singular form if the count is 1", () => {
    expect(pluralize("apple", 1)).toBe("apple");
  });

  it("should return the plural form if the count is not 1", () => {
    expect(pluralize("apple", 2)).toBe("apples");
  });
});
