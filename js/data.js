let skus = [
    // Corsair Dominator
    'CMD32GX4M4B3600C16',

    // Corsair Vengeance
    'CMU32GX4M4B3400C16',
    'CMK32GX4M4B3466C16',
    'CMK32GX4M4B3600C16',
    'CMK32GX4M4B3600C18',
    'CMK32GX4M4B4000C19',

    // Team Group Dark Pro
    'TDPGD416G3200HC14ADC01',
    'TDPGD416G3600HC16ADC01',
    'TDPGD416G3866HC18GDC01',

    // Team Group T-Force
    'TXD416G3733HC18ADC01',

    // G.Skill Flare X
    'F4-3200C14D-16GFX',

    // G.Skill Ripjaws V
    'F4-2800C14D-32GVK',
    'F4-3000C14D-16GVK',
    'F4-3000C14D-16GVR',
    'F4-3000C14D-32GVK',
    'F4-3000C14D-32GVR',
    'F4-3200C15D-16GVK',
    'F4-3200C15D-16GVR',
    'F4-3200C15D-32GVK',
    'F4-3200C15D-32GVR',
    'F4-3200C14D-16GVK',
    'F4-3200C14D-16GVR',
    'F4-3200C14D-32GVK',
    'F4-3200C14D-32GVR',
    'F4-3400C16D-32GVK',
    'F4-3400C16D-32GVR',
    'F4-3466C16D-16GVK',
    'F4-3466C16D-16GVR',
    'F4-3600C17D-16GVK',
    'F4-3600C16D-16GVK',

    // G.Skill Trident Z
    'F4-3000C14D-16GTZ',
    'F4-3000C14D-16GTZR',
    'F4-3000C14D-32GTZ',
    'F4-3000C14D-32GTZR',
    'F4-3200C16D-32GTZA',
    'F4-3200C15D-16GTZ',
    'F4-3200C15D-16GTZKO',
    'F4-3200C15D-16GTZKW',
    'F4-3200C15D-16GTZKY',
    'F4-3200C15D-16GTZSK',
    'F4-3200C15D-16GTZSW',
    'F4-3200C15D-32GTZ',
    'F4-3200C15D-32GTZKO',
    'F4-3200C15D-32GTZKW',
    'F4-3200C15D-32GTZKY',
    'F4-3200C15D-32GTZR',
    'F4-3200C15D-32GTZSK',
    'F4-3200C15D-32GTZSW',
    'F4-3200C14D-16GTZ',
    'F4-3200C14D-16GTZKO',
    'F4-3200C14D-16GTZKW',
    'F4-3200C14D-16GTZKY',
    'F4-3200C14D-16GTZR',
    'F4-3200C14D-16GTZRX',
    'F4-3200C14D-16GTZSK',
    'F4-3200C14D-16GTZSW',
    'F4-3200C14D-32GTZ',
    'F4-3200C14D-32GTZKO',
    'F4-3200C14D-32GTZKW',
    'F4-3200C14D-32GTZKY',
    'F4-3200C14D-32GTZR',
    'F4-3200C14D-32GTZSK',
    'F4-3200C14D-32GTZSW',
    'F4-3400C16D-32GTZ',
    'F4-3466C16D-16GTZ',
    'F4-3466C16D-16GTZKW',
    'F4-3466C16D-16GTZR',
    'F4-3466C16D-16GTZSK',
    'F4-3466C16D-16GTZSW',
    'F4-3600C17D-16GTZ',
    'F4-3600C17D-16GTZKW',
    'F4-3600C17D-16GTZR',
    'F4-3600C17D-16GTZSW',
    'F4-3600C16D-16GTZ',
    'F4-3600C16D-16GTZKW',
    'F4-3600C16D-16GTZR',
    'F4-3600C16D-16GTZSW',
    'F4-3600C15D-16GTZ',
    'F4-3733C17D-16GTZA',
    'F4-3733C17D-16GTZKW',
    'F4-3733C17D-16GTZSW',
    'F4-3866C18D-16GTZ',
    'F4-3866C18D-16GTZKW',
    'F4-3866C18D-16GTZR',
    'F4-3866C18D-16GTZSW',
    'F4-4000C17D-16GTZR',
    'F4-4000C17Q-32GTZR',
    'F4-4000C19D-16GTZ',
    'F4-4000C19D-16GTZKW',
    'F4-4000C19D-16GTZSW',
    'F4-4133C17D-16GTZR',
    'F4-4133C17Q-32GTZR',
    'F4-4133C19D-16GTZA',
    'F4-4266C17Q-32GTZR',
    'F4-4266C19D-16GTZ',
    'F4-4266C19D-16GTZA',
    'F4-4266C19D-16GTZKW',
    'F4-4266C19D-16GTZSW',
    'F4-4266C19D-16GTZR',
    'F4-4400C19D-16GTZSW',
    'F4-4400C19D-16GTZKK',
    'F4-4500C19D-16GTZKKE',
    'F4-4500C19D-16GTZSWE',
];

