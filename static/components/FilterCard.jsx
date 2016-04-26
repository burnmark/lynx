import React from 'react';

import FilterBtn from './FilterBtn.jsx';
import Avatar from './Avatar.jsx';
import TitleBar from './TitleBar.jsx';

export default class FilterCard extends React.Component {	
	render() {
		var words = this.props.words.map(function (word, i) {
				return <FilterBtn key={i} word={word} />;
		});
		var avatars = this.props.avatars.map(function (avatar, i) {
				console.log(avatar);
				return <Avatar key={i} btnClass={true} imgUrl={avatar} />;
		});

		return (
			<div>
				<TitleBar title={this.props.title} />
				<div className="content-wrap">
					{words}
					<br />
					{avatars}
				</div>
			</div>
		);
	}
}

