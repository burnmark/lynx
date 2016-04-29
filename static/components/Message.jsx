import React from 'react';

import Avatar from './Avatar.jsx';
import FilterBtn from './FilterBtn.jsx';
import LinkDetail from './LinkDetail.jsx';

export default class Message extends React.Component {
	render() {
		// needs 
		// datetime, note, and [categories]
		// avatarImgUrl
		// linkImgUrl, title, descr, url
		// word
		var categories = this.props.data.categories.map(function (category, i) {
			return <FilterBtn key={i} word={category} />;
		});
		return (
			<div className="message">
			    <div className="sender">			        

			        <Avatar imgUrl={this.props.data.avatarImgUrl} />

			        <div className="time">3:30pm<br />Feb 11<br />2015</div>
			    </div>
			    <div className="content">
			        
			    	<LinkDetail data={this.props.data} />

			        <div className="note">
			            {this.props.data.note}
			        </div>


			        <div>
			        	{categories}			            
			        </div>
			    </div>
			</div>			
		)
	}
}

