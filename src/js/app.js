/**
 * Main app.
 */
import {sorted, set} from './python'
import {skus, sites, countries} from './data'
import {Products} from './product'
import {store} from './store'
import {parse} from './parsers'
import identifier from './identifier'
import Filters from './filters'
import {addToggle, toggleHidden, setCountry, onSkusChanged, ui, domReady} from './ui'

/* Products */
store.products = Products(skus.map((sku) => parse(sku)))

domReady(function () {
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

  ui('#advanced').on('click', () => {
    ui('#advanced').toggleClass('active')
    ui('.advanced').each((node) => toggleHidden(node))
  })

  // countries presets
  const container = ui('#country-presets')
  const codes = sorted(set(sites.map((site) => site.country)))
  for (const code of codes) {
    const button = addToggle(code, code, container, countries[code])
    button.on('click', () => setCountry(code))

    // TODO: restore filters from URL
    if (code === 'WWW') {
      button.addClass('active')
    }
  }

  // TODO: restore filters from URL
  setCountry('WWW')

  // identifier
  identifier('#identifier')

  // results
  const refresh = ui('#refresh')
  refresh.on('click', onSkusChanged)
  ui('textarea').on('hange click blur paste', () => (refresh.first().style.display = 'block'))
})
