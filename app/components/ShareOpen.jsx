import React from 'react';

import Input from './Input.jsx';
import TextArea from './TextArea.jsx';
import Button from './Button.jsx';

export default class ShareOpen extends React.Component {
	render() {
		return (
			<div className={this.props.data.shareOpenedHidden ? 'share-open hidden' : 'share-open'}>
				<Input placeholder="Share a link" />
				<Input placeholder="To a user" />
				<TextArea placeholder="Add a note (optional)" />
				<Button placeholder="Send" classname="button-primary" />
				<Button cancelClick={this.props.clickEvent} placeholder="Cancel" classname="button cancel-btn" />
			</div>
		);
	}
}