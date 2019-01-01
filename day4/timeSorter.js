const fs = require('fs');
const guardTimeArray = require('./guardTimes');
const moment = require('moment');

timeSortedEvents = guardTimeArray.sort((first, second) => {
    let firstEventArray = first.split(/(?<=\]) /);
    let firstEventDateString = firstEventArray[0].substring(1, firstEventArray[0].length - 1);

    let secondEventArray = second.split(/(?<=\]) /);
    let secondEventDateString = secondEventArray[0].substring(1, secondEventArray[0].length - 1);

    return moment(firstEventDateString).valueOf() - moment(secondEventDateString).valueOf();
})

fs.writeFileSync('./chronoGuardTimes.txt', JSON.stringify(timeSortedEvents), 'utf8');