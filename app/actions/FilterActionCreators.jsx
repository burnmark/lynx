import FilterApi from '../util/FilterWebApiUtils.jsx';
import AppConstants from '../constants/AppConstants.jsx';

var FilterActions = {
	getAllFilters: function () {
		FilterApi.fetchFilters();
	}

	
}

export default FilterActions;