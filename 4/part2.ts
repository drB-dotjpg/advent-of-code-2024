import fs from 'fs';

const fsRead = fs.readFileSync('./4/input.txt', 'utf-8');
const lines = fsRead.toString().replaceAll('\r', '').split('\n');
let numOccurances = 0;

for (let i = 1; i < lines.length - 1; i++) {
    const line = lines[i];

    for (let j = 1; j < line.length - 1; j++) {
        const letter = line[j];

        if (letter === 'A') {
            const str = [
                lines[i - 1].substring(j - 1, j +2),
                lines[i].substring(j - 1, j + 2),
                lines[i + 1].substring(j - 1, j + 2)
            ].join('');

            if (str.match(/M.S.A.M.S|M.M.A.S.S|S.S.A.M.M|S.M.A.S.M/)) {
                numOccurances++;
            }
        }
    }
}

console.log(numOccurances);