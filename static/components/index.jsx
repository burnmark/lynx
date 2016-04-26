import React from 'react';
import {render} from 'react-dom';

import TitleBar from './TitleBar.jsx';
import TabBar from './TabBar.jsx';
import FilterCard from './FilterCard.jsx';
import LinkDetail from './LinkDetail.jsx';

var words = ['this', 'is', 'a', 'comment'],
	avatars = [
	'img/person1.jpg',
	'img/person2.jpg',
	'img/person3.jpg',
	'img/person4.jpg'
];

// render(< />, document.getElementById('content'));

// render(<TitleBar title="hello"/>, document.getElementById('content'));
// render(<TabBar />, document.getElementById('content'));
render(<FilterCard title="Categories" words={words} avatars={avatars} />, document.getElementById('content'));
// render(<LinkDetail />, document.getElementById('content'));