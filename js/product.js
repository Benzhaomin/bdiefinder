function Product(brand, sku, speed, cas, size, sticks, color, ecc) {
    let latency = null; // FIXME: String(Math.round(1/parseInt(cas) / parseInt(speed) * 10000000) / 10);

    return {
        'brand': brand,
        'sku': sku,
        'speed': speed,
        'cas': cas,
        'latency': latency,
        'size': size,
        'sticks': sticks,
        'color': color,
        'ecc': ecc,
    };
}

// Corsair (eg. CMD32GX4M4B3600C16)
function Corsair(sku) {
    let speed = sku.slice(11, 15);
    let cas = sku.slice(16, 18);
    let size = sku.slice(3, 5);
    let sticks = sku.slice(7, 8);
    let color = null;
    let ecc = false;
    let brand = 'Corsair';

    let series = sku.slice(1, 3);
    if (series === 'MD') {
        brand += ' Dominator';
    }
    else if (series === 'MK' || series === 'MU') {
        brand += ' Vengeance';
    }

    return Product(brand, sku, speed, cas, size, sticks, color, ecc);
}

// Team T-Force (eg. TXD416G3733HC18ADC01)
function teamtforce(sku) {
    let speed = sku.slice(7, 11);
    let cas = sku.slice(13, 15);
    let size = sku.slice(4, 6);
    let sticks = 2;
    let color = null;
    let ecc = false;

    return Product('Team T-Force', sku, speed, cas, size, sticks, color, ecc);
}

// Team Dark Pro (eg. TDPGD416G3200HC14ADC01)
function teamdarkpro(sku) {
    let speed = sku.slice(9, 13);
    let cas = sku.slice(15, 17);
    let size = sku.slice(6, 8);
    let sticks = 2;
    let color = null;
    let ecc = false;

    return Product('Team Dark Pro', sku, speed, cas, size, sticks, color, ecc);
}


function TeamGroup(sku) {
    let code = sku.slice(0, 2);
    if (code === 'TX') {
        return teamtforce(sku);
    }
    else if (code === 'TD') {
        return teamdarkpro(sku);
    }
}

// G-Skill (eg. F4-3200C14D-16GFX)
let gskill_colors = {
    '': 'silver-red',
    'A': 'silver-red',
    'B': 'silver-red',
    'G': 'black',
    'K': 'black',
    'KK': 'black-black',
    'KKE': 'black-black',
    'KW': 'black-white',
    'KO': 'black-orange',
    'KY': 'black-yellow',
    'R': 'red',
    'S': 'silver',
    'SK': 'silver-black',
    'SW': 'silver-white',
    'SWE': 'silver-white',
};

function GSkill(sku) {
    let brand = 'G.Skill';
    let speed = sku.slice(3, 7);
    let cas = sku.slice(8, 10);
    let size = sku.slice(12, 14);
    let sticks = sku[11] === 'Q' ? 4 : 2;
    let color = null;
    let ecc = false;

    let suffix = sku.slice(15, 20);
    if (suffix.slice(0, 2) === 'TZ') {
        brand += ' Trident Z';
        color = gskill_colors[suffix.slice(2, 5)];
    }
    else if (suffix.slice(0, 2) === 'FX') {
        brand += ' Flare X';
    }
    else if (suffix[0] === 'V') {
        brand += ' Ripjaws V';
        color = gskill_colors[suffix[1]];
    }

    return Product(brand, sku, speed, cas, size, sticks, color, ecc);
}

let sku_to_brand = {
    'C': Corsair,
    'F': GSkill,
    'T': TeamGroup,
};

// turns any SKU into a Product
function parse(sku) {
    return sku_to_brand[sku[0]](sku);
}

// Where's Python when you need it?
let sorted = (values) => {
    values.sort();
    return values;
};

let set = (values) => {
    return Array.from(new Set(values));
}

function Products(products) {
    let skus = () => Array.from(new Set(products.map(product => product.sku)));

    let brand = value => Products(products.filter(product => !value || product.brand === value));
    let brands = () => sorted(set(products.map(product => product.brand)));

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
    let sizes = () => sorted(set(products.map(product => product.size)));

    return {
        skus: skus,

        brand: brand,
        brands: brands,

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

let products = skus.map(sku => parse(sku));
window.store.products = Products(products);
