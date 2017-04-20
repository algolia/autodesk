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
import SearchResultController, {
    searchResultDirective
}
from './components/search-result-component.js';

export default angular
    .module('Algolia.AlgoliaSearch', [])
    .constant('APP_ID', 'Q71HM8430Y')
    .constant('API_KEY', '7f42b7cbd41474bf777414c24302d4a4')
    .constant('INDEX', 'autodesk')
    .service('searchStore', SearchStore)
    .controller('SearchInputController', SearchInputController)
    .directive('searchInput', searchInputDirective)
    .controller('SearchResultsController', SearchResultsController)
    .directive('searchResults', searchResultsDirective)
    .controller('SearchResultController', SearchResultController)
    .directive('searchResult', searchResultDirective);


angular.bootstrap(document.getElementById("AlgoliaSearch"), ['Algolia.AlgoliaSearch']);