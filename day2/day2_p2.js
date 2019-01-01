const ids = require('./box_ids');

for (let [idIndex, id] of ids.entries()) {
    for (let i = idIndex + 1; i < ids.length; i++) {
        let otherIdArray = ids[i].split("");
        let commonLetters = id.split("").filter((letter, ind) => {
            return letter === otherIdArray[ind];
        }).join("");
        if (commonLetters.length === id.length - 1) {
            console.log(`Found the matches! ID ${idIndex} and ID ${i}`);
            console.log(commonLetters);
            return commonLetters;
        }
    }
}