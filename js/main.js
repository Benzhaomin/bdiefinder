function setSkus(skus) {
    skus.sort();
    $('#skus').val(skus.join('\n'));
    $('#count').text(skus.length);
    showResults();
}

function setupCountryPresets() {
    let $container = $("#country-presets");
    let countries = Array.from(new Set(window.store.sites.map(site => site.country)));
    countries.sort();
    countries.forEach(code => {
        let $button = addToggle(code.toUpperCase(), code, $container);
        $button.click(e => setCountry(code));
    });
}

function setCountry(code) {
    let sites = code ? window.store.sites.filter(site => site.country == code) : window.store.sites;
    let urls = sites.map(site => site.url).join('\n');
    $('#sites').val(urls);
    showResults();
};

function addToggle(text, value, $target) {
    let $button = $('<button type="button" class="btn btn-secondary btn-sm">');
    $button.val(value).text(text);
    $button.appendTo($target);
    $button.click(e => {
        $button.toggleClass('active');
        $button.siblings().removeClass('active');
    });
    return $button;
}

function addSku($site, sku) {
    let $div = $('<div class="col col-md-3 col-sm-4 col-6 mb-2">');
    let $a = $('<a>');
    let url = $site.prop('data-url').replace('%s', sku);
    $a.prop('href', url);
    $a.prop('target', '_blank');
    $a.text(sku);
    $div.append($a);
    $site.append($div);
};

function showResults() {
    $results = $("#results");
    $results.html('');

    let skus = $("#skus").val().split('\n').filter(sku => sku.length > 0);
    if (!skus.length) {
        $results.html('<div class="alert alert-warning" role="alert">Add at least one SKU</div>');
        return;
    }

    let sites = $("#sites").val().split('\n').filter(site => site.length > 0);
    if (!sites.length) {
        $results.html('<div class="alert alert-warning" role="alert">Add at least one site</div>');
        return;
    }

    sites.forEach(site => {
        let hostname = $('<a>').prop('href', site).prop('hostname').replace('www.', '');
        $results.append($('<h3>').text(hostname));

        let $site = $('<div class="row mb-3">');
        $site.prop('data-url', site);
        skus.forEach(sku => addSku($site, sku));
        $results.append($site);
    });
}

$(document).ready(function() {
    setupCountryPresets();

    let filters = Filters(setSkus);
    filters.add($("#model-filters"), 'brands', 'brand');
    filters.add($("#speed-filters"), 'speeds', 'speed');
    filters.add($("#cas-filters"), 'cass', 'cas');
    // FIXME: filters.add($("#latency-filters"), 'latencies', 'latency');
    filters.add($("#size-filters"), 'sizes', 'size');
    filters.apply();
    $("#reset").click(e => filters.reset());

    $("#refresh").click(e => showResults());
    $("textarea").on('input', e => $("#refresh").show());
});
