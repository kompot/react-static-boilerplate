React static boilerplate
========================

[React](http://facebook.github.io/react/) boilerplate to produce static websites in a sensible way. 

Getting started
---------------
1. `npm install` to install dependencies
2. `npm start` to develop with hot reloading
3. `npm run build` to produce production-ready version with everything minified in `dist` folder.

Rationale
---------
You want to:

- have "good enough" frontend stack
- produce static websites as quickly as possible and
- you don't have middle+ developers' time to perform basic setup

This project might be a nice fit for your needs.

Features
--------

* [React-router](https://github.com/reactjs/react-router) for routing support 

  Feel free to add routes to `app/routes/index` and have your generated web site support any folder structure. Do not forget to add routes to be crawled during `npm run build` phase to `webpack.config.babel.js`.

* [PostCSS](https://github.com/postcss/postcss) for styling 

  Use PostCSS for CSS by default (or replace it with your favourite preprocessor in webpack's config or some kind of `css-in-js` solution like [aphrodite](https://github.com/Khan/aphrodite))

* [Redux](https://github.com/reactjs/redux) and [redux-saga](https://github.com/yelouafi/redux-saga) for application state 

  Use `redux` for application state and `redux-saga` to manage side effects if required (or drop it completely from the project by replacing redux's `Provider` in `app/routes/Root` with a simple `div` and shave some weight off the resulting js bundle).
