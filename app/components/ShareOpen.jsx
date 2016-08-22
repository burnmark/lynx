import React from 'react';
import ReactDOM from 'react-dom';

import Input from './Input.jsx';
import TextArea from './TextArea.jsx';
import Button from './Button.jsx';

export default class ShareOpen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			url: '',
			recipient: '',
			note: ''
		};
	}
	componentDidMount() {
		ReactDOM.findDOMNode(this.refs.url).focus();
	}
	handleUrlChange(e) {
		this.setState({url: e.target.value});
	}
	handleSubmit() {
		var url = ReactDOM.findDOMNode(this.refs.url);
		var recipient = ReactDOM.findDOMNode(this.refs.recipient);
		var note = ReactDOM.findDOMNode(this.refs.note);

		//send to server
		console.log(url.value, recipient.value, note.value);

		url.value = '';
		recipient.value = '';
		note.value = '';

	}
	render() {
		return (
			<div className={this.props.data.shareOpenedHidden ? 'share-open hidden' : 'share-open'}>
				<input
					className="u-full-width"
					type="text"
					placeholder="Share a link"
					ref="url"
					value={this.state.url}
					onChange={this.handleUrlChange.bind(this)}
				/>

				<Input
					placeholder="To a user"
					ref="recipient"
					value={this.state.recipient}
				/>
				<TextArea
					placeholder="Add a note (optional)"
					ref="note"
					value={this.state.note}
				/>
				<Button
					onClick={this.handleSubmit.bind(this)}
					placeholder="Send"
					classname="button-primary"
				/>
				<Button
					onClick={this.props.clickEvent}
					placeholder="Cancel"
					classname="button cancel-btn"
				/>
			</div>
		);
	}
}