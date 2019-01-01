const fs = require('fs');

const chronoGuardTimesFile = fs.readFileSync('./chronoGuardTimes.txt', 'utf8');

let chronoGuardTimes = JSON.parse(chronoGuardTimesFile);

// console.log(chronoGuardTimes);

let guardTimeObject = {};
let currentGuardNumber;
let fellAsleepAt = 0;

chronoGuardTimes.forEach(guardEvent => {
    // console.log(guardEvent);
    if (guardEvent.includes("Guard")) {
        currentGuardNumber = parseInt(guardEvent.split("#")[1]);

        if (!guardTimeObject[currentGuardNumber]) {
            guardTimeObject[currentGuardNumber] = {
                "sleepTime": 0,
                specificMinuteAsleep: {}
            };
        }

    } else if (guardEvent.includes("falls asleep")) {
        fellAsleepAt = parseInt(guardEvent.split(":")[1].substr(0, 2));
    } else if (guardEvent.includes("wakes up")) {
        wokeUpAt = parseInt(guardEvent.split(":")[1].substr(0, 2));
        let minutesAsleep = wokeUpAt - fellAsleepAt;
        guardTimeObject[currentGuardNumber].sleepTime += minutesAsleep;

        for (let i = fellAsleepAt; i < wokeUpAt; i++) {
            if (!guardTimeObject[currentGuardNumber].specificMinuteAsleep[i]) {
                guardTimeObject[currentGuardNumber].specificMinuteAsleep[i] = 1;
            } else {
                guardTimeObject[currentGuardNumber].specificMinuteAsleep[i]++;
            }

        }

    }
})
// console.log(guardTimeObject);

let longestTimeAsleep = 0;
let sleepiestGuard;
for (let key in guardTimeObject) {
    if (guardTimeObject[key].sleepTime > longestTimeAsleep) {
        longestTimeAsleep = guardTimeObject[key].sleepTime;
        sleepiestGuard = key;
    }
}
console.log(`Sleepiest guard is ${sleepiestGuard} at ${longestTimeAsleep} minutes asleep!`);

let sleepiestMinute = 0;

let sleepiestGuardMinuteBreakdown = guardTimeObject[sleepiestGuard]["specificMinuteAsleep"];

for (let minute in sleepiestGuardMinuteBreakdown) {
    if (sleepiestGuardMinuteBreakdown[minute] > sleepiestMinute) {
        sleepiestMinute = minute;
    }
}
console.log(`The sleepiest minute for Guard #${sleepiestGuard} is minute ${sleepiestMinute}`);

let mostFrequentMinute;
let mostFrequentMinuteFrequency = 0;
let mostFrequentMinuteGuard;

for (let guard in guardTimeObject) {
    console.log(`On guard ${guard}`)
    for (let minute in guardTimeObject[guard].specificMinuteAsleep) {
        console.log(`On minute ${minute} (freq: ${guardTimeObject[guard].specificMinuteAsleep[minute]})`)
        if (guardTimeObject[guard].specificMinuteAsleep[minute] > mostFrequentMinuteFrequency) {
            mostFrequentMinute = minute;
            mostFrequentMinuteFrequency = guardTimeObject[guard].specificMinuteAsleep[minute];
            mostFrequentMinuteGuard = guard;
        }
    }
}

console.log(`\nGuard #${mostFrequentMinuteGuard} is freaky frequent about sleeping on minute ${mostFrequentMinute} with ${mostFrequentMinuteFrequency} occurences`);