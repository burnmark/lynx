import React from 'react';

import SearchBtn from './SearchBtn.jsx';

export default class TitleBar extends React.Component {
	render() {
		return (
			<h3 className="title-bar content-wrap">				
					{this.props.title}
					<SearchBtn />
			</h3>	
		);
	}
}
