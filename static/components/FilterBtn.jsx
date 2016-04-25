import React from 'react';

export default class FilterBtn extends React.Component {
	render() {
		return (
			<span className="filter-btn">
				{this.props.word}
			</span>
		);
	}
}

 