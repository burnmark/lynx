import React from 'react';

export default class Input extends React.Component {
	render() {
		return(
			<input 
				className="u-full-width" 
				type="text"
				placeholder={this.props.placeholder} />
		)
	}
}