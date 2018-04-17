let parsers = function() {
    // Corsair (eg. CMD32GX4M4B3600C16)
    let Corsair = (sku) => {
        // https://regex101.com/r/lM1T9q/1
        let regex = /C([A-Z]{2})(\d{2})GX(\d)M(\d)[A-Z](\d{4})C(\d{2})/g;
        let groups = regex.exec(sku);
        let brand = 'Corsair';
        let series = '';
        let code = groups[1];
        let size = groups[2];
        let sticks = groups[4];
        let speed = groups[5];
        let cas = groups[6];
        let color = null;
        let ecc = false;

        if (code === 'MD') {
            series = 'Dominator';
        }
        else if (code === 'MK' || code === 'MU') {
            series = 'Vengeance';
        }

        return Product(brand, series, sku, speed, cas, size, sticks, color, ecc);
    };


    // Team Group (eg. TXD416G3733HC18ADC01)
    let TeamGroup = (sku) => {
        // https://regex101.com/r/z0CUon/3
        let regex = /T([A-Z]{1,3})D4(\d{2})G(\d{4})HC(\d{2})\w([DQ])C01/g;
        let groups = regex.exec(sku);
        let brand = 'Team';
        let series = '';
        let code = groups[1];
        let size = groups[2];
        let speed = groups[3];
        let cas = groups[4];
        let sticks = groups[5] === 'Q' ? 4 : 2;
        let color = null;
        let ecc = false;

        if (code === 'DPG') {
            series = 'Dark Pro';
        }
        else if (code === 'X') {
            series = 'T-Force XTREEM';
        }

        return Product(brand, series, sku, speed, cas, size, sticks, color, ecc);
    };

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

    // G-Skill (eg. F4-3200C14D-16GFX)
    let GSkill = (sku) => {
        // https://regex101.com/r/CjUiJS/1
        let regex = /F4\-(\d{4})C(\d{2})([DQ])\-(\d{2})G([A-Z]{2,6})/g;
        let groups = regex.exec(sku);
        let brand = 'G.Skill';
        let series = '';
        let speed = groups[1];
        let cas = groups[2];
        let sticks = groups[3] === 'Q' ? 4 : 2;
        let size = groups[4];
        let code = groups[5];
        let color = null;
        let ecc = false;

        if (code.indexOf('TZ') === 0) {
            series = 'Trident Z';
            color = gskill_colors[code.replace('TZ', '')];
        }
        else if (code.indexOf('FX') === 0) {
            series = 'Flare X';
        }
        else if (code.indexOf('SX') === 0) {
            series = 'Sniper X';
        }
        else if (code[0] === 'V') {
            series = 'Ripjaws V';
            color = gskill_colors[code[1]];
        }

        return Product(brand, series, sku, speed, cas, size, sticks, color, ecc);
    };

    // Samsung ECC (eg. M391A1K43BB1-CRC)
    let Samsung = (sku) => {
        return {
            'M391A1K43BB1-CRC': Product('Samsung', 'ECC', 'M391A1K43BB1-CRC', '2400', '17', '8', '1', null, true),
            'M391A2K43BB1-CRC': Product('Samsung', 'ECC', 'M391A2K43BB1-CRC', '2400', '17', '16', '1', null, true),
        }[sku];
    };

    // GeIL (eg. GEX416GB3200C16ADC)
    let Geil = (sku) => {
        // https://regex101.com/r/mOcKR8/7/
        let regex = /G([A-Z]{2,6})4(\d{1,2})GB(\d{4})C(\d{2})A?(\w)C/g;
        let groups = regex.exec(sku);
        let brand = 'GeIL';
        let series = '';
        let code = groups[1];
        let speed = groups[3];
        let cas = groups[4];
        let size = groups[2];
        let sticks = groups[5] === 'Q' ? 4 : 2;
        let color = null;
        let ecc = false;

        if (code === 'EX') {
            series = 'Evo X';
        }

        return Product(brand, series, sku, speed, cas, size, sticks, color, ecc);
    };

    // KFA2 HOF (eg. HOF4CXLBS3600K17LD162K)
    let KFA = (sku) => {
        // https://regex101.com/r/WBL7z2/1
        let regex = /([A-Z]{3,6})4CXLBS(\d{4})K(\d{2})LD(\d{2})(\d)K/g;
        let groups = regex.exec(sku);
        let brand = 'KFA2';
        let series = '';
        let code = groups[1];
        let speed = groups[2];
        let cas = groups[3];
        let size = groups[4];
        let sticks = groups[5];
        let color = null;
        let ecc = false;

        if (code === 'HOF') {
            series = 'HOF';
        }

        return Product(brand, series, sku, speed, cas, size, sticks, color, ecc);
    };

    // Crucial Ballistix Elite (eg. BLE2K8G4D34AEEAK) - no info on cas latency
    let Crucial = (sku) => {
        return {
            'BLE2K8G4D34AEEAK': Product('Crucial', 'Ballistix Elite', 'BLE2K8G4D34AEEAK', '3466', '16', '16', '2', null, false),
        }[sku];
    };

    // turns any SKU into a Product
    let parse = (sku) => {
        return {
            'C': Corsair,
            'F': GSkill,
            'T': TeamGroup,
            'M': Samsung,
            'G': Geil,
            'H': KFA,
            'B': Crucial,
        }[sku[0]](sku);
    };

    return {
        parse: parse,
    };
}();
