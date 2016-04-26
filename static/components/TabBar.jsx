import React from 'react';

import SearchBtn from './SearchBtn.jsx';

export default class TabBar extends React.Component {
	render() {
		return (
			<h3 className="title-bar">
				<span className="selected">To</span>				
				<span>From</span>
				<SearchBtn />
			</h3>
		);
	}
}