#!/usr/bin/env bun

import { $ } from "bun";

const day = process.argv[2];
const part = process.argv[3]; // Optional: "1" or "2"

if (!day) {
  console.error("Usage: bun scripts/solve.ts <day> [part]");
  console.error("Example: bun scripts/solve.ts 02");
  console.error("Example: bun scripts/solve.ts 02 1  (Part 1 only)");
  console.error("Example: bun scripts/solve.ts 02 2  (Part 2 only)");
  process.exit(1);
}

const dayNum = day.padStart(2, "0");
const solutionPath = `day${dayNum}/solution.ts`;

if (part) {
  process.env.AOC_PART = part;
}

await $`bun ${solutionPath}`;
