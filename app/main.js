import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';

import routes from './routes';
import {
  Router,
  RouterContext,
  match,
  browserHistory,
  createMemoryHistory,
} from 'react-router';

import Html from './html';

if (typeof document !== 'undefined') {
  ReactDOM.render(
    <Router history={browserHistory} routes={routes} />,
    document.getElementById('content')
  );
}

export default (locals, callback) => {
  const clientChunk = locals.webpackStats.compilation.chunks[0];
  const cssUrl = clientChunk.files.find(x => /\.css$/.test(x));
  const jsUrl = clientChunk.files.find(x => /\.js/.test(x));

  const history = createMemoryHistory();
  const location = history.createLocation(locals.path);

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    const markup = ReactDOMServer.renderToString(
      <RouterContext {...renderProps} />);
    const html = ReactDOMServer.renderToStaticMarkup(
      <Html jsUrl={jsUrl} cssUrl={cssUrl} markup={markup}/>);
    callback(null, `<!doctype html>\n${html}\n`);
  });
};
