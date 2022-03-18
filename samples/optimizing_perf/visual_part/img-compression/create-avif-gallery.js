const {injectImagesGallery, getDirFiles, copyFile, AVIF_IMAGES_FOLDER, RAW_IMAGES_INDEX_FILE, readFile,
    AVIF_IMAGES_INDEX_FILE, writeFile
} = require('./common');

function main() {
    const avifImages = getDirFiles(AVIF_IMAGES_FOLDER);
    copyFile(RAW_IMAGES_INDEX_FILE, AVIF_IMAGES_INDEX_FILE);
    let avifIndexHtml = readFile(AVIF_IMAGES_INDEX_FILE);
    avifIndexHtml = avifIndexHtml.replaceAll('Jpeg gallery', 'Avif gallery');
    writeFile(AVIF_IMAGES_INDEX_FILE, avifIndexHtml);
    injectImagesGallery(avifImages, AVIF_IMAGES_FOLDER, AVIF_IMAGES_INDEX_FILE);
}

main();
