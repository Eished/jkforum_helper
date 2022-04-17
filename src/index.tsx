import React from 'react';
// import $ from 'jquery';
import { render } from 'react-dom';

const tailwindStyles = require('./output.css');
GM_addStyle(tailwindStyles);

import App from '@/app';

$('body').append(`<div id="jkforum-helper"/>`);
render(<App />, document.getElementById('jkforum-helper'));

// const rootDiv = document.createElement('div');
// rootDiv.id = 'jkforum-helper';
// document.body.append(rootDiv);

// ReactDOM.render(<App />, rootDiv);
