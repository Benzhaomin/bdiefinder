// Where's Python when you need it?
let sorted = (values) => {
    values.sort();
    return values;
};

let set = (values) => {
    return Array.from(new Set(values));
}

let Product = (brand, series, sku, speed, cas, size, sticks, color, ecc) => {
    let latency = null; // FIXME: String(Math.round(1/parseInt(cas) / parseInt(speed) * 10000000) / 10);

    return {
        'brand': brand,
        'series': series,
        'sku': sku,
        'speed': speed,
        'cas': cas,
        'latency': latency,
        'size': size,
        'sticks': sticks,
        'color': color,
        'ecc': ecc,
    };
};

let Products = (products) => {
    let skus = () => sorted(set(products.map(product => product.sku)));

    let brand = value => Products(products.filter(product => !value || product.brand === value));
    let brands = () => sorted(set(products.map(product => product.brand)));

    let series = value => Products(products.filter(product => !value || product.series === value));
    let seriess = () => sorted(set(products.map(product => product.series)));

    let speed = value => Products(products.filter(product => !value || product.speed === value));
    let speeds = () => sorted(set(products.map(product => product.speed)));

    let cas = value => Products(products.filter(product => !value || product.cas === value));
    let cass = () => sorted(set(products.map(product => product.cas)));

    let latency = value => Products(products.filter(product => !value || product.latency === value));
    let latencies = () => {
        let values = set(products.map(product => product.latency));
        values.sort((a,b) => parseFloat(a) > parseFloat(b));
        return values;
    };

    let size = value => Products(products.filter(product => !value || product.size === value));
    let sizes = () => {
        let values = set(products.map(product => product.size));
        values.sort((a,b) => parseInt(a) > parseInt(b));
        return values;
    };

    return {
        skus: skus,

        brand: brand,
        brands: brands,

        series: series,
        seriess: seriess,

        speed: speed,
        speeds: speeds,

        cas: cas,
        cass: cass,

        latency: latency,
        latencies: latencies,

        size: size,
        sizes: sizes,
    };
};

let products = skus.map(sku => parsers.parse(sku));
window.store.products = Products(products);
