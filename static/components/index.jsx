// eye trackers!

import React from 'react';
import {render} from 'react-dom';

import Page from './Page.jsx';

// $.ajax({
// 	type: 'POST',
// 	url: '/api/signin',
// 	data: JSON.stringify({
// 		email: 'enagmail.com',
// 		password: 'ena'
// 	}),
// 	success: function (data) {
// 		console.log(data);
// 	},
// 	error: function (xhr, status, error) {
// 		console.log(error.message);		
// 	},
// 	dataType: 'json',
//   	contentType: 'application/json'
// });



var messageData = [
		{
			avatarImgUrl: 'img/person1.jpg',
			time: Date.now(),
			note: 'Hey Bob I saw this article and thought of your face because words come out of it.',
			categories: ['articles', 'studies', 'things'],
			linkImgUrl: 'img/cat1.jpg',
			title: 'Studies show things happen',
			descr: 'A new study shows that things happen when people do stuff and it\'s pretty cool to think about about what but link the who what why when where how',
			url: 'http://newyorktimes.com/studies-show-that-thing-happen-yo-whaaaaat',
			first: true
		},
		{
			avatarImgUrl: 'img/person1.jpg',
			time: Date.now(),
			note: 'Hey Bob I saw this article and thought of your face because words come out of it.',
			categories: ['articles', 'studies', 'things'],
			linkImgUrl: 'img/cat1.jpg',
			title: 'Studies show things happen',
			descr: 'A new study shows that things happen when people do stuff and it\'s pretty cool to think about about what but link the who what why when where how',
			url: 'http://newyorktimes.com/studies-show-that-thing-happen-yo-whaaaaat'
		}
	],
	sidebarData = {
		catData: {
			words: ['dog', 'cat', 'people', 'music', 'science', 'animals', 'aww', 'blah'],
			title: 'Categories'			
		},
		domainData: {
			words: ['reddit', 'buzzfeed', 'twitter', 'yahoo', 'google'],
			title: 'Domains'
		},
		pplData: {
			avatars : [
				'img/person1.jpg',
				'img/person2.jpg',
				'img/person3.jpg',
				'img/person4.jpg'
			],
			btnClass: true,
			title: 'People'
		}
	}

render(<Page sidebarData={sidebarData} messages={messageData} />, document.getElementById('content1'));