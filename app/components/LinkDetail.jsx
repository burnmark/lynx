import React from 'react';

export default class LinkDetail extends React.Component {
	render() {
		//need: title, description, url
		var styles = {
				backgroundImage : 'url(' + this.props.data.imgUrl + ')',
				backgroundPosition: 'center',
				backgroundAttachment: 'center',
				backgroundSize: 'cover'
			};
		return (			
			 <div className="link-detail">
	            <div className="text">
	                <div className="title">	                
	                    {this.props.data.title}
	                </div>
	                <div className="body">
	                   {this.props.data.description}
	                </div>
	                <div className="url">
	                    {this.props.data.url}
	                </div>
	            </div>
	            <div className="image" style={styles}></div>
	        </div>
	    );
	}
}

