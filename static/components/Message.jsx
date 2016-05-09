import React from 'react';

import Avatar from './Avatar.jsx';
import FilterBtn from './FilterBtn.jsx';
import LinkDetail from './LinkDetail.jsx';

export default class Message extends React.Component {
	render() {
		var categories = this.props.data.categories.map(function (category, i) {
			return <FilterBtn key={i} word={category} />;
		}),
			classes = this.props.data.first ? 'message first' : 'message';
		return (
			<div className={classes}>
			    <div className="sender">			        

			        <Avatar imgUrl={this.props.data.avatarImgUrl} />

			        <div className="time">3:30pm<br />Feb 11<br />2015</div>
			    </div>
			    <div className="link-content">			    				       
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

/*
openopa
ena

penut
popenoput

add op is the sylabol starts with a consonant 
*/