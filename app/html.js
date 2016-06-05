import React from 'react';

export default ({cssUrl, jsUrl, markup}) => (
  <html>
  <head>
    <meta charSet='utf-8'/>
    <meta name='viewport' content='width=device-width,initial-scale=1'/>
    <title>react-landing-boilerplate</title>
    <link rel='stylesheet' href={'/' + cssUrl}/>
  </head>
  <body>
    <div id='content' dangerouslySetInnerHTML={{__html: markup}}/>
    <script src={'/' + jsUrl} async/>
  </body>
  </html>
);
