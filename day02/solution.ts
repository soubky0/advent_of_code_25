export function parseInput(input: string): string[] {
  return input
    .trim()
    .split(",")
    .map((line) => line.trim());
}

export function solve(input: string): number {
  const lines = parseInput(input);
  const invalidIds = getInvalidIds(lines);
  const sum = invalidIds.reduce((acc, val) => acc + val, 0);
  return sum;
}

export function getInvalidIds(lines: string[]): number[] {
  const invalidIds: number[] = [];
  for (const line of lines) {
    const [start, end] = line.split("-").map(Number);

    if (!start || !end) {
      continue;
    }

    for (let i = start; i <= end; i++) {
      const s = i.toString();
      if (s.length % 2 === 0) {
        if (s.slice(0, s.length / 2) === s.slice(s.length / 2)) {
          invalidIds.push(i);
        }
      }
    }
  }
  return invalidIds;
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
