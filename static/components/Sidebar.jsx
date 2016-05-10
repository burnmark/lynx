import React from 'react';

import FilterCard from './FilterCard.jsx';

export default class Sidebar extends React.Component {	
	constructor(props) {
		super(props);
		this.state = {
			domains: {
				values: [],
				title: 'Domains'
			},
			people: {
				avatars : [
					'img/person1.jpg',
					'img/person2.jpg',
					'img/person3.jpg',
					'img/person4.jpg'
				],
				btnClass: true,
				title: 'People'
			},
			categories: {
				values: [],
				title: 'Domains'
			}
		}
	}

	getFiltersFromServer() {
		Promise.all([$.getJSON('/api/domain/'), $.getJSON('/api/category/')])
			.then(values => this.setState({
				domains: {
					values: values[0],
					title: 'Domains'
				},
				categories: {
					values: values[1],
					title: 'Categories'
				}
			}));
	}

	componentDidMount() {
		this.getFiltersFromServer();
	}

	render() {	
		return (
			<div className="sidebar">				
				<FilterCard data={this.state.domains} />
				<FilterCard data={this.state.people} />
				<FilterCard data={this.state.categories} />
			</div>
		);
	}
}
