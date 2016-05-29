import React from 'react';

import Message from './Message.jsx';
import TabBar from './TabBar.jsx';

import MessageActions from '../actions/MessageActionCreators.jsx';
import MessageStore from '../stores/MessageStore.jsx';

import AppConstants from '../constants/AppConstants.jsx';

export default class Content extends React.Component {
	constructor(props) {
		super(props);
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

	_handleStarred(event) {
		var messageId = $(event.target).attr('data-messageId');
		MessageActions.favoriteMessage(messageId)
			.then(() => {
				MessageActions.getAllMessages()
					.then(() => {
						this._onChange(this.state.clickedTab);
					});
			});
	}	

	_onChange(tabName) {
		switch(tabName) {
			case AppConstants.tabNames.ALL:
				this.setState({
					messages: MessageStore.getAll(),
					clickedTab: AppConstants.tabNames.ALL
				});
				break;
			
			case AppConstants.tabNames.SENT:
				this.setState({
					messages: MessageStore.getSent(),
					clickedTab: AppConstants.tabNames.SENT
				});
				break;	

			case AppConstants.tabNames.RECEIVED:
				this.setState({
					messages: MessageStore.getReceived(),
					clickedTab: AppConstants.tabNames.RECEIVED
				});
				break;	

			case AppConstants.tabNames.STARRED:
				this.setState({
					messages: MessageStore.getStarred(),
					clickedTab: AppConstants.tabNames.STARRED
				});
				console.log(this.state.messages);
				break;	
		}
	}
// tbd: starred clicked
	
	render() {		
		var messages = 'No messages yet.';		
		if (this.state.messages) {
			messages = this.state.messages.map((message) => {
				return <Message key={message.id} data={message} handleStarred={this._handleStarred.bind(this)}/>;
			});
		}

		return (
			<div className="panel panel-main">
				<TabBar 
					allClicked={this._onChange.bind(this, AppConstants.tabNames.ALL)}
					sentClicked={this._onChange.bind(this, AppConstants.tabNames.SENT)}
					receivedClicked={this._onChange.bind(this, AppConstants.tabNames.RECEIVED)}
					starredClicked={this._onChange.bind(this, AppConstants.tabNames.STARRED)}					
				/>
				<div className="panel-content">
					{messages}
				</div>
			</div>
		);
	}
}