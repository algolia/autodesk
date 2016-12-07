import angular from 'angular';

import SearchStore from './search-store.js';
import SearchInputController, {
    searchInputDirective
}
from './components/search-input-component.js';
import SearchResultsController, {
    searchResultsDirective
}
from './components/search-results-component.js';

export default angular
    .module('Algolia.AlgoliaSearch', [])
    .constant('APP_ID', 'I4MLOA7VFA')
    .constant('API_KEY', '80ee2e2198b51c5d3712108ddd33339b')
    .constant('INDEX', 'demo_index')
    .service('searchStore', SearchStore)
    .controller('SearchInputController', SearchInputController)
    .directive('searchInput', searchInputDirective)
    .controller('SearchResultsController', SearchResultsController)
    .directive('searchResults', searchResultsDirective);


angular.bootstrap(document.getElementById("AlgoliaSearch"), ['Algolia.AlgoliaSearch']);