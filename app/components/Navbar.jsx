import React from 'react';

import ShareClosed from './ShareClosed.jsx';
import ShareOpened from './ShareOpen.jsx';
import Avatar from './Avatar.jsx';

export default class Navbar extends React.Component {
	render() {
		return (
			<div className="header">
				<div className="logo">lynx</div>

				<div className="share">
					<ShareClosed />

					<ShareOpened />
				</div>
				<div className="account">
					<Avatar btnClass={true} imgUrl="img/person1.jpg" />
				</div>
			</div>
		);
	}
}