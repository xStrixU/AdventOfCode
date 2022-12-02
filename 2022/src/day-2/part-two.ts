import fs from 'node:fs';
import path from 'node:path';

const moves = ['A', 'B', 'C'] as const;
const ends = ['X', 'Y', 'Z'] as const;

type Move = typeof moves[number];
type End = typeof ends[number];

const isValidMove = (move: string): move is Move => moves.includes(move);
const isValidEnd = (end: string): end is End => ends.includes(end);

const moveToIndex = (move: Move): number => {
  switch (move) {
    case 'A':
      return 0;
    case 'B':
      return 1;
    case 'C':
      return 2;
  }
};

const translateSelfMoveIndex = (selfMoveIndex: number) => {
  if (selfMoveIndex === -1) {
    return 2;
  }

  if (selfMoveIndex === 3) {
    return 0;
  }

  return selfMoveIndex;
};

const input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString();

const points = input
  .split('\n')
  .map(moves => {
    const [enemyMove, end] = moves.split(' ');

    if (!isValidMove(enemyMove) || !isValidEnd(end)) {
      return 0;
    }

    const enemyMoveIndex = moveToIndex(enemyMove);

    if (end === 'Y') {
      return enemyMoveIndex + 1 + 3; // draw
    }

    const selfMoveIndex = translateSelfMoveIndex(
      enemyMoveIndex + (end === 'X' ? -1 : 1)
    );

    if (end === 'X') {
      return selfMoveIndex + 1; // loss
    }

    if (end === 'Z') {
      return selfMoveIndex + 1 + 6; // win
    }

    return 0;
  })
  .reduce((prev, current) => prev + current);

console.log(`Total points: ${points}`);
