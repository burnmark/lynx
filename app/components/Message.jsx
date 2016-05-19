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
		console.log(this.props)
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
		var dateString = timeSent.format("ddd, MMM D h:mm a");
		return (
			<div className="message">
			    <div className="sender">			        

			        <Avatar imgUrl="img/person1.jpg" />

			        <div className="info">
			        	<span className="name">{this.props.data.senderName}</span>
			        	
			        	<span className="dateString">{dateString}</span>
			        </div>
			    </div>

			    <div className="note">
				    {this.props.data.note}
				</div>

			    <div className="link-content">			    				       
			    	<LinkDetail data={this.props.data} />				    

			        <div className="clearfix">
			        	{categories}			            
			        </div>
			    </div>

			    <hr />
			</div>			
		)
	}
}
// <Avatar imgUrl={this.props.data.avatarImgUrl} />