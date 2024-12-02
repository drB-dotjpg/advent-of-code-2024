"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
let leftColumn = [], rightColumn = [], similarityScore = 0;
const fsRead = fs_1.default.readFileSync('input.txt', 'utf-8');
for (const line of fsRead.toString().replaceAll('\r', '').split('\n')) {
    const split = line.split('   ');
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
console.log(similarityScore);
