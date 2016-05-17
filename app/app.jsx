
import React from 'react';
import {render} from 'react-dom';

import Page from './components/Page.jsx';
import FilterCard from './components/FilterCard.jsx';

// render(<Page sidebarData={sidebarData} messages={messageData} />, document.getElementById('content1'));

var data = {
	// values: ['hi', 'hello', 'wow'],
	avatars: ['img/person1.jpg', 'img/person2.jpg'],
	title: 'filter card'
}

render(<FilterCard data={data} />, document.getElementById('content1'))