import React from 'react';

import Sidebar from './Sidebar.jsx';
import Content from './Content.jsx';

import AuthActionCreators from '../actions/AuthActionCreators.jsx';
import AuthStore from '../stores/AuthStore.jsx';

export default class Page extends React.Component {
	constructor(props) {		
		super(props);
		this.state = {
			loggedIn: false
		}			
		this._onChange = this._onChange.bind(this);
	}

	componentWillMount() {
		AuthActionCreators.login();
	}

	componentDidMount() {
		AuthStore.addChangeListener(this._onChange);
	}

	componentWillUnmount() {
		AuthStore.removeChangeListener(this._onChange);
	}

	_onChange() {
		this.setState(AuthStore.get());
	}

	render() {
		console.log(this.state);
		if (this.state.loggedIn) {
			return (
				<div className="page">
					<Sidebar data={this.props.sidebarData} />
					<Content messages={this.props.messages} />
				</div>
			);
		} else {
			return (
				<div>
					<h1>Not logged in</h1>
				</div>
			)
		}
	}
}