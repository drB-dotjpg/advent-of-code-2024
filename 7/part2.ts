import fs from 'fs';

type Operators = '+' | '*' | '||'

const fsRead = fs.readFileSync('./7/input.txt', 'utf-8');
let totalCalibration = 0;

for (const line of fsRead.replaceAll('\r', '').split('\n')) {
    const colonSplit = line.split(': ') as [string, string];
    const test = parseInt(colonSplit[0]);
    const nums = colonSplit[1].split(' ').map(function (str) {
        return parseInt(str)
    });

    const limit = Math.pow(3, nums.length - 1);
    for (let i = 0; i < limit; i++) {
        const operators = i.toString(3).padStart(nums.length - 1, '0').split('').map(function (str) {
            switch (parseInt(str)) {
                case 0: return '+';
                case 1: return '*';
                case 2: return '||';
            }
        }) as Operators[];

        let result = nums[0];
        for (let j = 1; j < nums.length; j++) {
            switch(operators[j - 1]) {
                case '+': result += nums[j]; break;
                case '*': result *= nums[j]; break;
                case '||': result = parseInt(result.toString() + nums[j].toString());
            }
        }

        if (result === test) {
            totalCalibration += test;
            break;
        }
    }
}

console.log(totalCalibration);