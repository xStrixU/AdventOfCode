import fs from 'node:fs';
import path from 'node:path';

const input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString();

const sum = input
  .split('\n')
  .map(items => {
    const middle = items.length / 2;
    const [firstCompartmentItems, secondCompartmentItems] = [
      items.substring(0, middle),
      items.substring(middle),
    ];
    const commonItem = [...firstCompartmentItems].find(item =>
      secondCompartmentItems.includes(item)
    );

    if (!commonItem) {
      return 0;
    }

    return (
      commonItem.charCodeAt(0) -
      (commonItem.toLowerCase() === commonItem ? 96 : 38)
    );
  })
  .reduce((prev, current) => prev + current);

console.log(`The sum of the priorities: ${sum}`);
