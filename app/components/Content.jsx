import React from 'react';

import Message from './Message.jsx';
import TabBar from './TabBar.jsx';

import MessageActions from '../actions/MessageActionCreators.jsx';
import MessageStore from '../stores/MessageStore.jsx';

export default class Content extends React.Component {
	constructor(props) {
		super(props);

		// currently not being sorted by sent/received
		this.state = {
			messages: []
		};

		this._onChange = this._onChange.bind(this);
	}

	componentWillMount() {
		MessageActions.getAllMessages();
	}

	componentDidMount() {
		MessageStore.addChangeListener(this._onChange);
	}

	componentWillUnmount() {
		MessageStore.removeChangeListener(this._onChange);		
	}

	_onChange() {
		this.setState({
			messages: MessageStore.getSent()
		})
	}

	
	render() {
		console.log(this.state);
		var messages = 'No messages yet.';
		if (this.state.messages) {
			messages = this.state.messages.map((message, i) => {
				return <Message key={i} data={message} />;
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