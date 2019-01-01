const fs = require('fs');
const guardTimeFile = require('./guardTimes');

guardTimeFile.forEach(event => {
    console.log(event.split(/(?<=\]) /))
    return
})