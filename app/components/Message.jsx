import React from 'react';
import moment from 'moment';

import Avatar from './Avatar.jsx';
import FilterBtn from './FilterBtn.jsx';
import LinkDetail from './LinkDetail.jsx';

export default class Message extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			categories: []
		}
	}

	componentWillMount() {
		this.getMessageCategories();
	}

	getMessageCategories() {
		$.getJSON('/api/category/' + this.props.data.id)
			.then(data => this.setState({categories: data}))
	}

	render() {
		var categories;
		if (this.state.categories) {
			categories = this.state.categories.map(function (category, i) {
				return <FilterBtn key={i} word={category} />;
			});
		}
		var timeSent = moment(parseInt(this.props.data.timeSent) * 1000);
		var time = timeSent.format("h:mm a");
		var date = timeSent.format("ddd, MMM D");
		return (
			<div className="message">
			    <div className="sender">			        

			        <Avatar imgUrl={this.props.data.avatarImgUrl} />

			        <div className="time">
			        	{time}
			        	<br />
			        	{date}
			        </div>

			    </div>
			    <div className="link-content">			    				       
			    	<LinkDetail data={this.props.data} />
				    <div className="note">
				        {this.props.data.note}
				    </div>

			        <div className="clearfix">
			        	{categories}			            
			        </div>
			    </div>
			</div>			
		)
	}
}
