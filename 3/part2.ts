import fs from 'fs';

const fsRead = fs.readFileSync('./3/input.txt', 'utf-8');

//match strings with 'mul(' then any digit with length 1-3 (0-999), a comma, then another digit length 1-3 (0-999), then ')'. Also check for strings that match 'do()' and 'don't()'
const functionRegex = /(mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\))/g;

//any digit lengths 1-3 (0-999)
const getNumRegex = /\d{1,3}/g;

const matchedStrings = fsRead.toString().match(functionRegex);
let sum = 0;
let canSum = true;

if (matchedStrings){
    for (const str of matchedStrings) {
        if (str === 'do()' || str === 'don\'t()'){
            canSum = str === 'do()';
            continue;
        }
        
        if (!canSum) {
            continue;
        }

        const numStrings = str.match(getNumRegex);
        
        if (!numStrings || numStrings.length !== 2) {
            continue;
        }

        sum += parseInt(numStrings[0]) * parseInt(numStrings[1]);
    }
}

console.log(sum)