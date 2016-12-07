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

    determineCategoryInclusion(arr, str) {
        return _.flow(
            this.trimAllItems,
            _.curry(this.checkIfIncludes)(str)
        )(arr, str);
    }

    get renderCategories() {
        return _.flow([
            this.getCategoryValues,
            this.trimAllItems
        ]);
    }

    getCategoryValues(categories) {
        return categories.map(item => item.value);
    }

    trimAllItems(arr) {
        return arr.map(item => _.trim(item));
    }

    checkIfIncludes(str, arr) {
        return arr.includes(str);
    }

    determineCategoryColor(categories) {
        if (this.determineCategoryInclusion(categories, "Graphic Design & Illustration Software")) {
            return 'blue';
        }
        if (this.determineCategoryInclusion(categories, "3D Modelling Software")) {
            return 'orange';
        }
        if (this.determineCategoryInclusion(categories, "Multimedia & Design Software")) {
            return 'aqua';
        } else {
            return 'red';
        }
    }

}

export default SearchResultsController;