const ids = require('./box_ids');

let boxesWithDuplicates = 0;
let boxeswithTriplicates = 0;

ids.forEach((id, ind) => {
    let letterCounterObj = {};
    let hasDuplicate = false;
    let hasTriplicate = false;
    id.split("").forEach(letter => {
        if (letterCounterObj.hasOwnProperty(letter)) {
            letterCounterObj[letter]++;
        } else {
            letterCounterObj[letter] = 1;
        }
    })
    for (let key in letterCounterObj) {
        if (letterCounterObj[key] === 2) {
            // console.log(`DUPLICATE: ${key} (ID ${ind+1})`);
            hasDuplicate = true;
        } else if (letterCounterObj[key] === 3) {
            // console.log(`TRIPLICATE: ${key} (ID ${ind+1})`);
            hasTriplicate = true;
        }
    }
    if (hasDuplicate) {
        boxesWithDuplicates++;
    }
    if (hasTriplicate) {
        boxeswithTriplicates++;
    }
    //console.log(`ID at index ${ind} has duplicate? (${hasDuplicate ? hasDuplicate.toString().toUpperCase() : hasDuplicate}). has triplicate? (${hasTriplicate ? hasTriplicate.toString().toUpperCase() : hasTriplicate}))\n`);
})

console.log(boxesWithDuplicates);
console.log(boxeswithTriplicates);
console.log(`Checksum is ${boxesWithDuplicates*boxeswithTriplicates}`);