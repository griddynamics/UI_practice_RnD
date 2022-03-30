const fs = require('fs');

function getRandNum(min, max) {
    min = Math.min(min, max);
    max = Math.max(min, max);

    return min + Math.floor(Math.random() * (max - min + 1));
}

const HEX_COLOR_LEN = 6;

function getRandomColor() {
    const colorValue = getRandNum(0, Math.pow(16, HEX_COLOR_LEN));
    const hexColor = colorValue.toString(16).padStart(HEX_COLOR_LEN, '0');

    return `#${hexColor}`;
}

function readFile(fileName) {
    return fs.readFileSync(fileName).toString();
}

function writeFile(fileName, data) {
    return fs.writeFileSync(fileName, data);
}

module.exports = {
    getRandNum,
    getRandomColor,
    readFile,
    writeFile,
};
