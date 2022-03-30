const {getRandNum, readFile, writeFile} = require('./utils');

class AnimationStrategy {
    static JITTER = 'animation_jitter';
    static OPTIMIZED = 'animation_optimized';
}

const generateJitterCoords = (xValue, yValue, xDimension, yDimension, objectWidth, objectHeight, objectWidthDimension, objectHeightDimension) => `left: max(0${xDimension}, calc(${xValue}${xDimension} - ${objectWidth}${objectWidthDimension})); top: max(0${yDimension}, calc(${yValue}${yDimension} - ${objectHeight}${objectHeightDimension}));`;
const generateOptimizedCoords = (xValue, yValue, xDimension, yDimension, objectWidth, objectHeight, objectWidthDimension, objectHeightDimension) => `transform: translate(max(0${xDimension}, calc(${xValue}${xDimension} - ${objectWidth}${objectWidthDimension})), max(0${yDimension}, calc(${yValue}${yDimension} - ${objectHeight}${objectHeightDimension})));`;

function generateBouncingAnimation(strategy, steps, animationName) {
    const ACTIONS_MAP = {
        [AnimationStrategy.JITTER]: generateJitterCoords,
        [AnimationStrategy.OPTIMIZED]: generateOptimizedCoords,
    };

    if (!ACTIONS_MAP.hasOwnProperty(strategy)) {
        throw new Error(`Unknown animation strategy: ${strategy}`);
    }
    if (!steps) {
        throw new Error(`Invalid number of animation steps: ${steps}`);
    }

    const generateAnimationStep = ACTIONS_MAP[strategy];
    const animationSteps = [];
    let curPercentage = 0;
    const percentageIncrement = Number((100 / steps).toFixed(2));
    for (let i = 0; i < steps; i++) {
        const xCoord = getRandNum(0, 100);
        const yCoord = getRandNum(0, 100);
        const curStep = `${curPercentage}% {${generateAnimationStep(xCoord, yCoord, 'vw', 'vh', 100, 100, 'px', 'px')}}`;
        curPercentage = Math.floor(curPercentage + percentageIncrement);
        animationSteps.push(curStep);
    }


    return `@keyframes ${animationName} {${animationSteps.join('\n')}}`;
}

function injectAnimatedObjects(inputFile, data) {
    const {css, html} = data;
    let indexHtml = readFile(inputFile);
    const ANIMATION_START_MARKER = '<!--ANIMATION:BEGIN-->';
    const SCENE_OBJECTS_START_MARKER = '<!--SCENE:BEGIN-->';
    const animationStartMarker = indexHtml.indexOf(ANIMATION_START_MARKER);
    const animationEndMarker = indexHtml.indexOf('<!--ANIMATION:END-->');
    const sceneObjectsStartMarker = indexHtml.indexOf(SCENE_OBJECTS_START_MARKER);
    const sceneObjectsEndMarker = indexHtml.indexOf('<!--SCENE:END-->');
    indexHtml = indexHtml.slice(0, animationStartMarker + ANIMATION_START_MARKER.length) + `<style>${css}</style>` + indexHtml.slice(animationEndMarker, sceneObjectsStartMarker + SCENE_OBJECTS_START_MARKER.length) + html + indexHtml.slice(sceneObjectsEndMarker);
    writeFile(inputFile, indexHtml);
}

module.exports = {
    injectAnimatedObjects,
    generateBouncingAnimation,
    AnimationStrategy,
};
