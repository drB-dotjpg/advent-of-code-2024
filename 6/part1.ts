import fs from 'fs';

const fsRead = fs.readFileSync('./6/input.txt', 'utf-8');

enum Direction {
    UP, RIGHT, DOWN, LEFT
}
const directionCount = Object.keys(Direction).length / 2;

const map: string[][] = [];
let x = 0, y = 0;
let direction: number = Direction.UP;
let distinctPositions = 0;

const lines = fsRead.toString().replaceAll('\r', '').split('\n');
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    map.push(line.split(''));

    if (line.includes('^')) {
        x = line.indexOf('^')
        y = i;
    }
}

let nextSpace;
do {

    let nextX = x, nextY = y;

    switch(direction) {
        case Direction.UP:
            nextY--;
            break;
        case Direction.RIGHT:
            nextX++;
            break;
        case Direction.DOWN:
            nextY++; 
            break;
        case Direction.LEFT:
            nextX--;
            break;
    }

    nextSpace = (map[nextY] ?? [])[nextX];

    if (nextSpace === '#') {
        direction++;
        if (direction >= directionCount) {
            direction = 0;
        }
        continue;

    } else {
        if (map[y][x] !== 'X') {
            distinctPositions++;
            map[y][x] = 'X';
        }

        x = nextX, y = nextY;
    }

} while (nextSpace !== undefined);

// console.log(map.map(e => e.join('')).join('\n'), distinctPositions);
console.log(distinctPositions);