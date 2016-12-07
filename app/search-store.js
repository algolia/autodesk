import _ from 'lodash';
import algoliasearch from 'algoliasearch';

class SearchStore {
    static get $inject() {
        return ['APP_ID', 'API_KEY', 'INDEX', '$rootScope', '$sce'];
    }
    constructor(APP_ID, API_KEY, INDEX, $rootScope, $sce) {
        this._APP_ID = APP_ID;
        this._API_KEY = API_KEY;
        this._INDEX = INDEX;
        this._$sce = $sce;

        this._client = algoliasearch(this._APP_ID, this._API_KEY);
        this._currentIndex = this._client.initIndex(this._INDEX);

        this._$rootScope = $rootScope;
        this.query = "";
        this.currentCategory = "";
        this._isInitial = true;

        this.updateResults();
    }

    get results() {
        return this._results;
    }

    get categories() {
        return this._categories;
    }

    updateResults() {
        this._currentIndex.search(this.query, {
            facets: "*",
            filters: this._createFilters(this.currentCategory)
        }).then(
            (results) => {
                this._results = results.hits;
                if (this._isInitial) {
                    this._categories = Object.keys(results.facets.categories);
                    this._isInitial = false;
                }
                this._$rootScope.$evalAsync();
            }).catch(err => this._handleFetchError(err));
    }

    _handleFetchError(err) {
        console.log(err);
    }

    renderHtml(text) {
        return this._$sce.trustAsHtml(text);
    }

    _createFilters(categories) {
        return categories ? "categories:'" + this.currentCategory + "'" : "";
    }

    clearFilters() {
        this.query = "";
        this.currentCategory = "";
        this._$rootScope.$evalAsync();
    }

}
export default SearchStore;