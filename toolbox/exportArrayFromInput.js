const fs = require('fs');

try {
    const inputText = fs.readFileSync(`../${process.argv[2]}/${process.argv[4]}${process.argv[4].endsWith('.txt') ? '' : '.txt'}`, 'utf8');

    let outputText = inputText
        .split("\r\n")
        .map(line => {
            let newLine = `\t"${line}",`;
            return newLine;
        })

    outputText.unshift("module.exports = [")

    outputText.push("]")

    outputText = outputText.join("\r\n")

    fs.writeFileSync(`../${process.argv[2]}/${process.argv[4]}${process.argv[4].endsWith('.js') ? '' : '.js'}`, outputText, 'utf8');

} catch (e) {
    console.log(`Error: ${e}\n\tMake sure you run this script with the format "node exportArrayFromInput.js day# inputFile outputFile"`);
}