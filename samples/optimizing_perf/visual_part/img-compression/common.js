const fs = require('fs');
const path = require('path');
const webp = require("webp-converter");

function readFile(fileName) {
    return fs.readFileSync(path.resolve(`./${fileName}`)).toString();
}

function writeFile(fileName, content) {
    return fs.writeFileSync(path.resolve(`./${fileName}`), content);
}

function createGalleryHtml(pictureFiles, imgFolder) {
    return pictureFiles.map(fileName => `<div class="app__picture"><img src="${imgFolder}/${fileName}" alt="picture_${fileName}"/></div>`).join('');
}

function injectImagesGallery(pictureFiles, imgFolder, indexFile) {
    let indexHtml = readFile(indexFile);
    const imagesHtml = createGalleryHtml(pictureFiles, imgFolder);
    const START_MARKER = '<!--GALLERY:START-->';
    const startMarkerIdx = indexHtml.indexOf(START_MARKER);
    const endMarkerIdx = indexHtml.indexOf('<!--GALLERY:END-->');
    indexHtml = indexHtml.slice(0, startMarkerIdx + START_MARKER.length) + imagesHtml + indexHtml.slice(endMarkerIdx);
    writeFile(indexFile, indexHtml);
}

function copyFile(fileName, newFileName) {
    fs.copyFileSync(fileName, newFileName);
}

function getDirFiles(dirName) {
    return fs.readdirSync(dirName).sort();
}

function getFileName(filePath) {
    return path.parse(filePath).name;
}

async function convertPicturesToWebp(inputFolder, outputFolder, quality=80) {
    const inputFiles = getDirFiles(inputFolder);
    for (const imgFile of inputFiles) {
        const inputFilePath = path.join(inputFolder, imgFile);
        const outputFileName = `${getFileName(inputFilePath)}.webp`;
        const outputFilePath = path.join(outputFolder, outputFileName);
        await webp.cwebp(inputFilePath, outputFilePath, `-q ${quality}`, '-v');
    }
}

const JPEG_IMAGES_FOLDER = 'jpeg-img';
const AVIF_IMAGES_FOLDER = 'avif-img';
const WEBP_IMAGES_FOLDER = 'webp-img';
const RAW_IMAGES_INDEX_FILE = 'index.html';
const AVIF_IMAGES_INDEX_FILE = 'index-avif.html';
const WEBP_IMAGES_INDEX_FILE = 'index-webp.html';

module.exports = {
    copyFile,
    convertPicturesToWebp,
    JPEG_IMAGES_FOLDER,
    AVIF_IMAGES_FOLDER,
    WEBP_IMAGES_FOLDER,
    RAW_IMAGES_INDEX_FILE,
    AVIF_IMAGES_INDEX_FILE,
    WEBP_IMAGES_INDEX_FILE,
    injectImagesGallery,
    readFile,
    writeFile,
    getDirFiles,
};
