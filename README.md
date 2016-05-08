# ng2bp
An Angular2 project boilerplate I decided to make for learning purposes.

*inspired by* [AngularClass - angular2-webpack-starter](https://github.com/AngularClass/angular2-webpack-starter)

## Features
- webpack-dev-server development
- hot module reloading
- webpack production build
- testing with karma and jasmine
- sass
- html
- typescript

## TODO
- move helpers into subfolder with functions in seperate files

***

## How to Use
`npm run dev`
`npm run build`
`npm run test`
`npm run test:watch`

### Running End to End Tests
1 `npm run build`
2 `cd dist`
3 `http-server -p 8080`
4 `npm run e2e`

***

## Angular 2 Polyfills
- core-js/es6
- core-js/es7
- zone.js/dist/zone
- ts-helpers
