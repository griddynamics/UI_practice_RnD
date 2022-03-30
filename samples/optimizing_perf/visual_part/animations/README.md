## Animations optimization demo

This is a proof of concept illustrating the benefits of using [`transform`](https://developer.mozilla.org/en-US/docs/Web/CSS/transform) based css animations.
The POC **isn't production ready** and serves the informational purpose only.

## Usage manual
* `npm run generate:animation:jitter` to generate a jitter animation based on layout shift (`left` and `top` properties), where the number of scene objects is controlled by the `SCENE_OBJECTS` parameter.
* `npm run generate:animation:optimized` to generate an optimized animation based on [`transform`](https://developer.mozilla.org/en-US/docs/Web/CSS/transform), where the number of scene objects is controlled by the `SCENE_OBJECTS` parameter.
* `npm run start:dev` to start a development server
  * [`http://127.0.0.1:3000/index-jitter.html`](http://127.0.0.1:3000/index-jitter.html) to access the jitter animation demo
  * [`http://127.0.0.1:3000/index-optimized.html`](http://127.0.0.1:3000/index-optimized.html) to access the optimized animation demo

## Verifying performance results
* Use [`PageSpeed Insights`](https://pagespeed.web.dev/) to compare two versions
