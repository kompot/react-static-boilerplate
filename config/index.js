import path, { resolve } from 'path';

export const BASE_PATH = path.resolve(__dirname, '..');
export const APP = 'app';
export const DIST = 'dist';

export const env = process.env.NODE_ENV || 'development';

export const globals = {
  'process.env': {
    NODE_ENV: JSON.stringify(env),
  },
};

export const paths = (() => {
  const base = (...args) => resolve.apply(resolve, [BASE_PATH, ...args]);

  return {
    base,
    app: base.bind(null, APP),
    dist: base.bind(null, DIST),
  }
})();

export const aliases = [
  'actions',
  'components',
  'reducers',
  'routes',
  'sagas',
  'store',
].reduce((acc, x) => ((acc[x] = paths.app(x)) && acc), {});
