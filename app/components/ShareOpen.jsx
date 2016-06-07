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
		// return (
		// 	<div className={this.props.data.shareOpenHidden ? 'share-open hidden' : 'share-open'}>
		// 		<input 
		// 			className="u-full-width" 
		// 			type="text"
		// 			placeholder="Share a link" />
		// 		<input 
		// 			className="u-full-width" 
		// 			type="text"
		// 			placeholder="To a user" />
		// 		<textarea
		// 			class="u-fill-width"
		// 			type="text"
		// 			placeholder={this.props.placeholder}
		// 			rows="10"></textarea>

		// 		<button
		// 			className="button-primary"
		// 			type="submit">Send</button>

		// 		<button
		// 			className="button cancel-btn"
		// 			onClick={this.props.clickEvent}>Cancel</button>

		// 	</div>
		// );
	}
}