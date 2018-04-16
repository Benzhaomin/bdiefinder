let Filters = function(callback) {
    let filters = [];

    let add = function($container, valuescb, filtercb) {
        filters.push({
            'container': $container,
            'values': valuescb,
            'filter': filtercb,
        });
    };

    let show = function(products) {
        callback(products.skus());
    };

    let refresh = function(products) {
        filters.forEach(filter => {
            filter.container.html('');
            products[filter.values]().forEach(value => {
                let $button = addToggle(value, value, filter.container);
                let count = products[filter.filter](value).skus().length;
                $button.prop('title', count + ' SKU' + (count > 1 ? 's' : ''));
                $button.click(e => apply(e));
                if (value === filter.value) {
                    $button.addClass('active');
                }
            });
        });
    };

    let apply = function() {
        let products = window.store.products;

        filters.forEach(filter => {
            let $value = filter.container.find("button.active");
            filter.value = $value.length ? $value.val() : null;
            products = products[filter.filter](filter.value);
        });

        refresh(products);
        show(products);

        let filtered = products.skus().length < window.store.products.skus().length;
        $("#reset").toggle(filtered);

        return products;
    };

    let reset = function() {
        filters.forEach(filter => filter.container.find("button.active").removeClass('active'));
        apply();
    };

    return {
        add: add,
        apply: apply,
        reset: reset,
    };
};
