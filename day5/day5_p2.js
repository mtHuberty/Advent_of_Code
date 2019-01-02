const polymerizer = require('./day5_p1');
const fs = require('fs');

let polymer = fs.readFileSync('./polymer.txt', 'utf8');
let polymerArray = polymer.split('');

let alphabetArray = 'abcdefghijklmnopqrstuvwxyz'.split('');
let shortestResultantPolymer = 50000;
let bestLetterToRemove = "";

alphabetArray.forEach(letter => {
    let mutatedPolymerArray = polymerArray.filter((nucleotide) => {
        return nucleotide !== letter && nucleotide !== letter.toUpperCase();
    })
    let mutatedPolymer = mutatedPolymerArray.join("");
    let resultantPolymerLength = polymerizer.polymerize(mutatedPolymer);
    if (resultantPolymerLength < shortestResultantPolymer) {
        shortestResultantPolymer = resultantPolymerLength;
        bestLetterToRemove = letter.toUpperCase();
    }
    console.log(`Polymer length with "${letter}" missing is ${resultantPolymerLength}`);
})

console.log(`Shortest possible polymer is ${shortestResultantPolymer} with all ${bestLetterToRemove}'s removed`)