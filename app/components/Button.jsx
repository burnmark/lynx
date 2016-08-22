import React from 'react';

export default class Button extends React.Component {
	render() {
		return <button
				onClick={this.props.onClick}
				className={this.props.classname}
		>
			{this.props.placeholder}
		</button>;
	}
}