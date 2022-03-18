const {
    injectImagesGallery, getDirFiles, copyFile, WEBP_IMAGES_FOLDER, RAW_IMAGES_INDEX_FILE, readFile,
    WEBP_IMAGES_INDEX_FILE, JPEG_IMAGES_FOLDER, writeFile, convertPicturesToWebp
} = require('./common');
const webp = require('webp-converter');

async function main() {
    await convertPicturesToWebp(JPEG_IMAGES_FOLDER, WEBP_IMAGES_FOLDER, 50);
    const webpImages = getDirFiles(WEBP_IMAGES_FOLDER);
    copyFile(RAW_IMAGES_INDEX_FILE, WEBP_IMAGES_INDEX_FILE);
    let webpIndexHtml = readFile(WEBP_IMAGES_INDEX_FILE);
    webpIndexHtml = webpIndexHtml.replaceAll('Jpeg gallery', 'Webp gallery');
    writeFile(WEBP_IMAGES_INDEX_FILE, webpIndexHtml);
    injectImagesGallery(webpImages, WEBP_IMAGES_FOLDER, WEBP_IMAGES_INDEX_FILE);
}

main().catch(null);
