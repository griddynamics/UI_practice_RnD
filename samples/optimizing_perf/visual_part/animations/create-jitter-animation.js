const {injectAnimatedObjects, generateBouncingAnimation, AnimationStrategy} = require('./animations');
const {getRandNum, getRandomColor} = require('./utils');

const SCENE_OBJECTS = 50;
const SCENE_OBJECT_CSS_CLASS = 'scene__object';
const ANIMATION_BASE_NAME = 'bouncing_animation';

function main() {
    const cssRules = [];
    const htmlMarkupChunks = [];

    for (let i = 0; i < SCENE_OBJECTS; i++) {
        const objectCssClass = `${SCENE_OBJECT_CSS_CLASS}${i}`;
        const objectMarkup = `<div class="${objectCssClass} ${SCENE_OBJECT_CSS_CLASS}"></div>`;
        const objectAnimationName = `${ANIMATION_BASE_NAME}${i}`;
        const animationDuration = getRandNum(8, 15);
        const animationSteps = getRandNum(8, 15);
        const objectAnimationRules = generateBouncingAnimation(AnimationStrategy.JITTER, animationSteps, objectAnimationName);
        const cssRule = `${objectAnimationRules}\n.${objectCssClass} {animation: ${objectAnimationName} ${animationDuration}s alternate infinite linear; background-color: ${getRandomColor()};}`;
        cssRules.push(cssRule);
        htmlMarkupChunks.push(objectMarkup);
    }

    const animationData = {
        css: cssRules.join('\n'),
        html: htmlMarkupChunks.join('\n'),
    };

    injectAnimatedObjects('index-jitter.html', animationData);
}

main();
