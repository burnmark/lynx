import React from 'react';

export default class TextArea extends React.Component {
	render() {
		return (
			<textarea
				class="u-fill-width"
				type="text"
				placeholder={this.props.placeholder}
				rows="10"
				onChange={this.props.onChange}
			>
			</textarea>
		);
	}
}