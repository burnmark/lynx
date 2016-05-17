
import React from 'react';
import {render} from 'react-dom';

import Page from './components/Page.jsx';
import SideBar from './components/Sidebar.jsx';

// render(<Page sidebarData={sidebarData} messages={messageData} />, document.getElementById('content1'));

var data = {
	// values: ['hi', 'hello', 'wow'],
	avatars: ['img/person1.jpg', 'img/person2.jpg'],
	title: 'filter card'
}

render(<SideBar />, document.getElementById('content1'))