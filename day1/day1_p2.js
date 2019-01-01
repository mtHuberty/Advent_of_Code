const frequencies = require('./day1_p1/frequencies');

let counter = 0;
let frequency = 0;
let uniqueFrequencies = new Set();
let loopProtect = 100000;

function calibrate() {
    while (true) {
        for (let num of frequencies) {
            // console.log(num);
            frequency += num;
            if (uniqueFrequencies.has(frequency)) {
                console.log(`FREQUENCY MATCH: ${frequency}`);
                console.log(`(This took ${counter} frequencies of ${frequencies.length} to find)`);
                return frequency;
            } else {
                uniqueFrequencies.add(frequency);
                // console.log(uniqueFrequencies);
            }
        }

        if (counter >= loopProtect) {
            return 'ruh roh';
        } else {
            counter++;
            // console.log(counter);
        }
    }
}

calibrate();