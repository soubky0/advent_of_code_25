#!/usr/bin/env bun

import { existsSync } from "fs";

const day = process.argv[2];

if (!day) {
  console.error("Usage: bun scripts/part2.ts <day>");
  console.error("Example: bun scripts/part2.ts 01");
  process.exit(1);
}

const dayNum = day.padStart(2, "0");
const dayInt = parseInt(dayNum);
const dayDir = `day${dayNum}`;
const questionPath = `${dayDir}/question.md`;

// Get session cookie from environment variable
const SESSION_COOKIE = process.env.AOC_SESSION;

async function fetchPart2(): Promise<string | null> {
  if (!SESSION_COOKIE) {
    console.error("❌ AOC_SESSION not set. Please set your session cookie.");
    process.exit(1);
  }

  const response = await fetch(`https://adventofcode.com/2025/day/${dayInt}`, {
    headers: { Cookie: `session=${SESSION_COOKIE}` },
  });

  if (!response.ok) {
    console.error(`❌ Failed to fetch question: ${response.status}`);
    return null;
  }

  const html = await response.text();

  // Extract all article content
  const articleMatches = html.match(
    /<article class="day-desc">([\s\S]*?)<\/article>/g
  );

  if (!articleMatches || articleMatches.length < 2) {
    console.log("ℹ️  Part 2 not yet available. Have you submitted Part 1?");
    return null;
  }

  // Get the second article (part 2)
  let part2Content = articleMatches[1]!;

  // Basic HTML to Markdown conversion
  part2Content = part2Content
    .replace(/<article class="day-desc">/g, "")
    .replace(/<\/article>/g, "")
    .replace(/<h2>--- (.*?) ---<\/h2>/g, "\n\n# $1\n")
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

  return part2Content;
}

if (!existsSync(questionPath)) {
  console.error(`❌ ${questionPath} not found`);
  process.exit(1);
}

const currentQuestion = await Bun.file(questionPath).text();

// Check if part 2 is already in the file
if (currentQuestion.includes("Part Two")) {
  console.log("ℹ️  Part 2 already in question.md");
  process.exit(0);
}

console.log(`🎄 Fetching Part 2 for Day ${dayInt}...`);

const part2 = await fetchPart2();
if (part2) {
  await Bun.write(questionPath, currentQuestion + "\n\n" + part2 + "\n");
  console.log("✨ Appended Part 2 to question.md");
}
