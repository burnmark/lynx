import React from 'react';
import SearchBtn from './SearchBtn.jsx';

export default class TabBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {toClicked: true}
	}

	_handleClick(event) {
		this.setState({toClicked: !this.state.toClicked});
	}

	render() {
		return (
			<div className="title-bar title-bar-main" onClick={this._handleClick.bind(this)}>
				<span className={this.state.toClicked ? 'title tab selected' : 'title tab'}>Sent</span>				
				<span className={this.state.toClicked ? 'title tab' : 'title tab selected'}>Received</span>
				<span className={this.state.toClicked ? 'title tab' : 'title tab selected'}>All</span>
				<SearchBtn />
			</div>
		);
	}
}