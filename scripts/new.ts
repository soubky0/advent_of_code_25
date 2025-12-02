#!/usr/bin/env bun

const day = process.argv[2];

if (!day) {
  console.error("Usage: bun scripts/new-day.ts <day>");
  console.error("Example: bun scripts/new-day.ts 02");
  process.exit(1);
}

const dayNum = day.padStart(2, "0");
const dayInt = parseInt(dayNum);
const dayDir = `day${dayNum}`;

// Get session cookie from environment variable
const SESSION_COOKIE = process.env.AOC_SESSION;

async function fetchInput(): Promise<string> {
  if (!SESSION_COOKIE) {
    console.warn("⚠️  AOC_SESSION not set, skipping input fetch");
    return "";
  }
  const response = await fetch(
    `https://adventofcode.com/2025/day/${dayInt}/input`,
    {
      headers: { Cookie: `session=${SESSION_COOKIE}` },
    }
  );
  if (!response.ok) {
    console.warn(`⚠️  Failed to fetch input: ${response.status}`);
    return "";
  }
  return await response.text();
}

async function fetchQuestion(): Promise<string> {
  const response = await fetch(`https://adventofcode.com/2025/day/${dayInt}`);
  if (!response.ok) {
    console.warn(`⚠️  Failed to fetch question: ${response.status}`);
    return `# Day ${dayInt}: [Title]\n\n## Part One\n\n[Paste the problem description here]\n\n## Part Two\n\n[Paste part two description here]\n`;
  }
  const html = await response.text();
  // Extract article content and convert to markdown-ish format
  const articleMatch = html.match(
    /<article class="day-desc">([\s\S]*?)<\/article>/g
  );
  if (!articleMatch) {
    return `# Day ${dayInt}: [Title]\n\n[Could not parse question]\n`;
  }
  let content = articleMatch.join("\n\n");
  // Basic HTML to Markdown conversion
  content = content
    .replace(/<article class="day-desc">/g, "")
    .replace(/<\/article>/g, "")
    .replace(/<h2>--- (.*?) ---<\/h2>/g, "# $1\n")
    .replace(/<p>/g, "")
    .replace(/<\/p>/g, "\n")
    .replace(/<em>(.*?)<\/em>/g, "*$1*")
    .replace(/<code>(.*?)<\/code>/g, "`$1`")
    .replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/g, "```\n$1```\n")
    .replace(/<ul>/g, "")
    .replace(/<\/ul>/g, "")
    .replace(/<li>/g, "- ")
    .replace(/<\/li>/g, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  return content + "\n";
}

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
  const input = await Bun.file(import.meta.dir + "/input").text();
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

console.log(`🎄 Creating ${dayDir}...`);

const [input, question] = await Promise.all([fetchInput(), fetchQuestion()]);

await mkdir(dayDir);
await Bun.write(`${dayDir}/question.md`, question);
await Bun.write(`${dayDir}/input`, input);
await Bun.write(`${dayDir}/solution.ts`, solutionTemplate);
await Bun.write(`${dayDir}/solution.test.ts`, testTemplate);

console.log(`✨ Created ${dayDir}/ with:`);
console.log(`   - question.md`);
console.log(`   - input.txt`);
console.log(`   - solution.ts`);
console.log(`   - solution.test.ts`);
console.log(`Run tests: bun test ${dayDir}`);
console.log(`Run solution: bun ${dayDir}/solution.ts`);
