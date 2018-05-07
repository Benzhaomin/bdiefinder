/**
 * Expose product filters as button groups
 */
import {store} from './store'
import {addToggle, setSkus, ui} from './ui'

export default function Filters() {
  const filters = []

  function add(uicontainer, valuescb, filtercb) {
    filters.push({
      container: uicontainer,
      values: valuescb,
      filter: filtercb
    })
  }

  function show(products) {
    setSkus(products.skus())
  }

  function refresh(products) {
    for (const filter of filters) {
      filter.container.html('')

      for (const value of products[filter.values]()) {
        const button = addToggle(value, value, filter.container)
        button.on('click', e => apply(e))
        if (value === filter.value) {
          button.addClass('active')
        }
      }
    }
  }

  function apply() {
    let products = store.products

    for (const filter of filters) {
      const value = filter.container.find('button.active').first()
      filter.value = value ? value.value : null
      products = products[filter.filter](filter.value)
    }

    refresh(products)
    show(products)

    const filtered = products.skus().length < store.products.skus().length
    if (filtered) {
      ui('#reset').first().style.display = 'initial'
    } else {
      ui('#reset').first().style.display = 'none'
    }

    return products
  }

  function reset() {
    for (const filter of filters) {
      filter.container.find('button.active').removeClass('active')
    }
    apply()
  }

  return {
    add,
    reset
  }
}
