const fs = require('fs');

const claimsFile = fs.readFileSync('./claims.json', 'utf8');
const sheetMatrixFile = fs.readFileSync('./sheetMatrix.json', 'utf8');

const claims = JSON.parse(claimsFile);
const sheetMatrix = JSON.parse(sheetMatrixFile);

for (let key in claims) {
    let nextClaim = false;
    const {
        xOffset,
        yOffset,
        width,
        height
    } = claims[key];

    for (let i = xOffset; i < (xOffset + width); i++) {
        for (let j = yOffset; j < (yOffset + height); j++) {
            if (sheetMatrix[i][j] > 1) {
                nextClaim = true;
                break;
            } else if (i === (xOffset + width) - 1 && j === (yOffset + height) - 1) {
                console.log(`Found it! Claim #${key}\n${JSON.stringify(claims[key])}`);
            }
        }
        if (nextClaim) {
            break;
        }
    }
}