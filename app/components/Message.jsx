import React from 'react';
import moment from 'moment';

import Avatar from './Avatar.jsx';
import FilterBtn from './FilterBtn.jsx';
import LinkDetail from './LinkDetail.jsx';

import MessageActions from '../actions/MessageActionCreators.jsx';
import MessageStore from '../stores/MessageStore.jsx';

export default class Message extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			categories: [],
			// this property will be filled in with props data in the future		
			favorited: parseInt(this.props.data.favorited)	
		}		
	}

	componentWillMount() {
		MessageActions.getCategories(this.props.data.id);
	}

	componentDidMount() {
		MessageStore.addChangeListener(this._onChange.bind(this));
	}

	componentWillUnmount() {
		MessageStore.removeChangeListener(this._onChange.bind(this));
	}
	
	_favoriteClick() {		
		console.log('favorited clicked in component');
		this.setState({
			favorited: !this.state.favorited
		});
		MessageActions.favoriteMessage(this.props.data.id);

	}

	_onChange() {
		this.setState({
			categories: MessageStore.getCategories(this.props.data.id)
		})
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

		var favorited = parseInt(this.props.data.favorited);
		return (
			<div className="message">
			    <div className="sender">			        

			        <Avatar imgUrl={this.props.data.senderImg} />

			        <div className="info">
			        	<span className="name">{this.props.data.senderName}</span>			     
			        	<span className="dateString">{dateString}</span>
			        </div>

			        <i className="fa fa-trash-o" aria-hidden="true"></i>

			        <i 
			        	onClick={this._favoriteClick.bind(this)} 
			        	className={this.state.favorited ? "fa fa-star-o hidden" : "fa fa-star-o"} 
			        	aria-hidden="true"></i>
			        <i 
			        	onClick={this._favoriteClick.bind(this)} 
			        	className={this.state.favorited ? "fa fa-star" : "fa fa-star hidden"} 
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
// <Avatar imgUrl={this.props.data.avatarImgUrl} />