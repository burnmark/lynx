import React from 'react';

import ShareClosed from './ShareClosed.jsx';
import ShareOpened from './ShareOpen.jsx';
import Avatar from './Avatar.jsx';

export default class Navbar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			overlayHidden: true,
			shareOpenedHidden: true
		}
	}

	_handleShareClick() {
		this.setState({
			overlayHidden: !this.state.overlayHidden,
			shareOpenedHidden: !this.state.shareOpenedHidden
		});
	}


	render() {
		return (
			<div className="header">
				<div className={this.state.overlayHidden ? 'overlay hidden' : 'overlay'} id="overlay"></div>
				
				<div className="logo">lynx</div>

				<div className="share">
					<ShareClosed data={this.state} clickEvent={this._handleShareClick.bind(this)}/>

					<ShareOpened data={this.state} clickEvent={this._handleShareClick.bind(this)}/>
				</div>
				<div className="account">
					<Avatar btnClass={true} imgUrl="img/person1.jpg" />
				</div>
			</div>
		);
	}
}
 