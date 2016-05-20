import React from 'react';

import Message from './Message.jsx';
import TabBar from './TabBar.jsx';

import MessageActions from '../actions/MessageActionCreators.jsx';
import MessageStore from '../stores/MessageStore.jsx';

import AppConstants from '../constants/AppConstants.jsx';

export default class Content extends React.Component {
	constructor(props) {
		super(props);

		// currently not being sorted by sent/received
		this.state = {
			messages: [],
			clickedTab: AppConstants.tabNames.RECEIVED
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
			messages: MessageStore.getReceived()
		})
	}

	_sentClicked() {
		this.setState({
			messages: MessageStore.getSent()
		});
	}

	_receivedClicked() {
		this.setState({
			messages: MessageStore.getReceived()
		})
	}

	_allClicked() {
		this.setState({
			messages: MessageStore.getAll()
		});
	}

// tbd: starred clicked
	
	render() {
		var messages = 'No messages yet.';
		if (this.state.messages) {
			messages = this.state.messages.map((message) => {
				return <Message key={message.id} data={message} />;
			});
		}

		return (
			<div className="panel panel-main">
				<TabBar 
					sentClicked={this._sentClicked.bind(this)}
					receivedClicked={this._receivedClicked.bind(this)}
					allClicked={this._allClicked.bind(this)}
				/>
				<div className="panel-content">
					{messages}
				</div>
			</div>
		);
	}
}