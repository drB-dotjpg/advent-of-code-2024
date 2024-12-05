import fs from 'fs';

const fsRead = fs.readFileSync('./5/input.txt', 'utf-8');

const orderingRules: Record<number, number[]> = {};
let middleSum = 0;

let readingOrderingRules = true;
for (const line of fsRead.toString().replaceAll('\r', '').split('\n')) {
    if (line === '') {
        readingOrderingRules = false;
        continue;
    }

    if (readingOrderingRules) {
        const nums = line.split('|').map(function(str) {
            return parseInt(str)
        }) as [number, number];

        if (!orderingRules[nums[1]]) {
            orderingRules[nums[1]] = [];
        }
        orderingRules[nums[1]].push(nums[0]);

    } else {
        const pageNums = line.split(',').map(function(str) {
            return parseInt(str);
        });

        let lineOk = true;

        for (let i = 0; i < pageNums.length - 1; i++) {
            const num = pageNums[i];
            
            for (let j = i + 1; j < pageNums.length; j++) {
                const compareNum = pageNums[j];

                if (orderingRules[num]?.includes(compareNum)) {
                    lineOk = false;
                    const temp = pageNums[i];
                    pageNums[i] = pageNums[j];
                    pageNums[j] = temp;
                    i = -1;
                    break;
                }
            }
        }
        
        if (!lineOk) {
            middleSum += pageNums[Math.floor(pageNums.length / 2)];
        }
    }
}

console.log(middleSum);