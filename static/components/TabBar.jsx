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
			<h3 className="title-bar" onClick={this._handleClick.bind(this)}>
				<span className={this.state.toClicked ? 'selected' : ''}>To</span>				
				<span className={this.state.toClicked ? '' : 'selected'}>From</span>
				<SearchBtn />
			</h3>
		);
	}
}