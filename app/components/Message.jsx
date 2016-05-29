import React from 'react';
import moment from 'moment';

import Avatar from './Avatar.jsx';
import FilterBtn from './FilterBtn.jsx';
import LinkDetail from './LinkDetail.jsx';

export default class Message extends React.Component {
	render() {
		var categories;
		if (this.props.data.categoryName) {			
			categories = this.props.data.categoryName.map(function (category, i) {
				return <FilterBtn key={i} word={category} />;
			});
		}

		var timeSent = moment(parseInt(this.props.data.timeSent) * 1000),
			dateString = timeSent.format("ddd, MMM D h:mm a"),
			favorited = parseInt(this.props.data.favorited);

		return (
			<div className="message">
			    <div className="sender">			        

			        <Avatar imgUrl={this.props.data.senderImg} />

			        <div className="info">
			        	<span className="name">{this.props.data.senderName}</span>			     
			        	<span className="dateString">{dateString}</span>
			        </div>

			        <i 
			        	onClick={this.props.handleDelete}
			        	data-messageId={this.props.data.id}
			        	className="fa fa-trash-o" 
			        	aria-hidden="true"></i>

			        <i 
			        	onClick={this.props.handleStarred} 
			        	data-messageId={this.props.data.id}
			        	className={favorited ? "fa fa-star-o hidden" : "fa fa-star-o"} 
			        	aria-hidden="true"></i>
			        <i 
			        	onClick={this.props.handleStarred} 
			        	data-messageId={this.props.data.id}
			        	className={favorited ? "fa fa-star" : "fa fa-star hidden"} 
			        	aria-hidden="true"></i>

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
