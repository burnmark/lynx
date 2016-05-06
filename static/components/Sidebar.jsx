import React from 'react';

import FilterCard from './FilterCard.jsx';

export default class Sidebar extends React.Component {
	render() {	
		return (
			<div className="sidebar">				
				<FilterCard data={this.props.data.domainData}/>
				<FilterCard data={this.props.data.pplData}/>
				<FilterCard data={this.props.data.catData}/>
			</div>
		);
	}
}