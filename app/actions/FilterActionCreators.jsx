import FilterApi from '../util/FilterWebApiUtils.jsx';

var FilterActions = {
	getAllFilters: function () {
		FilterApi.fetchFilters();
	}
}

export default FilterActions;