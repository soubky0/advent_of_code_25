export function parseInput(input: string): string[] {
  return input
    .trim()
    .split("\n")
    .map((line) => line.trim());
}

export function solve(input: string): number {
  const lines = parseInput(input);
  // TODO: Implement Part 1 solution
  return 0;
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
