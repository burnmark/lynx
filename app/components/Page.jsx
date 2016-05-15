import React from 'react';

import Sidebar from './Sidebar.jsx';
import Content from './Content.jsx';

export default class Page extends React.Component {
	render() {
		return (
			<div className="page">
				<Sidebar data={this.props.sidebarData} />
				<Content messages={this.props.messages} />
			</div>
		);
	}
}