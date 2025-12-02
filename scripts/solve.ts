#!/usr/bin/env bun

import { $ } from "bun";

const day = process.argv[2];

if (!day) {
  console.error("Usage: bun scripts/solve.ts <day>");
  console.error("Example: bun scripts/solve.ts 02");
  process.exit(1);
}

const dayNum = day.padStart(2, "0");
const solutionPath = `day${dayNum}/solution.ts`;

await $`bun ${solutionPath}`;
