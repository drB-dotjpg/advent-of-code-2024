import fs from 'fs';

const fsRead = fs.readFileSync('input.txt', 'utf-8');

let safeReports: number = 0;
for (const line of fsRead.toString().split('\n')) {
    let lastNum: number | null = null;
    let increasing: boolean | null = null;
    let safe = true;

    for (const str of line.split(' ')) {
        const num = parseInt(str);

        if (lastNum === null) {
            lastNum = num;
            continue;
        }

        if (increasing === null) {
            increasing = num > lastNum;
        }

        const diff = Math.abs(lastNum - num);
        if (diff < 1 || diff > 3) {
            safe = false;
            break;
        }

        if (increasing && (num < lastNum)) {
            safe = false;
            break;
        } else if (!increasing && (num > lastNum)) {
            safe = false;
            break;
        }

        lastNum = num;
    } 

    if (safe) {
        safeReports++;
    }
}

console.log(safeReports)
