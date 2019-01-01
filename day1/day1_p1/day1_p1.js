const frequencies = require('./frequencies');

let frequency = 0;

// frequencies.forEach(function (num) {
//     frequency += num;
// })

frequency = frequencies.reduce((accum, curr) => {
    return accum += curr;
})

console.log(frequency);