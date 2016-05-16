import FilterWebApiUtils from '../util/FilterWebApiUtils.jsx';

var FilterActions = {
	getAllFilters: function () {
		FilterWebApiUtils.fetchFilters();
	}
}

export default FilterActions;