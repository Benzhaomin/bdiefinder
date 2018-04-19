/**
 * Expose product filters as button groups
 */
import {store} from './store'
import {addToggle, setSkus, $} from './ui'

export default function Filters() {
  const filters = []

  function add($container, valuescb, filtercb) {
    filters.push({
      container: $container,
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
        const $button = addToggle(value, value, filter.container)
        const count = products[filter.filter](value).skus().length
        $button.prop('title', `${count} SKU ${count > 1 ? 's' : ''}`)
        $button.click(e => apply(e))
        if (value === filter.value) {
          $button.addClass('active')
        }
      }
    }
  }

  function apply() {
    let products = store.products

    for (const filter of filters) {
      const $value = filter.container.find('button.active')
      filter.value = $value.length ? $value.val() : null
      products = products[filter.filter](filter.value)
    }

    refresh(products)
    show(products)

    const filtered = products.skus().length < store.products.skus().length
    $('#reset').toggle(filtered)

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
    apply,
    reset
  }
}
