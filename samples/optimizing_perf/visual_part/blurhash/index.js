import {decode} from "blurhash";

function renderImg(hashData, options) {
    const {hash, width, height, url} = hashData;
    const pixels = decode(hash, width, height);
    const canvas = document.createElement('canvas');
    canvas.classList.add('app__canvas_area')
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.createImageData(width, height);
    imageData.data.set(pixels);
    ctx.putImageData(imageData, 0, 0);
    options.container.append(canvas);

    return new Promise((res, rej) => {
        const img = new Image();
        img.onload = () => res(img);
        img.onerror = (error) => rej(error);
        img.src = url;
    }).then(img => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0)
    });
}

function wipeNode(node) {
    if (!node) {
        return;
    }
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

async function main(serializedImages) {
    const perfMarker = 'gallery_render';
    console.time(perfMarker);
    const appGallery = document.querySelector('.app__gallery');
    wipeNode(appGallery);

    const renderJobs = serializedImages.map(imgData => renderImg(imgData, {
        width: 64,
        height: 64,
        container: appGallery,
    }));
    console.log(`Rendered ${serializedImages.length} placeholders`);

    await Promise.all(renderJobs);
    console.log('Rendered real images');
    console.timeEnd(perfMarker);
}

main(window.__img__hashes__ || []).catch(null);
