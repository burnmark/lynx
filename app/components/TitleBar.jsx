import React from 'react';

import SearchBtn from './SearchBtn.jsx';

export default class TitleBar extends React.Component {
	render() {
		return (
			<div className="title-bar">				
				<span className="title">{this.props.title}</span>
			</div>	
		);
	}
}
