import fs from 'fs';

let leftColumn: number[] = [], rightColumn: number[] = [], similarityScore: number = 0;
const fsRead = fs.readFileSync('./1/input.txt', 'utf-8');

for (const line of fsRead.toString().replaceAll('\r', '').split('\n')) {
    const split = line.split('   ') as [string, string];

    const leftNumber = parseInt(split[0]);
    const rightNumber = parseInt(split[1]);

    leftColumn.push(leftNumber);
    rightColumn.push(rightNumber);
}

for (let i = 0; i < leftColumn.length; i++) {
    let numOccurances = 0;
    for (let j = 0; j < rightColumn.length; j++) {
        if (leftColumn[i] === rightColumn[j]) {
            numOccurances++;
        }
    }
    similarityScore += leftColumn[i] * numOccurances;
}

console.log(similarityScore)