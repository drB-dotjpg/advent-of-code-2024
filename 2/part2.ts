import fs from 'fs';

const fsRead = fs.readFileSync('./2/input.txt', 'utf-8');

let safeReports: number = 0;
for (const line of fsRead.toString().split('\n')) {
    const lineSplit = line.split(' ');
    let safe = true;

    for (let skip = 0; skip < lineSplit.length; skip++) {
        
        let lastNum: number | null = null;
        let increasing: boolean | null = null;
        safe = true;

        for (let i = 0; i < lineSplit.length; i++) {
            if (i === skip) {
                continue;
            }
            
            const num = parseInt(lineSplit[i]);

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
            break;
        }
    }

    if (safe) {
        safeReports++;
    }
}

console.log(safeReports)
