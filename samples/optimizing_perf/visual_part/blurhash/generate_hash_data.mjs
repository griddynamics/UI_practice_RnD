import { getPlaiceholder } from "plaiceholder";
import {join} from 'path';
import {readdir, writeFile} from 'fs';

async function extractImagesPaths(imgFolder) {
    const files = await new Promise((res, rej) => {
        readdir(imgFolder, (err, files) => {
            if (err) {
                return rej(err);
            }
            res(files)
        });
    });
    const isImg = imgPath => /(jp?eg|png)$/i.test(imgPath);
    console.log('Fetched a list of images');

    return files.filter(isImg);
}

async function generateHashes(imgPaths, imgFolder) {
    const hashes = [];
    for (const imgPath of imgPaths) {
        try {
            const adjustedPath = `/${join(imgFolder, imgPath)}`;
            const {blurhash} = await generateHash(adjustedPath);
            const serializedImgData = {
                ...blurhash,
                url: `public${adjustedPath}`,
            };
            hashes.push(serializedImgData);
        } catch (error) {
            console.error(`Failed to generate a hash for img path ${imgPath}: `, error);
        }
    }
    console.log(`Generated hashes for ${hashes.length} images`);

    return hashes;
}

function generateHash(imgPath, options = {size: 64}) {
    return getPlaiceholder(imgPath, options);
}

async function saveHashes(hashes) {
    try {
        const outputFile = join('./', 'hashes.json');
        const outputData = JSON.stringify(hashes);
        await new Promise((res, rej) => {
           writeFile(outputFile, outputData, err => {
               if (err) {
                   return rej(err);
               }
               res();
           });
        });
        console.log('Stored hashes in a file');
    } catch (error) {
        console.warn('Hashes generation failed: ', error);
    }
}

async function main() {
    const perfMarker = 'generate_hashes';
    console.time(perfMarker);
    const imgFolder = 'img';
    const imagesPaths = await extractImagesPaths(join(process.cwd(), 'public', imgFolder));
    const hashes = await generateHashes(imagesPaths, imgFolder);
    await saveHashes(hashes);
    console.timeEnd(perfMarker);
}

main().catch(null);
