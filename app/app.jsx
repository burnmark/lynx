
import React from 'react';
import {render} from 'react-dom';

import Page from './components/Page.jsx';
import TitleBar from './components/TitleBar.jsx';

// render(<Page sidebarData={sidebarData} messages={messageData} />, document.getElementById('content1'));
render(<TitleBar title="img/person1.jpg" />, document.getElementById('content1'))