let sites = [{
    'country': 'ca',
    'name': 'Amazon',
    'url': 'https://www.amazon.ca/s/field-keywords=%s'
}, {
    'country': 'ca',
    'name': 'Newegg Canada',
    'url': 'https://www.newegg.ca/Product/ProductList.aspx?Submit=ENE&DEPA=0&Description=%s'
}, {
    'country': 'ca',
    'name': 'Memory Express',
    'url': 'https://www.memoryexpress.com/Search/Products?Search=%s'
}, {
    'country': 'de',
    'name': 'Amazon Germany',
    'url': 'https://www.amazon.de/s/field-keywords=%s'
}, {
    'country': 'de',
    'name': 'Alternate',
    'url': 'https://www.alternate.de/html/search.html?query=%s'
}, {
    'country': 'de',
    'name': 'Caseking',
    'url': 'https://www.caseking.de/search?sSearch=%s'
}, {
    'country': 'de',
    'name': 'Geizhals',
    'url': 'https://geizhals.de/?fs=%s'
}, {
    'country': 'de',
    'name': 'Mindfactory',
    'url': 'https://www.mindfactory.de/search_result.php?search_query=%s'
}, {
    'country': 'es',
    'name': 'Amazon Spain',
    'url': 'https://www.amazon.es/s/field-keywords=%s'
}, {
    'country': 'es',
    'name': 'PC Componentes',
    'url': 'https://www.pccomponentes.com/buscar/?query=%s'
}, {
    'country': 'fr',
    'name': 'Amazon France',
    'url': 'https://www.amazon.fr/s/field-keywords=%s'
}, {
    'country': 'fr',
    'name': 'Hardware.fr',
    'url': 'https://shop.hardware.fr/search/+ftxt-%s'
}, {
    'country': 'fr',
    'name': 'Materiel.net',
    'url': 'https://www.materiel.net/achat/%s'
}, {
    'country': 'fr',
    'name': 'Rue du commerce',
    'url': 'https://www.rueducommerce.fr/recherche/%s'
}, {
    'country': 'it',
    'name': 'Amazon Italy',
    'url': 'https://www.amazon.it/s/field-keywords=%s'
}, {
    'country': 'it',
    'name': 'ePrice',
    'url': 'https://www.eprice.it/search/qs=%s'
}, {
    'country': 'uk',
    'name': 'Amazon UK',
    'url': 'https://www.amazon.co.uk/s/field-keywords=%s'
}, {
    'country': 'uk',
    'name': 'Overclockers UK',
    'url': 'https://www.overclockers.co.uk/search?sSearch=%s'
}, {
    'country': 'us',
    'name': 'Amazon',
    'url': 'https://www.amazon.com/s/field-keywords=%s'
}, {
    'country': 'us',
    'name': 'Newegg US',
    'url': 'https://www.newegg.com/Product/ProductList.aspx?Submit=ENE&DEPA=0&Description=%s'
}, {
    'country': 'br',
    'name': 'Kabum',
    'url': 'https://www.kabum.com.br/cgi-local/site/listagem/listagem.cgi?string=%s&btnG='
}, {
    'country': 'ca',
    'name': 'Canada Computers',
    'url': 'https://www.canadacomputers.com/search_results.php?search_in=&keywords=%s'
}];

window.store = {sites: sites, skus: skus};
