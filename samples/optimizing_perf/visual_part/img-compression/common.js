const fs = require('fs');
const path = require('path');
const webp = require('webp-converter');
const childProcess = require('child_process');

function readFile(fileName) {
    return fs.readFileSync(path.resolve(`./${fileName}`)).toString();
}

function writeFile(fileName, content) {
    return fs.writeFileSync(path.resolve(`./${fileName}`), content);
}

function createImageGalleryHtml(pictureFiles, imgFolder, shouldLoadLazily) {
    return pictureFiles.map(fileName => `<div class="app__picture"><img src="${imgFolder}/${fileName}" alt="picture_${fileName}"${shouldLoadLazily ? ' loading="lazy"' : ''}/></div>`).join('');
}

function createVideoGalleryHtml(videoFiles, videoFolder) {
    return videoFiles.map(fileName => `<div class="app__picture"><video autoplay loop muted><source src="${videoFolder}/${fileName}" type="video/mp4"></video></div>`).join('');
}

function injectImagesGallery(pictureFiles, imgFolder, indexFile, shouldLoadLazily=false) {
    let indexHtml = readFile(indexFile);
    const imagesHtml = createImageGalleryHtml(pictureFiles, imgFolder, shouldLoadLazily);
    const START_MARKER = '<!--GALLERY:START-->';
    const startMarkerIdx = indexHtml.indexOf(START_MARKER);
    const endMarkerIdx = indexHtml.indexOf('<!--GALLERY:END-->');
    indexHtml = indexHtml.slice(0, startMarkerIdx + START_MARKER.length) + imagesHtml + indexHtml.slice(endMarkerIdx);
    writeFile(indexFile, indexHtml);
}

function injectVideoGallery(videoFiles, videoFolder, indexFile) {
    let indexHtml = readFile(indexFile);
    const galleryHtml = createVideoGalleryHtml(videoFiles, videoFolder);
    const START_MARKER = '<!--GALLERY:START-->';
    const startMarkerIdx = indexHtml.indexOf(START_MARKER);
    const endMarkerIdx = indexHtml.indexOf('<!--GALLERY:END-->');
    indexHtml = indexHtml.slice(0, startMarkerIdx + START_MARKER.length) + galleryHtml + indexHtml.slice(endMarkerIdx);
    writeFile(indexFile, indexHtml);
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

function convertGifToVideo(inputFile, outputFile) {
    try {
        childProcess.execSync(`ffmpeg -i ${inputFile} -pix_fmt yuv420p -c:v libx264 -movflags +faststart -filter:v crop='floor(in_w/2)*2:floor(in_h/2)*2' ${outputFile}`);
    } catch (error) {
        console.error('Unable to convert gif to video: ', error.stdout);
    }
}

function bucketConvertGifToVideo(gifInputFolder, videoOutputFolder) {
    for (const gifImage of getDirFiles(gifInputFolder)) {
        const gifImgPath = path.join(gifInputFolder, gifImage);
        const videoFile = gifImage.replace('.gif', '.mp4');
        const outputVideoPath = path.join(videoOutputFolder, videoFile);
        console.log('Converting ', gifImgPath, ' to ', outputVideoPath);
        convertGifToVideo(gifImgPath, outputVideoPath);
    }
}

const JPEG_IMAGES_FOLDER = 'jpeg-img';
const AVIF_IMAGES_FOLDER = 'avif-img';
const WEBP_IMAGES_FOLDER = 'webp-img';
const GIF_IMAGES_FOLDER = 'gif';
const VIDEO_FOLDER = 'video';
const RAW_IMAGES_INDEX_FILE = 'index.html';
const AVIF_IMAGES_INDEX_FILE = 'index-avif.html';
const WEBP_IMAGES_INDEX_FILE = 'index-webp.html';
const GIF_IMAGES_INDEX_FILE = 'index-gif.html';
const VIDEO_INDEX_FILE = 'index-video.html';

module.exports = {
    convertPicturesToWebp,
    JPEG_IMAGES_FOLDER,
    AVIF_IMAGES_FOLDER,
    WEBP_IMAGES_FOLDER,
    GIF_IMAGES_FOLDER,
    VIDEO_FOLDER,
    RAW_IMAGES_INDEX_FILE,
    AVIF_IMAGES_INDEX_FILE,
    WEBP_IMAGES_INDEX_FILE,
    GIF_IMAGES_INDEX_FILE,
    VIDEO_INDEX_FILE,
    injectImagesGallery,
    injectVideoGallery,
    bucketConvertGifToVideo,
    readFile,
    writeFile,
    getDirFiles,
};
