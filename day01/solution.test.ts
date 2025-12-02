import { describe, expect, test } from "bun:test";
import { parseInput, commandToDirection, rotate, solve } from "./solution";

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
  test("base case", () => {
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

  test("under 99", () => {
    const startingNumber = 99;
    const direction1 = "R";
    const number1 = 1;
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
