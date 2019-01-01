const fs = require('fs');

const claimsFile = fs.readFileSync('./claims.json', 'utf8');

const claims = JSON.parse(claimsFile);

let sheetMatrix = new Array(1000).fill(0).map(x => new Array(1000).fill(0));

for (let key in claims) {
    const {
        xOffset,
        yOffset,
        width,
        height
    } = claims[key];

    for (let i = xOffset; i < (xOffset + width); i++) {
        for (let j = yOffset; j < (yOffset + height); j++) {
            sheetMatrix[i][j]++;
        }
    }
}

// Gives a visual map of the sheet
// let writeStream = fs.createWriteStream('fabricMap.txt');
// sheetMatrix.forEach(arr => {
//     line = "";
//     arr.forEach(num => {
//         line += num.toString();
//     })
//     writeStream.write(`${line}\r\n`, 'utf8');
//     // console.log(`${line}\n`);
// })
// writeStream.on('finish', () => console.log('Finished building fabric map in fabricMap.txt!'));
// writeStream.end();

let conflictCounter = 0;
sheetMatrix.forEach(arr => {
    arr.forEach(num => {
        if (num > 1) {
            conflictCounter++;
        }
    })
})

console.log(conflictCounter);

let sheetMatrixStream = fs.createWriteStream('sheetMatrix.json');
sheetMatrixStream.write(JSON.stringify(sheetMatrix));
sheetMatrixStream.on('finish', () => console.log('sheetMatrix.json created'));
sheetMatrixStream.end();