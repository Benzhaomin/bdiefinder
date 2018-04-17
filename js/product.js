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
    // https://regex101.com/r/lM1T9q/1
    let regex = /C([A-Z]{2})(\d{2})GX(\d)M(\d)[A-Z](\d{4})C(\d{2})/g;
    let groups = regex.exec(sku);
    let brand = 'Corsair';
    let code = groups[1];
    let size = groups[2];
    let sticks = groups[4];
    let speed = groups[5];
    let cas = groups[6];
    let color = null;
    let ecc = false;

    if (code === 'MD') {
        brand += ' Dominator';
    }
    else if (code === 'MK' || code === 'MU') {
        brand += ' Vengeance';
    }

    return Product(brand, sku, speed, cas, size, sticks, color, ecc);
}

// Team Group (eg. TXD416G3733HC18ADC01)
function TeamGroup(sku) {
    // https://regex101.com/r/z0CUon/3
    let regex = /T([A-Z]{1,3})D4(\d{2})G(\d{4})HC(\d{2})\w([DQ])C01/g;
    let groups = regex.exec(sku);
    let brand = 'Team';
    let code = groups[1];
    let size = groups[2];
    let speed = groups[3];
    let cas = groups[4];
    let sticks = groups[5] === 'Q' ? 4 : 2;
    let color = null;
    let ecc = false;

    if (code === 'DPG') {
        brand += ' Dark Pro';
    }
    else if (code === 'X') {
        brand += ' T-Xtrem';
    }

    return Product(brand, sku, speed, cas, size, sticks, color, ecc);
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
    // https://regex101.com/r/CjUiJS/1
    let regex = /F4\-(\d{4})C(\d{2})([DQ])\-(\d{2})G([A-Z]{2,6})/g;
    let groups = regex.exec(sku);
    let brand = 'G.Skill';
    let speed = groups[1];
    let cas = groups[2];
    let sticks = groups[3] === 'Q' ? 4 : 2;
    let size = groups[4];
    let code = groups[5];
    let color = null;
    let ecc = false;

    if (code.indexOf('TZ') === 0) {
        brand += ' Trident Z';
        color = gskill_colors[code.replace('TZ', '')];
    }
    else if (code.indexOf('FX') === 0) {
        brand += ' Flare X';
    }
    else if (code[0] === 'V') {
        brand += ' Ripjaws V';
        color = gskill_colors[code[1]];
    }

    return Product(brand, sku, speed, cas, size, sticks, color, ecc);
}

// Samsung ECC (eg. M391A1K43BB1-CRC)
function Samsung(sku) {
    return {
        'M391A1K43BB1-CRC': Product('Samsung ECC', 'M391A1K43BB1-CRC', '2400', '17', '8', '1', null, true),
        'M391A2K43BB1-CRC': Product('Samsung ECC', 'M391A2K43BB1-CRC', '2400', '17', '16', '1', null, true),
    }[sku];
}

// GeIL (eg. GEX416GB3200C16ADC)
function Geil(sku) {
    // https://regex101.com/r/mOcKR8/7/
    let regex = /([A-Z]{2,6})4(\d{1,2})GB(\d{4})C(\d{2})A?(\w)C/g;
    let groups = regex.exec(sku);
    let brand = 'GeIL';
    let code = groups[1];
    let speed = groups[3];
    let cas = groups[4];
    let size = groups[2];
    let sticks = groups[5] === 'Q' ? 4 : 2;
    let color = null;
    let ecc = false;

    if (code === 'EX') {
        brand += ' Evo X';
    }

    return Product(brand, sku, speed, cas, size, sticks, color, ecc);
}

// KFA2 HOF (eg. HOF4CXLBS3600K17LD162K)
function KFA(sku) {
    // https://regex101.com/r/WBL7z2/1
    let regex = /([A-Z]{3,6})4CXLBS(\d{4})K(\d{2})LD(\d{2})(\d)K/g;
    let groups = regex.exec(sku);
    let brand = 'KFA2';
    let code = groups[1];
    let speed = groups[2];
    let cas = groups[3];
    let size = groups[4];
    let sticks = groups[5];
    let color = null;
    let ecc = false;

    if (code === 'HOF') {
        brand += ' HOF';
    }

    return Product(brand, sku, speed, cas, size, sticks, color, ecc);
}

// Crucial Ballistix Elite (eg. BLE2K8G4D34AEEAK) - no info on cas latency
function Crucial(sku) {
    return {
        'BLE2K8G4D34AEEAK': Product('Crucial Elite', 'BLE2K8G4D34AEEAK', '3466', '16', '16', '2', null, false),
    }[sku];
}

// turns any SKU into a Product
function parse(sku) {
    return {
        'C': Corsair,
        'F': GSkill,
        'T': TeamGroup,
        'M': Samsung,
        'G': Geil,
        'H': KFA,
        'B': Crucial,
    }[sku[0]](sku);
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
    let skus = () => sorted(set(products.map(product => product.sku)));

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
    let sizes = () => {
        let values = set(products.map(product => product.size));
        values.sort((a,b) => parseInt(a) > parseInt(b));
        return values;
    };

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
