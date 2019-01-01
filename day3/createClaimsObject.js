const cuts = require('./cutsArray');
const fs = require('fs');

// let sheet = new Array(1000).fill(null).map(x => new Array(1000).fill(null));

// let cleanCuts = cuts.map(claim => {
//     return claim.split("@ ")[1];
// })

let cutsObject = {};

cuts.forEach(fullClaim => {
    claimSplit = fullClaim.split("@ ");
    claimNumber = claimSplit[0].substring(1).trim();
    // console.log(claimNumber);
    claim = claimSplit[1];
    //console.log(claim); // "615,604: 11x12"
    const commaSplit = claim.split(","); // ["615", "604: 11x12"]
    const xOffset = commaSplit[0].trim(); // "615"
    const colonSplit = commaSplit[1].split(": "); // ["604", "11x12"]
    const yOffset = colonSplit[0].trim(); // "604"
    const xSplit = colonSplit[1].split("x"); // ["11", "12"]
    const width = xSplit[0].trim(); // 
    const height = xSplit[1].trim();

    // console.log(`${claimNumber} ${xOffset} ${yOffset} ${width} ${height}`);

    cutsObject[claimNumber] = {};
    cutsObject[claimNumber].xOffset = parseInt(xOffset);
    cutsObject[claimNumber].yOffset = parseInt(yOffset);
    cutsObject[claimNumber].width = parseInt(width);
    cutsObject[claimNumber].height = parseInt(height);
})

fs.writeFileSync('./claims.json', JSON.stringify(cutsObject))