import React from 'react';

import Message from './Message.jsx';
import TabBar from './TabBar.jsx';

// content will recieve an array of messageData objects
export default class Content extends React.Component {
	render() {
		var messages = this.props.messages.map((messageData, i) => {
			return <Message key={i} data={messageData} />;
		});
		return (
			<div className="content">
				<TabBar />
				<div className="content-area">
					{messages}
				</div>
			</div>
		);
	}
}
