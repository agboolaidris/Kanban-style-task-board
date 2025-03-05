import { generateUniqueId } from "../generateId";

describe("generateUniqueId", () => {
  it("should generate a unique identifier string", () => {
    const id = generateUniqueId();
    expect(typeof id).toBe("string");
    expect(id).toMatch(/^[a-z0-9]+-[a-z0-9]+$/);
  });

  it("should generate different identifiers for subsequent calls", () => {
    const id1 = generateUniqueId();
    const id2 = generateUniqueId();
    expect(id1).not.toBe(id2);
  });

  it("should include a base-36 encoded timestamp", () => {
    const id = generateUniqueId();
    const [timestamp] = id.split("-");
    const decodedTimestamp = parseInt(timestamp, 36);
    expect(decodedTimestamp).toBeLessThanOrEqual(Date.now());
  });

  it("should include a random part of length 8", () => {
    const id = generateUniqueId();
    const [, randomPart] = id.split("-");
    expect(randomPart.length).toBe(8);
  });
});
