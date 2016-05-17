
import React from 'react';
import {render} from 'react-dom';

import Page from './components/Page.jsx';
import Avatar from './components/Avatar.jsx';

// render(<Page sidebarData={sidebarData} messages={messageData} />, document.getElementById('content1'));
render(<Avatar imgUrl="img/person1.jpg" />, document.getElementById('content1'))