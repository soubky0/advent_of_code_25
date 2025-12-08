export function parseInput(input: string): string[] {
  return input
    .trim()
    .split("\n")
    .map((line) => line.trim());
}

export function getJoltage2(input: string): number {
  const stack: string[] = [];
  let toRemove = input.length - 12;
  for (const digit of input) {
    while (
      stack.length > 0 &&
      toRemove > 0 &&
      stack[stack.length - 1]! < digit
    ) {
      stack.pop();
      toRemove--;
    }
    stack.push(digit);
  }
  return parseInt(stack.slice(0, 12).join(""));
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
  let res = 0;
  for (const line of lines) {
    res += getJoltage2(line);
  }
  return res;
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
