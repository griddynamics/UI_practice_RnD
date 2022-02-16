## Blurhash demo

This is a proof of concept illustrating the benefits of using blurhash as placeholder for images.
The POC **isn't production ready** and serves the informational purpose only.

## Usage manual
* Place your images to `/public/img`.
* `npm run add-placeholders` to generate and inject placeholders.
* `npm run build` to build a front-end bundle.
* `npm run build-dev` to constantly rebuild the front-end bundle upon changes in `index.js`.
* `npm run start` to launch a web server. Navigate to `localhost:3000/index.html` to access a page version with blurhash placeholders and `localhost:3000/index2.html` to access a page that ties to load images right away without using placeholders.

## Verifying performance results
* Use [`PageSpeed Insights`](https://pagespeed.web.dev/) to compare two versions
