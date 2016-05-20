import React from 'react';

export default class Button extends React.Component {
	render() {
		return (
			<button className={this.props.classname}>{this.props.placeholder}</button>
		);
	}
}