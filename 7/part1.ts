import fs from 'fs';

const fsRead = fs.readFileSync('./7/input.txt', 'utf-8');
let totalCalibration = 0;

for (const line of fsRead.replaceAll('\r', '').split('\n')) {
    const colonSplit = line.split(': ') as [string, string];
    const test = parseInt(colonSplit[0]);
    const nums = colonSplit[1].split(' ').map(function (str) {
        return parseInt(str)
    });

    for (let i = 0; i < (1 << (nums.length - 1)); i++) {

        const operators: Array<'+' | '*'> = [];
        for (let j = nums.length - 2; j >= 0; j--) {
            operators.push(Boolean(i & (1 << j)) ? '*' : '+');
        }
        
        let result = nums[0];
        for (let j = 1; j < nums.length; j++) {
            if (operators[j-1] === '+') {
                result += nums[j];
            } else {
                result *= nums[j];
            }
        }

        if (result === test) {
            totalCalibration += test;
            break;
        }
    }
}

console.log(totalCalibration);