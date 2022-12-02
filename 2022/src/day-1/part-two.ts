import fs from 'node:fs';
import path from 'node:path';

const input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString();

const calories = input
  .split('\n\n')
  .map(data =>
    data
      .split('\n')
      .map(Number)
      .reduce((prev, current) => prev + current)
  )
  .sort((a, b) => b - a);
const topThreeCaloriesSum = calories
  .slice(0, 3)
  .reduce((prev, current) => prev + current);

console.log(`The sum of the top three calories: ${topThreeCaloriesSum}`);
