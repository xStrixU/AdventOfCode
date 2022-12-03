import fs from 'node:fs';
import path from 'node:path';

const splitIntoChunks = <T>(array: T[], chunkSize: number) => {
  const chunks = [];

  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);

    chunks.push(chunk);
  }

  return chunks;
};

const input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString();

const sum = splitIntoChunks(input.split('\n'), 3)
  .map(itemsChunk => {
    const commonItem = [...itemsChunk[0]].find(item =>
      itemsChunk.slice(1).every(items => items.includes(item))
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
