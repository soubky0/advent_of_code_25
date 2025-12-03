import { describe, expect, test } from "bun:test";
import {
  parseInput,
  commandToDirection,
  rotate,
  solve,
  solve2,
  countZeros,
} from "./solution";

describe("Day 01 Tests", () => {
  test("Parse Input", () => {
    const input = `
  R10
  L5
  R20
  `;
    const result = parseInput(input);
    expect(result).toEqual(["R10", "L5", "R20"]);
  });

  test("Parse command to direction and number", () => {
    const command = "R25";
    const [direction, number] = commandToDirection(command);
    expect(direction).toBe("R");
    expect(number).toBe(25);
  });

  describe("Rotation", () => {
    test("from question", () => {
      const startingNumber = 11;
      const direction1 = "R";
      const number1 = 8;
      const res1 = rotate(direction1, number1, startingNumber);
      expect(res1).toBe(19);
      const direction2 = "L";
      const number2 = 19;
      const res2 = rotate(direction2, number2, res1);
      expect(res2).toBe(0);
    });

    test("over 99", () => {
      const startingNumber = 0;
      const direction1 = "L";
      const number1 = 1;
      expect(rotate(direction1, number1, startingNumber)).toBe(99);
    });

    test("exactly 99", () => {
      const startingNumber = 0;
      const direction1 = "L";
      const number1 = 99;
      expect(rotate(direction1, number1, startingNumber)).toBe(1);
    });

    test("under 99", () => {
      const startingNumber = 99;
      const direction1 = "R";
      const number1 = 1;
      expect(rotate(direction1, number1, startingNumber)).toBe(0);
    });

    test("input > 100 L", () => {
      const startingNumber = 0;
      const direction1 = "L";
      const number1 = 101;
      expect(rotate(direction1, number1, startingNumber)).toBe(99);
    });

    test("input > 100 R", () => {
      const startingNumber = 0;
      const direction1 = "R";
      const number1 = 101;
      expect(rotate(direction1, number1, startingNumber)).toBe(1);
    });

    test("input > 200 L", () => {
      const startingNumber = 0;
      const direction1 = "L";
      const number1 = 200;
      expect(rotate(direction1, number1, startingNumber)).toBe(0);
    });

    test("input > 200 R", () => {
      const startingNumber = 0;
      const direction1 = "R";
      const number1 = 200;
      expect(rotate(direction1, number1, startingNumber)).toBe(0);
    });

    test("last case", () => {
      const startingNumber = 5;
      const direction1 = "L";
      const number1 = 10;
      const res1 = rotate(direction1, number1, startingNumber);
      expect(res1).toBe(95);
      const direction2 = "R";
      const number2 = 5;
      const res2 = rotate(direction2, number2, res1);
      expect(res2).toBe(0);
    });
  });

  describe("Part 1", () => {
    test("Full example", () => {
      const input = `
      L68
      L30
      R48
      L5
      R60
      L55
      L1
      L99
      R14
      L82
    `;
      const zeroCount = solve(input);
      expect(zeroCount).toBe(3);
    });
  });

  describe("Part 2", () => {
    test("Full example", () => {
      const input = `
      L68
      L30
      R48
      L5
      R60
      L55
      L1
      L99
      R14
      L82
    `;
      const zeroCount = solve2(input);
      expect(zeroCount).toBe(6);
    });
  });

  test("Count zeros", () => {
    // Starting at 0, going right 100 crosses zero once (at position 100 -> 0)
    expect(countZeros("R", 100, 0)).toBe(1);
    // Starting at 0, going right 101 crosses zero once
    expect(countZeros("R", 101, 0)).toBe(1);
    // Starting at 0, going right 390 crosses zero 3 times (at 100, 200, 300)
    expect(countZeros("R", 390, 0)).toBe(3);
    // Starting at 50, going left 60 crosses zero once
    expect(countZeros("L", 60, 50)).toBe(1);
    // Starting at 50, going left 40 does not cross zero
    expect(countZeros("L", 40, 50)).toBe(0);
    // Starting at 50, going right 40 does not cross zero
    expect(countZeros("R", 40, 50)).toBe(0);
    // Starting at 50, going right 60 crosses zero once
    expect(countZeros("R", 60, 50)).toBe(1);
    // if the dial were pointing at 50, a single rotation like R1000 would cause the dial to point at 0 ten times before returning back to 50!
    expect(countZeros("R", 1000, 50)).toBe(10);
  });
});
