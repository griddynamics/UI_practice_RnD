const {injectImagesGallery, getDirFiles, AVIF_IMAGES_FOLDER, RAW_IMAGES_INDEX_FILE, readFile,
    AVIF_IMAGES_INDEX_FILE, writeFile
} = require('./common');

function main() {
    const outputIndexFile = process.env.OUTPUT_INDEX_FILE ?? AVIF_IMAGES_INDEX_FILE;
    const galleryName = process.env.GALLERY_NAME ?? 'Avif gallery';
    const shouldUseLazyLoading = process.env.USE_LAZY_LOADING === 'true';
    const avifImages = getDirFiles(AVIF_IMAGES_FOLDER);
    let avifIndexHtml = readFile(RAW_IMAGES_INDEX_FILE);
    avifIndexHtml = avifIndexHtml.replaceAll('Jpeg gallery', galleryName);
    writeFile(outputIndexFile, avifIndexHtml);
    injectImagesGallery(avifImages, AVIF_IMAGES_FOLDER, outputIndexFile, shouldUseLazyLoading);
}

main();
