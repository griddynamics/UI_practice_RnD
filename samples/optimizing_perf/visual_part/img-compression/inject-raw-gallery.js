const {injectImagesGallery, getDirFiles, JPEG_IMAGES_FOLDER, RAW_IMAGES_INDEX_FILE} = require('./common');

function main() {
    const jpegFiles = getDirFiles(JPEG_IMAGES_FOLDER);
    injectImagesGallery(jpegFiles, JPEG_IMAGES_FOLDER, RAW_IMAGES_INDEX_FILE);
}

main();
