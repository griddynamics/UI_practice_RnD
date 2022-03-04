const fs = require('fs');
const path = require('path');

function readFile(filePath) {
    return fs.readFileSync(filePath).toString();
}

function writeFile(filePath, content) {
    fs.writeFileSync(filePath, content);
}

function addHashes(fileContent, hashes) {
    const script = `<script>globalThis.__img__hashes__=${hashes};</script>`;

    return fileContent.replace(/(<body>)(<script>[^<]+<\/script>)?/, `$1${script}`);
}

function addImages(fileContent, hashes) {
    const imagesMarkup = hashes.map(({url}, i) => `<img class="app__canvas_area" alt="picture_${i}" src="${url}" />`).join('\n');
    const bodyStart = fileContent.indexOf('<body>');
    const bodyEnd = fileContent.indexOf('</body>');
    const newMarkup = `${fileContent.slice(0, bodyStart)}<body><h3>A demo raw images</h3><div class="app__gallery">${imagesMarkup}</div>${fileContent.slice(bodyEnd)}`;

    return newMarkup;
}

function main() {
    const perfMarker = 'inline_hashes';
    console.time(perfMarker);

    const indexFilePath = path.join(__dirname, 'index.html');
    const index2FilePath = path.join(__dirname, 'index2.html');
    const hashesFilePath = path.join(__dirname, 'hashes.json');

    const originalIndexFileContent = readFile(indexFilePath);
    const originalIndex2FileContent = readFile(index2FilePath);
    const hashesJson = readFile(hashesFilePath);
    const modifiedIndexFileContent = addHashes(originalIndexFileContent, hashesJson);
    const modifiedIndex2FileContent = addImages(originalIndex2FileContent, JSON.parse(hashesJson));

    writeFile(indexFilePath, modifiedIndexFileContent);
    console.log('Inlined hashes for images into the index file');

    writeFile(index2FilePath, modifiedIndex2FileContent);
    console.log('Inlined images tags into the index2 file');

    console.timeEnd(perfMarker);
}

main();
