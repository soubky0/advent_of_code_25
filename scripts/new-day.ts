#!/usr/bin/env bun

const day = process.argv[2];

if (!day) {
  console.error("Usage: bun scripts/new-day.ts <day>");
  console.error("Example: bun scripts/new-day.ts 02");
  process.exit(1);
}

const dayNum = day.padStart(2, "0");
const dayDir = `day${dayNum}`;

const questionTemplate = `# Day ${parseInt(dayNum)}: [Title]

## Part One

[Paste the problem description here]

## Part Two

[Paste part two description here]
`;

const solutionTemplate = `export function parseInput(input: string): string[] {
  return input
    .trim()
    .split("\\n")
    .map((line) => line.trim());
}

export function solve(input: string): number {
  const lines = parseInput(input);
  // TODO: Implement solution
  return 0;
}

if (import.meta.main) {
  const input = await Bun.file(import.meta.dir + "/input.txt").text();
  console.log("Answer:", solve(input));
}
`;

const testTemplate = `import { describe, expect, test } from "bun:test";
import { parseInput, solve } from "./solution";

test("Parse Input", () => {
  const input = \`
  \`;
  const result = parseInput(input);
  expect(result).toEqual([]);
});

test("Example", () => {
  const input = \`
  \`;
  const result = solve(input);
  expect(result).toBe(0);
});
`;

import { mkdir } from "fs/promises";
import { existsSync } from "fs";

if (existsSync(dayDir)) {
  console.error(`Directory ${dayDir} already exists!`);
  process.exit(1);
}

await mkdir(dayDir);
await Bun.write(`${dayDir}/question.md`, questionTemplate);
await Bun.write(`${dayDir}/input.txt`, "");
await Bun.write(`${dayDir}/solution.ts`, solutionTemplate);
await Bun.write(`${dayDir}/solution.test.ts`, testTemplate);

console.log(`✨ Created ${dayDir}/ with:`);
console.log(`   - question.md`);
console.log(`   - input.txt`);
console.log(`   - solution.ts`);
console.log(`   - solution.test.ts`);
console.log(`Run tests: bun test ${dayDir}`);
console.log(`Run solution: bun ${dayDir}/solution.ts`);
