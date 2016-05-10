import React from 'react';

import Message from './Message.jsx';
import TabBar from './TabBar.jsx';

// content will recieve an array of messageData objects
export default class Content extends React.Component {
	constructor(props) {
		super(props);

		// currently not being sorted by sent/received
		this.state = {
			sent: [],
			received: []
		};
	}

	componentWillMount() {
		this.getMessagesFromServer();
	}

	getMessagesFromServer() {
		Promise.all([$.getJSON('/api/message/received'), $.getJSON('/api/message/sent')])
			.then(values => this.setState({
				sent: values[0],
				received: values[1]
			}));
	}

	// componentDidMount() {
	// 	this.getMessagesFromServer();
	// }

	render() {
		// var messages = this.props.messages.map((messageData, i) => {
		// 	return <Message key={i} data={messageData} />;
		// });


		console.log(this.state);
		var messages = 'No messages yet.';
		if (this.state.sent) {
			messages = this.state.sent.map((messageData, i) => {
				return <Message key={i} data={messageData} />;
			});
		}

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
