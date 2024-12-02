"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
let leftColumn = [], rightColumn = [], distanceSum = 0;
const fsRead = fs_1.default.readFileSync('input.txt', 'utf-8');
for (const line of fsRead.toString().replaceAll('\r', '').split('\n')) {
    const split = line.split('   ');
    const leftNumber = parseInt(split[0]);
    const rightNumber = parseInt(split[1]);
    leftColumn.push(leftNumber);
    rightColumn.push(rightNumber);
}
leftColumn = mergeSort(leftColumn);
rightColumn = mergeSort(rightColumn);
const limit = Math.min(leftColumn.length, rightColumn.length);
for (let i = 0; i < limit; i++) {
    distanceSum += Math.abs(leftColumn[i] - rightColumn[i]);
}
console.log(distanceSum);
function mergeSort(input) {
    function merge(left, right) {
        const result = [];
        let indexLeft = 0, indexRight = 0;
        while (indexLeft < left.length && indexRight < right.length) {
            if (left[indexLeft] < right[indexRight]) {
                result.push(left[indexLeft]);
                indexLeft++;
            }
            else {
                result.push(right[indexRight]);
                indexRight++;
            }
        }
        return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight));
    }
    if (input.length <= 1) {
        return input;
    }
    const middle = Math.floor(input.length / 2);
    const left = input.slice(0, middle);
    const right = input.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}
