import fs from 'fs';

const fsRead = fs.readFileSync('./6/input.txt', 'utf-8');

enum Direction {
    UP, RIGHT, DOWN, LEFT
}
const directionCount = Object.keys(Direction).length / 2;

const map: string[][] = [];
let ogX = 0, ogY = 0;
let obstructions = 0;

const lines = fsRead.toString().replaceAll('\r', '').split('\n');
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    map.push(line.split(''));

    if (line.includes('^')) {
        ogX = line.indexOf('^')
        ogY = i;
    }
}

for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {

        if (map[i][j] === '#' || map[i][j] === '^') {
            continue;
        }

        let x = ogX, y = ogY;
        let direction: number = Direction.UP;
        let nextSpace;
        const turnLocations: Array<[number, number]> = [];

        do {
            let nextX = x, nextY = y;
            let hasTurned = false;

            while (true) {
                nextX = x, nextY = y;

                switch (direction) {
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

                if (nextSpace === '#' || (nextX === j && nextY === i)) {
                    direction++;
                    if (direction >= directionCount) {
                        direction = 0;
                    }
                    hasTurned = true;
                } else {
                    break;
                }
            }

            if (hasTurned) {
                let hasTurnedHere = false;

                for (const turnLocation of turnLocations) {
                    if (turnLocation[0] === x && turnLocation[1] === y) {
                        hasTurnedHere = true;
                        break;
                    }
                }

                if (hasTurnedHere) {
                    obstructions++;
                    break;
                }

                turnLocations.push([x, y]);
            }

            x = nextX, y = nextY;

        } while (nextSpace !== undefined);
    }
}

console.log(obstructions);