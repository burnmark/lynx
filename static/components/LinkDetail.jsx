import React from 'react';

export default class LinkDetail extends React.Component {
	render() {
		//need: title, description, url, img url
		var styles = {
									//this.props.img
				backgroundImage : 'url(img/cat1.jpg)',
				backgroundPosition: 'center',
				backgroundAttachment: 'center',
				backgroundSize: 'cover'
			};
		return (			
			 <div className="link-detail">
	            <div className="text">
	                <div className="title">	                
	                    Studies show things happen
	                </div>
	                <div className="body">
	                   A new study shows that things happen when people do stuff and it's pretty cool to think about about what but link the who what why when where how
	                </div>
	                <div className="url">
	                    http://newyorktimes.com/studies-show-that-thing-happen-yo-whaaaaat
	                </div>
	            </div>
	            <div className="image" style={styles}></div>
	        </div>
	    );
	}
}

