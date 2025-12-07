export function parseInput(input: string): string[] {
  return input
    .trim()
    .split("\n")
    .map((line) => line.trim());
}

export function getJoltage(s: string): number {
  let max = 0;
  for (let i = 0; i < s.length; i++) {
    for (let j = i + 1; j <= s.length; j++) {
      const c = parseInt(s.charAt(i) + s.charAt(j));
      if (c > max) {
        max = c;
      }
    }
  }
  return max;
}

export function solve(input: string): number {
  const lines = parseInput(input);
  let res = 0;
  for (const line of lines) {
    res += getJoltage(line);
  }
  return res;
}

export function solve2(input: string): number {
  const lines = parseInput(input);
  // TODO: Implement Part 2 solution
  return 0;
}

if (import.meta.main) {
  const input = await Bun.file(import.meta.dir + "/input").text();
  const part = process.env.AOC_PART;

  if (!part || part === "1") {
    console.log("Part 1:", solve(input));
  }
  if (!part || part === "2") {
    console.log("Part 2:", solve2(input));
  }
}
