import { describe, expect, test } from "bun:test";
import { parseInput, solve, solve2 } from "./solution";

test("Parse Input", () => {
  const input = ``;
  const result = parseInput(input);
  expect(result).toEqual([]);
});

describe("Part 1", () => {
  test("Example", () => {
    const input = ``;
    const result = solve(input);
    expect(result).toBe(0);
  });
});

describe("Part 2", () => {
  test("Example", () => {
    const input = ``;
    const result = solve2(input);
    expect(result).toBe(0);
  });
});
