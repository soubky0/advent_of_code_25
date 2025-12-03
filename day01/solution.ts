export function parseInput(commands: string): string[] {
  return commands
    .trim()
    .split("\n")
    .map((line) => line.trim());
}

export function commandToDirection(command: string): [string, number] {
  const direction = command.charAt(0);
  const number = parseInt(command.slice(1), 10);
  return [direction, number];
}

export function rotate(
  direction: string,
  number: number,
  startingNumber: number
): number {
  if (direction === "R") {
    startingNumber = (startingNumber + number) % 100;
  }
  if (direction === "L") {
    startingNumber = (((startingNumber - number) % 100) + 100) % 100;
  }
  return startingNumber;
}

export function countZeros(
  direction: string,
  number: number,
  startingNumber: number
): number {
  let crossings = 0;
  if (direction === "R") {
    // Going right (increasing), we touch 0 after (100 - startingNumber) steps, then every 100 steps
    // If starting at 0, first touch is at step 100
    if (startingNumber === 0) {
      crossings = Math.floor(number / 100);
    } else {
      crossings = Math.floor((startingNumber + number) / 100);
    }
  } else if (direction === "L") {
    // Going left (decreasing), we touch 0 after startingNumber steps, then every 100 steps
    // If starting at 0, first touch is at step 100
    if (startingNumber === 0) {
      crossings = Math.floor(number / 100);
    } else {
      crossings = Math.floor((100 - startingNumber + number) / 100);
    }
  }
  return crossings;
}

export function solve(commands: string): number {
  const commandList = parseInput(commands);
  let currentPosition = 50;
  let zeroCount = 0;
  for (const command of commandList) {
    const [direction, number] = commandToDirection(command);
    currentPosition = rotate(direction, number, currentPosition);
    if (currentPosition === 0) {
      zeroCount++;
    }
  }
  return zeroCount;
}

export function solve2(commands: string): number {
  const commandList = parseInput(commands);
  let currentPosition = 50;
  let zeroCount = 0;
  for (const command of commandList) {
    const [direction, number] = commandToDirection(command);
    zeroCount += countZeros(direction, number, currentPosition);
    currentPosition = rotate(direction, number, currentPosition);
  }
  return zeroCount;
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
