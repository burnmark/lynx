import React from 'react';

import FilterBtn from './FilterBtn.jsx';
import Avatar from './Avatar.jsx';
import TitleBar from './TitleBar.jsx';

export default class FilterCard extends React.Component {	
	render() {
		var content;			
		if (this.props.data.words) {
			content = this.props.data.words.map((word, i) => {
				return <FilterBtn key={i} word={word} />;
			});
		} else if (this.props.data.avatars) {
			content = this.props.data.avatars.map((avatar, i) => {
				return <Avatar key={i} btnClass={this.props.data.btnClass} imgUrl={avatar} />;
			});
		}

		return (
			<div className="filter-card">
				<TitleBar title={this.props.data.title} />
				<div className="content-wrap content-area">
					{content}
				</div>
			</div>
		);
	}
}

