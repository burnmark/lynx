import React from 'react';

import Input from './Input.jsx'

export default class ShareClosed extends React.Component {

	render() {
		return (
			<div className="share-closed" onClick={this.props.clickEvent}>
				<Input placeholder="Share a link..." />
			</div>
		);
	}
}