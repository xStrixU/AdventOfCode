import fs from 'node:fs';
import path from 'node:path';

const moves = ['A', 'B', 'C', 'X', 'Y', 'Z'] as const;

type Move = typeof moves[number];

const isValidMove = (move: string): move is Move => moves.includes(move);

const moveToIndex = (move: Move): number => {
  switch (move) {
    case 'A':
    case 'X':
      return 0;
    case 'B':
    case 'Y':
      return 1;
    case 'C':
    case 'Z':
      return 2;
  }
};

const input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString();

const points = input
  .split('\n')
  .map(moves => {
    const [enemyMove, selfMove] = moves.split(' ');

    if (!isValidMove(enemyMove) || !isValidMove(selfMove)) {
      return 0;
    }

    const [enemyMoveIndex, selfMoveIndex] = [
      moveToIndex(enemyMove),
      moveToIndex(selfMove),
    ];
    const [translatedEnemyMoveIndex, translatedSelfMoveIndex] = [
      selfMoveIndex - enemyMoveIndex === -2 ? -enemyMoveIndex : enemyMoveIndex,
      selfMoveIndex - enemyMoveIndex === 2 ? -selfMoveIndex : selfMoveIndex,
    ];
    const additionalPoints = selfMoveIndex + 1;

    if (translatedSelfMoveIndex === translatedEnemyMoveIndex) {
      return additionalPoints + 3; // draw
    }

    if (translatedSelfMoveIndex > translatedEnemyMoveIndex) {
      return additionalPoints + 6; // win
    }

    if (translatedSelfMoveIndex < translatedEnemyMoveIndex) {
      return additionalPoints; // loss
    }

    return 0;
  })
  .reduce((prev, current) => prev + current);

console.log(`Total points: ${points}`);
