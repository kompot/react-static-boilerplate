import autoprefixer from 'autoprefixer';
import postcssImport from 'postcss-import';
import postcssNested from 'postcss-nested';
import postcssMixins from 'postcss-mixins';
import postcssSimpleVars from 'postcss-simple-vars';
import postcssCalc from 'postcss-calc';
import postcssGridUnit from 'postcss-grid-unit';
import postcssColorFunction from 'postcss-color-function';

import { paths } from './../config';

const gridSize = 8;

const font = (mixin, size, letterSpacing, family, weight = 400, push = 0) => {
  const lineHeight = Math.ceil(size * 1.3 / gridSize) * gridSize;
  const padding = push && `${push}px 0 ${gridSize - push}px 0`;
  const kerning = letterSpacing && letterSpacing + 'px';
  const base = {
    'font-size': size + 'px',
    'font-family': family + ', PT Sans, sans-serif',
    'font-weight': weight,
    'line-height': lineHeight + 'px',
  };
  if (padding) {
    Object.assign(base, {padding});
  }
  if (kerning) {
    Object.assign(base, {'letter-spacing': kerning});
  }
  return base;
};

const postcss = (webpackCompiler) => {
  return [postcssImport({
    root: paths.app('components'),
    addDependencyTo: webpackCompiler,
  }), postcssMixins({
    mixins: {
      fontLight: (mixin, size, letterSpacing = 0, push = 0) => {
        return font(mixin, size, letterSpacing, 'Roboto', 300, push);
      },
      fontRegular: (mixin, size, letterSpacing = 0, push = 0) => {
        return font(mixin, size, letterSpacing, 'Roboto', 400, push);
      },
      fontMedium: (mixin, size, letterSpacing = 0, push = 0) => {
        return font(mixin, size, letterSpacing, 'Roboto', 500, push);
      },
      fontBold: (mixin, size, letterSpacing = 0, push = 0) => {
        return font(mixin, size, letterSpacing, 'Roboto', 600, push);
      },
    },
  }), postcssSimpleVars({
    variables: () => {
      return {
        colorBlack: '#212121',
        colorWhite: '#ffffff',
      };
    },
  }), postcssNested, postcssGridUnit({
    units: [
      {unit: 'cm', size: gridSize},
    ],
  }), postcssCalc, postcssColorFunction, autoprefixer];
};

export {
  postcss,
};

