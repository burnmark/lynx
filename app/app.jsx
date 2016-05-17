
import React from 'react';
import {render} from 'react-dom';

import Page from './components/Page.jsx';
import Content from './components/Content.jsx';

render(<Page />, document.getElementById('content1'));

var data = {
	// values: ['hi', 'hello', 'wow'],
	avatars: ['img/person1.jpg', 'img/person2.jpg'],
	title: 'filter card'
}

// render(<Content />, document.getElementById('content1'))