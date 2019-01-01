const fs = require('fs');

let polymerFile = process.argv[2] === 'test' ? 'test_polymer.txt' : 'polymer.txt';

let polymer = fs.readFileSync(polymerFile, 'utf8');

console.log(polymer.substr(0, 20));

let polymerArray = polymer.split("");
let reactionFound;

do {
    reactionFound = false;
    for (let i = 0; i < polymerArray.length - 1; i++) {
        let j = i + 1;
        let charCodeI = polymerArray[i].charCodeAt(0);
        let charCodeJ = polymerArray[j].charCodeAt(0);
        if (Math.abs(charCodeI - charCodeJ) === 32) {
            reactionFound = true;
            // console.log(`Reaction! ${polymerArray[i]} and ${polymerArray[j]} react at location ${i}`)
            polymerArray = polymerArray.slice(0, i).concat(polymerArray.slice(j + 1));
        }
    }
} while (reactionFound)

console.log(polymerArray.length);