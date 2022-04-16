import React from 'react';
import App from '@/app';
import $ from 'jquery';
import {render} from 'react-dom';

$('body').append(`<div id="jkforum-helper"/>`);

render(<App />, document.getElementById('jkforum-helper'));

// const rootDiv = document.createElement('div');
// rootDiv.id = 'jkforum-helper';
// document.body.append(rootDiv);

// render(<App />, rootDiv);
