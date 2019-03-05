/**
 * Main app
 */
import {sorted, set} from './python'
import {skus, sites} from './data'
import {Products} from './product'
import {store} from './store'
import parse from './parsers'
import Filters from './filters'
import {addToggle, setCountry, showResults, ui, domReady, onSitesChanged} from './ui'

/* Products */
store.products = Products(skus.map(sku => parse(sku)))

domReady(function() {
  // skus filters
  const filters = Filters()
  filters.add(ui('#display-filters'), 'displays', 'display')
  filters.add(ui('#model-filters'), 'brands', 'brand')
  filters.add(ui('#series-filters'), 'seriess', 'series')
  filters.add(ui('#speed-filters'), 'speeds', 'speed')
  filters.add(ui('#cas-filters'), 'cass', 'cas')
  filters.add(ui('#latency-filters'), 'latencies', 'latency')
  filters.add(ui('#size-filters'), 'sizes', 'size')
  filters.add(ui('#sticks-filters'), 'stickss', 'sticks')
  filters.add(ui('#rank-filters'), 'ranks', 'rank')
  // TODO: restore filters from URL
  filters.apply()
  ui('#reset').on('click', filters.reset)

  // countries presets
  const container = ui('#country-presets')
  const countries = sorted(set(sites.map(site => site.country)))
  for (const name of countries) {
    const button = addToggle(name, name, container)
    button.on('click', () => setCountry(name))
  }
  onSitesChanged()

  // results
  const refresh = ui('#refresh')
  refresh.on('click', showResults)
  ui('textarea').on('input', () => (refresh.first().style.display = 'initial'))
})
