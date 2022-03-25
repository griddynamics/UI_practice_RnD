const {
    bucketConvertGifToVideo,
    getDirFiles,
    GIF_IMAGES_FOLDER,
    GIF_IMAGES_INDEX_FILE,
    readFile,
    VIDEO_FOLDER,
    VIDEO_INDEX_FILE,
    writeFile, injectVideoGallery
} = require('./common');

function main() {
    const gifIndexHtml = readFile(GIF_IMAGES_INDEX_FILE);
    bucketConvertGifToVideo(GIF_IMAGES_FOLDER, VIDEO_FOLDER);
    writeFile(VIDEO_INDEX_FILE, gifIndexHtml.replaceAll('Gif gallery', 'Video gallery'));
    const videos = getDirFiles(VIDEO_FOLDER);
    injectVideoGallery(videos, VIDEO_FOLDER, VIDEO_INDEX_FILE);
}

main();
