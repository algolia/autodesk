export function searchResultDirective() {
    return {  
        restrict: 'E',
        replace: true,
        scope: {
            options: '=',
            result: '=',
            title: '='
        },
        controller: 'SearchResultController',
        controllerAs: 'searchResultController',
        bindToController: true,
        templateUrl: './app/components/search-result.html',
        link: link
    };

    function link(scope, element, attrs, controller) {

    }
}

import _ from 'lodash';

class SearchResultController {

    static get $inject() {
        return ['searchStore'];
    }

    constructor(searchStore) {
        this._searchStore = searchStore;
        this._currentTerm = this.getLowestPriceOption(this.result.options).termName;
        this._currentSupport = this.getLowestPriceOption(this.result.options).supportName;
        this._currentTermDropdownOpen = false;
        this._currentSupportDropdownOpen = false;
    }

    get searchStore() {
        return this._searchStore;
    }
    
    get currentTerm() {
        return this._currentTerm;
    }
    
    get currentSupport() {
        return this._currentSupport;
    }
    
    get currentTermDropdownOpen() {
        return this._currentTermDropdownOpen;
    }
    
    get currentSupportDropdownOpen() {
        return this._currentSupportDropdownOpen;
    }
    
    get currentPrice() {
        return this._getMatchingPrice(this.result.options);
    }
    
    get currentLink() {
        return this._getMatchingLink(this.result.options);
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
    
    get getFilteredTermNames() {
        return _.flow([
            this.getTermName,
            this.filterCurrentTerm,
            _.uniq
        ]);
    }
    
    get getFilteredSupportNames() {
        return _.flow([
            this.getSupportName,
            this.filterCurrentTerm,
            _.uniq
        ]);
    }
    
    get _getMatchingPrice() {
        return _.flow([
            this.getMatchingTerms,
            this.getMatchingSupport,
            this.getPrice
        ]);
    }
    
    get _getMatchingLink() {
        return _.flow([
            this.getMatchingTerms,
            this.getMatchingSupport,
            this.getLink
        ]);
    }
    
    getMatchingTerms(options) {
        return options.filter(item => item.termName === this.currentTerm);
    }
    
    getMatchingSupport(options) {
        return options.filter(item => item.supportName === this.currentSupport);
    }
    
    getPrice(option) {
        return option[0].price;
    }
    
    getLink(option) {
        return option[0].link;
    }

    getCategoryValues(categories) {
        return categories.map(item => item.value);
    }
    
    getTermName(options) {
        return options.map(item => item.termName);
    }
    
    getSupportName(options) {
        return options.map(item => item.supportName);
    }
    
    filterCurrentTerm(terms) {
        return terms.filter(term => term != this._currentTerm);
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
    
    getLowestPriceOption(options) {
        return options.reduce((a,b) => {return a.price < b.price ? a : b}, {});
    }
    
    toggleTermDropdown() {
        this._currentTermDropdownOpen = !this._currentTermDropdownOpen;
    }
    
    toggleSupportDropdown() {
        this._currentSupportDropdownOpen = !this._currentSupportDropdownOpen;
    }
    
    selectTerm(term) {
        this._currentTerm = term;
        this._currentTermDropdownOpen = false;
    }
    
    selectSupport(term) {
        this._currentSupport = term;
        this._currentSupportDropdownOpen = false;
    }

}

export default SearchResultController;