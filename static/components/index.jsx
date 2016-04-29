import React from 'react';
import {render} from 'react-dom';

import TitleBar from './TitleBar.jsx';
import TabBar from './TabBar.jsx';
import FilterCard from './FilterCard.jsx';
import LinkDetail from './LinkDetail.jsx';
import Message from './Message.jsx'

var words = ['this', 'is', 'a', 'comment'],
	avatars = [
		'img/person1.jpg',
		'img/person2.jpg',
		'img/person3.jpg',
		'img/person4.jpg'
	],
	messageData = {
		avatarImgUrl: 'img/person1.jpg',
		time: Date.now(),
		note: 'Hey Bob I saw this article and thought of your face because words come out of it.',
		categories: ['articles', 'studies', 'things'],
		linkImgUrl: 'img/cat1.jpg',
		title: 'Studies show things happen',
		descr: 'A new study shows that things happen when people do stuff and it\'s pretty cool to think about about what but link the who what why when where how',
		url: 'http://newyorktimes.com/studies-show-that-thing-happen-yo-whaaaaat'
	};

// render(< />, document.getElementById('content'));

// render(<TitleBar title="hello"/>, document.getElementById('content'));
// render(<TabBar />, document.getElementById('content'));

/*
filter card needs: 
type (either filterbtns or avatars)
	words or avatars
btnclass (true or false/undefined)
title


 */
// render(<FilterCard title="Categories" words={words} avatars={avatars} />, document.getElementById('content'));


// render(<LinkDetail data={messageData} />, document.getElementById('content'));
render(<Message data={messageData} />, document.getElementById('content'));