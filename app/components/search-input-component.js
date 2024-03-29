export function searchInputDirective() {
    return {
        restrict: 'AE',
        controller: 'SearchInputController',
        controllerAs: 'searchInputController',
        bindToController: true,
        link: link
    };

    function link(scope, element, attrs, controller) {
        var elm = element[0];
        var results = document.querySelectorAll(".body-content.results")[0];
        
        window.addEventListener("scroll", function () {
            window.requestAnimationFrame(toggleFixedHeader);
        });
        
        function toggleFixedHeader() {
            if (window.scrollY > 274) {
                elm.classList.add("fixed");
                results.classList.add("fixed");
            }
            else {
                elm.classList.remove("fixed");
                results.classList.remove("fixed");
            }
        }
    }
}

class SearchInputController {

    static get $inject() {
        return ['searchStore'];
    }

    constructor(searchStore) {
        this._searchStore = searchStore;
    }

    get searchStore() {
        return this._searchStore;
    }

    get query() {
        return this._searchStore.query;
    }

    set query(value) {
        this._searchStore.query = value;
    }
    
    get currentCategory() {
        return this._searchStore.currentCategory;
    }

    set currentCategory(value) {
        this._searchStore.currentCategory = value;
    }
    
    get categories() {
        return this._searchStore.categories;
    }

}

export default SearchInputController;