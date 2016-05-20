import React from 'react';
import SearchBtn from './SearchBtn.jsx';

import AppConstants from '../constants/AppConstants.jsx';
import MessageActions from '../actions/MessageActionCreators.jsx';

export default class TabBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			clicked: AppConstants.tabNames.RECEIVED
		}
	}

	_handleClick(event) {
		var clickedTab = event.target.getAttribute("data-tab-name");
		if (clickedTab) {
			this.setState({clicked: clickedTab});
		}		
	}


	render() {
		
		return (			
			<div className="title-bar title-bar-main" onClick={this._handleClick.bind(this)}>
				<span 
					data-tab-name={AppConstants.tabNames.ALL} 
					className={this.state.clicked ===  AppConstants.tabNames.ALL ? 'title tab selected' : 'title tab'}
					onClick={this.props.allClicked}
				>All</span>	

				<span 
					data-tab-name={AppConstants.tabNames.SENT} 
					className={this.state.clicked ===  AppConstants.tabNames.SENT ? 'title tab selected' : 'title tab'}
					onClick={this.props.sentClicked}
				>Sent</span>	

				<span 
					data-tab-name={AppConstants.tabNames.RECEIVED} 
					className={this.state.clicked ===  AppConstants.tabNames.RECEIVED ? 'title tab selected' : 'title tab'}
					onClick={this.props.receivedClicked}
				>Received</span>

				<span 
					data-tab-name={AppConstants.tabNames.STARRED} 
					className={this.state.clicked ===  AppConstants.tabNames.STARRED ? 'title tab selected' : 'title tab'}
				>Starred</span>				
			</div>
		);
	}
}