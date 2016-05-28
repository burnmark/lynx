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
	}

	componentWillMount() {
		MessageActions.getAllMessages()
			.then(() => this.setState({
				messages: MessageStore.getReceived()
			}));
	}

	componentDidMount() {
		MessageStore.addChangeListener(this._onChange);
	}

	componentWillUnmount() {
		MessageStore.removeChangeListener(this._onChange);		
	}

	_onChange(tabName) {
		switch(tabName) {
			case AppConstants.tabNames.RECEIVED:
				this.setState({
					messages: MessageStore.getReceived(),
					clickedTab: AppConstants.tabNames.RECEIVED
				});
				break;

			case AppConstants.tabNames.SENT:
				this.setState({
					messages: MessageStore.getSent(),
					clickedTab: AppConstants.tabNames.SENT
				});
				break;

			case AppConstants.tabNames.ALL:
				this.setState({
					messages: MessageStore.getAll(),
					clickedTab: AppConstants.tabNames.ALL
				});
				break;

			// default:
			// 	this.setState({
			// 		messages: MessageStore.getReceived(),
			// 		clickedTab: AppConstants.tabNames.RECEIVED
			// 	});
		}
	}

	// _sentClicked() {
	// 	this.setState({
	// 		messages: MessageStore.getSent(),
	// 		clickedTab: AppConstants.tabNames.SENT
	// 	});
	// }

	// _receivedClicked() {
	// 	this.setState({
	// 		messages: MessageStore.getReceived(),
	// 		clickedTab: AppConstants.tabNames.RECEIVED
	// 	})
	// }

	// _allClicked() {
	// 	console.log('All clicked triggered');
	// 	this.setState({
	// 		messages: MessageStore.getAll(),
	// 		clickedTab: AppConstants.tabNames.ALL
	// 	});
	// }

// tbd: starred clicked
	
	render() {
		var messages = 'No messages yet.';
		if (this.state.messages) {
			messages = this.state.messages.map((message, i) => {
				return <Message key={i} data={message} />;
			});
		}

		return (
			<div className="panel panel-main">
				<TabBar 
					sentClicked={this._onChange.bind(this, AppConstants.tabNames.SENT)}
					receivedClicked={this._onChange.bind(this, AppConstants.tabNames.RECEIVED)}
					allClicked={this._onChange.bind(this, AppConstants.tabNames.ALL)}
				/>
				<div className="panel-content">
					{messages}
				</div>
			</div>
		);
	}
}