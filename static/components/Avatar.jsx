import React from 'react';

export default class Avatar extends React.Component {
	render() {
		var classes = this.props.btnClass ? 'avatar avatar-btn' : 'avatar',
			styles = {
				backgroundImage : 'url(' + this.props.imgUrl + ')',
				backgroundPosition: 'center',
				backgroundAttachment: 'center',
				backgroundSize: 'cover'
			}
		
		return (
			<div className={classes} style={styles}></div>
		);
	}
}