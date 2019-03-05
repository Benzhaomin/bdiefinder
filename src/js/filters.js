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
      value: null,
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

  function apply(selected) {
    let products = store.products
    selected = selected || {'displays': 'Simple'}

    for (const filter of filters) {
      if (filter.values in selected) {
        filter.value = selected[filter.values]
      }
      else {
        const button = filter.container.find('button.active').first()
        filter.value = button ? button.value : null
      }
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
    reset,
    apply
  }
}
