import fs from 'fs';

type Direction = 'forward' | 'backward';
type DiagonalDirection = 'left' | 'right';
const patternForward = ['M', 'A', 'S'];
const patternBackward = ['A', 'M', 'X'];

const fsRead = fs.readFileSync('./4/input.txt', 'utf-8');
const lines = fsRead.toString().replaceAll('\r', '').split('\n');
let numOccurances = 0;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    numOccurances += line.match(/XMAS|SAMX|(?<=SAMX)MAS|(?<=XMAS)AMX/g)?.length ?? 0;

    for (let j = 0; j < line.length; j++) {
        const letter = line[j];

        if (i > lines.length - 4) {
            break;
        }

        if (letter === 'X' && checkVertical(i, j, 'forward')) {
            numOccurances++;
        } else if (letter === 'S' && checkVertical(i, j, 'backward')) {
            numOccurances++;
        }

        if (j > 2) {
            if (letter === 'X' && checkDiagonal(i, j, 'forward', 'left')) {
                numOccurances++;
            } else if (letter === 'S' && checkDiagonal(i, j, 'backward', 'left')) {
                numOccurances++;
            }
        } 

        if (j < line.length - 3) {
            if (letter === 'X' && checkDiagonal(i, j, 'forward', 'right')) {
                numOccurances++;
            } else if (letter === 'S' && checkDiagonal(i, j, 'backward', 'right')) {
                numOccurances++;
            }
        }
    }
}

console.log(numOccurances);

function checkVertical(lineIndex: number, charIndex: number, direction: Direction): boolean {
    const pattern = direction === 'forward' ? patternForward : patternBackward;

    for (let i = 0; i < pattern.length; i++) {
        if (lines[lineIndex + i + 1][charIndex] !== pattern[i]) {
            return false;
        }
    }

    return true;
}

function checkDiagonal(lineIndex: number, charIndex: number, direction: Direction, diagonalDirection: DiagonalDirection) {
    const pattern = direction === 'forward' ? patternForward : patternBackward
    const charOffset = diagonalDirection === 'left' ? -1 : 1;

    for (let i = 0; i < pattern.length; i++) {
        if (lines[lineIndex + i + 1][charIndex + ((1 + i) * charOffset)] !== pattern[i]) {
            return false;
        }
    }

    return true;
}