import React from 'react';

import FilterCard from './FilterCard.jsx';

import FilterAction from '../actions/FilterActionCreators.jsx';
import FilterStore from '../stores/FilterStore.jsx';

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
			}
			// categories: {
			// 	values: [],
			// 	title: 'Categories'
			// }
		};
		this._onChange = this._onChange.bind(this);
	}

	componentWillMount() {
		FilterAction.getAllFilters();
	}

	componentDidMount() {
		FilterStore.addChangeListener(this._onChange);		
	}

	componentWillUnmount() {
		FilterStore.removeChangeListener(this._onChange);
	}

	_onChange() {
		this.setState({
			domains: {
				values: FilterStore.getDomains(),
				title: 'Domains'
			}
			// categories: {
			// 	values: FilterStore.getCategories(),
			// 	title: 'Categories'
			// }
		});
	}

	render() {	
		return (
			<div className="sidebar">				
				<FilterCard data={this.state.domains} />
				<FilterCard data={this.state.people} />
				
			</div>
		);
	}
}
// <FilterCard data={this.state.categories} />