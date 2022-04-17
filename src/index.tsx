import React from 'react';
// import $ from 'jquery';
import { render } from 'react-dom';

const tailwindStyles = require('./output.css');
// delete css bug
GM_addStyle(
  tailwindStyles
    .replace(/\nimg,\nvideo {\n  max-width: 100%;\n  height: auto;\n}\n/, '')
    .replace(
      /\*,\n::before,\n::after \{\n  box-sizing: border-box;\n  \/\* 1 \*\/\n  border-width: 0;\n  \/\* 2 \*\/\n  border-style: solid;\n  \/\* 2 \*\/\n  border-color: #e5e7eb;\n  \/\* 2 \*\/\n}/,
      ''
    )
    .replace(/background-color: transparent;/g, '')
    .replace(/background-image: none;/g, '')
    .replace(/display: block;\n  \/\* 1 \*\//, '')
    .replace(/padding-top: 0.5rem;\n  padding-right: 0.75rem;\n  padding-bottom: 0.5rem;\n  padding-left: 0.75rem;/, '')
);
// .replace(/ /, ''));

import App from '@/app';

// $('body').prepend(`<div id="jkforum-helper"/>`);
// render(<App />, document.getElementById('jkforum-helper'));

const rootDiv = document.createElement('div');
rootDiv.id = 'jkforum-helper';
document.body.append(rootDiv);

render(<App />, rootDiv);
