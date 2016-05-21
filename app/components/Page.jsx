import React from 'react';

import Sidebar from './Sidebar.jsx';
import Content from './Content.jsx';
import Navbar from './Navbar.jsx';

import AuthAction from '../actions/AuthActionCreators.jsx';
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
		AuthAction.login();
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
		if (this.state.loggedIn) {
			return (

				<div className="page">					
					<Navbar />
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