import { describe, expect, test } from "bun:test";
import { getJoltage, getJoltage2, parseInput, solve, solve2 } from "./solution";

const input = `
987654321111111
811111111111119
234234234234278
818181911112111
`;

test("Parse Input", () => {
  const result = parseInput(input);
  expect(result).toEqual([
    "987654321111111",
    "811111111111119",
    "234234234234278",
    "818181911112111",
  ]);
});

describe("Part 1", () => {
  test("line 1", () => {
    const lines = parseInput(input);
    const res = getJoltage(lines[0] ?? "");
    expect(res).toBe(98);
  });
  test("line 2", () => {
    const lines = parseInput(input);
    const res = getJoltage(lines[1] ?? "");
    expect(res).toBe(89);
  });
  test("line 3", () => {
    const lines = parseInput(input);
    const res = getJoltage(lines[2] ?? "");
    expect(res).toBe(78);
  });
  test("line 4", () => {
    const lines = parseInput(input);
    const res = getJoltage(lines[3] ?? "");
    expect(res).toBe(92);
  });
  test("Example", () => {
    const result = solve(input);
    expect(result).toBe(357);
  });
});

describe("Part 2", () => {
  test("line 1", () => {
    const lines = parseInput(input);
    const res = getJoltage2(lines[0] ?? "");
    expect(res).toBe(987654321111);
  });
  test("line 2", () => {
    const lines = parseInput(input);
    const res = getJoltage2(lines[1] ?? "");
    expect(res).toBe(811111111119);
  });
  test("line 3", () => {
    const lines = parseInput(input);
    const res = getJoltage2(lines[2] ?? "");
    expect(res).toBe(434234234278);
  });
  test("line 4", () => {
    const lines = parseInput(input);
    const res = getJoltage2(lines[3] ?? "");
    expect(res).toBe(888911112111);
  });
  test("Example", () => {
    const result = solve2(input);
    expect(result).toBe(3121910778619);
  });
});
