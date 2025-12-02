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
    startingNumber += number;
    if (startingNumber > 99) {
      startingNumber -= 100;
    }
  }
  if (direction === "L") {
    startingNumber -= number;
    if (startingNumber < 0) {
      startingNumber += 100;
    }
  }
  return startingNumber;
}

export function solve(commands: string): number {
  const commandList = parseInput(commands);
  let currentDirection = 50;
  let zeroCount = 0;
  for (const command of commandList) {
    const [direction, number] = commandToDirection(command);
    currentDirection = rotate(direction, number, currentDirection);
    if (currentDirection === 0) {
      zeroCount++;
    }
  }
  return zeroCount;
}

if (import.meta.main) {
  const input = await Bun.file(import.meta.dir + "/input").text();
  console.log("Answer:", solve(input));
}
