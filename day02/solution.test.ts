import { describe, expect, test } from "bun:test";
import {
  getInvalidIds,
  getInvalidIds2,
  parseInput,
  solve,
  solve2,
} from "./solution";

test("Parse Input", () => {
  const input = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
1698522-1698528,446443-446449,38593856-38593862,565653-565659,
824824821-824824827,2121212118-2121212124`;
  const result = parseInput(input);
  expect(result).toEqual([
    "11-22",
    "95-115",
    "998-1012",
    "1188511880-1188511890",
    "222220-222224",
    "1698522-1698528",
    "446443-446449",
    "38593856-38593862",
    "565653-565659",
    "824824821-824824827",
    "2121212118-2121212124",
  ]);
});

describe("Part 1", () => {
  test("Example", () => {
    const input = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
1698522-1698528,446443-446449,38593856-38593862,565653-565659,
824824821-824824827,2121212118-2121212124`;
    const result = solve(input);
    expect(result).toBe(1227775554);
  });

  describe("get invalid numbers", () => {
    test("Example 1", () => {
      const input = ["11-22"];
      const result = getInvalidIds(input);
      expect(result).toEqual([11, 22]);
    });

    test("Example 2", () => {
      const input = ["95-115"];
      const result = getInvalidIds(input);
      expect(result).toEqual([99]);
    });

    test("Example 3", () => {
      const input = ["998-1012"];
      const result = getInvalidIds(input);
      expect(result).toEqual([1010]);
    });

    test("Example 4", () => {
      const input = ["1188511880-1188511890"];
      const result = getInvalidIds(input);
      expect(result).toEqual([1188511885]);
    });

    test("Example 5", () => {
      const input = ["222220-222224"];
      const result = getInvalidIds(input);
      expect(result).toEqual([222222]);
    });

    test("Example 6", () => {
      const input = ["1698522-1698528"];
      const result = getInvalidIds(input);
      expect(result).toEqual([]);
    });

    test("Example 7", () => {
      const input = ["446443-446449"];
      const result = getInvalidIds(input);
      expect(result).toEqual([446446]);
    });

    test("Example 8", () => {
      const input = ["38593856-38593862"];
      const result = getInvalidIds(input);
      expect(result).toEqual([38593859]);
    });
  });
});

describe("Part 2", () => {
  describe("get invalid numbers", () => {
    test("Example 1", () => {
      const input = ["11-22"];
      const result = getInvalidIds2(input);
      expect(result).toEqual([11, 22]);
    });

    test("Example 2", () => {
      const input = ["95-115"];
      const result = getInvalidIds2(input);
      expect(result).toEqual([99, 111]);
    });

    test("Example 3", () => {
      const input = ["998-1012"];
      const result = getInvalidIds2(input);
      expect(result).toEqual([999, 1010]);
    });

    test("565653-565659", () => {
      const input = ["565653-565659"];
      const result = getInvalidIds2(input);
      expect(result).toEqual([565656]);
    });

    test("824824821-824824827", () => {
      const input = ["824824821-824824827"];
      const result = getInvalidIds2(input);
      expect(result).toEqual([824824824]);
    });

    test("2121212118-2121212124", () => {
      const input = ["2121212118-2121212124"];
      const result = getInvalidIds2(input);
      expect(result).toEqual([2121212121]);
    });

    test("Example 4", () => {
      const input = ["1188511880-1188511890"];
      const result = getInvalidIds2(input);
      expect(result).toEqual([1188511885]);
    });

    test("Example 5", () => {
      const input = ["222220-222224"];
      const result = getInvalidIds2(input);
      expect(result).toEqual([222222]);
    });

    test("Example 6", () => {
      const input = ["1698522-1698528"];
      const result = getInvalidIds2(input);
      expect(result).toEqual([]);
    });

    test("Example 7", () => {
      const input = ["446443-446449"];
      const result = getInvalidIds2(input);
      expect(result).toEqual([446446]);
    });

    test("Example 8", () => {
      const input = ["38593856-38593862"];
      const result = getInvalidIds2(input);
      expect(result).toEqual([38593859]);
    });
  });
  test("Example", () => {
    const input = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
1698522-1698528,446443-446449,38593856-38593862,565653-565659,
824824821-824824827,2121212118-2121212124`;
    const result = solve2(input);
    expect(result).toBe(4174379265);
  });
});
