import { describe, expect, it } from "vitest";
import { studyMethods } from "./studyMethods";

describe("study methods catalogue", () => {
  it("keeps the approved ten-method order", () => {
    expect(studyMethods.map(method => method.id)).toEqual([
      "feynman",
      "multimedia-segmented",
      "huberman-study-protocol",
      "retrieval-practice",
      "spaced-practice",
      "successive-relearning",
      "interleaved-practice",
      "self-explanation",
      "worked-examples",
      "woop-mcii",
    ]);
    expect(studyMethods.map(method => method.order)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ]);
  });

  it("provides seven journal steps and three to five sources per method", () => {
    for (const method of studyMethods) {
      expect(method.steps).toHaveLength(7);
      expect(method.sources.length).toBeGreaterThanOrEqual(3);
      expect(method.sources.length).toBeLessThanOrEqual(5);
    }
  });

  it("uses unique IDs and valid external source URLs", () => {
    expect(new Set(studyMethods.map(method => method.id)).size).toBe(
      studyMethods.length
    );
    for (const source of studyMethods.flatMap(method => method.sources)) {
      expect(new URL(source.url).protocol).toBe("https:");
    }
  });
});
