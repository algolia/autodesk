export function searchResultsDirective() {
    return {
        restrict: 'AE',
        controller: 'SearchResultsController',
        controllerAs: 'searchResultsController',
        bindToController: true,
        link: link
    };

    function link(scope, element, attrs, controller) {

    }
}

import _ from 'lodash';

class SearchResultsController {

    static get $inject() {
        return ['searchStore'];
    }

    constructor(searchStore) {
        this._searchStore = searchStore;
    }

    get searchStore() {
        return this._searchStore;
    }

    get results() {
        return this._searchStore.results;
    }

}

export default SearchResultsController;