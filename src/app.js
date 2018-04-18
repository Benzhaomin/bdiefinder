/**
 * Main app
 */
import {sorted, set} from './python'
import {skus, sites} from './data'
import {Products} from './product'
import {store} from './store'
import parse from './parsers'
import Filters from './filters'
import {addToggle, setCountry, showResults, $} from './ui'

import 'bootstrap/dist/css/bootstrap.min.css'
import './main.css'

store.products = Products(skus.map(sku => parse(sku)))

$(document).ready(function() {
  // skus filters
  const filters = Filters()
  filters.add($('#model-filters'), 'brands', 'brand')
  filters.add($('#series-filters'), 'seriess', 'series')
  filters.add($('#speed-filters'), 'speeds', 'speed')
  filters.add($('#cas-filters'), 'cass', 'cas')
  // FIXME: filters.add($("#latency-filters"), 'latencies', 'latency');
  filters.add($('#size-filters'), 'sizes', 'size')
  filters.apply()
  $('#reset').click(filters.reset)

  // countries presets
  const $container = $('#country-presets')
  const countries = sorted(set(sites.map(site => site.country)))
  for (const name of countries) {
    const $button = addToggle(name, name, $container)
    $button.click(() => setCountry(name))
  }

  const $refresh = $('#refresh')
  $refresh.click(showResults)
  $('textarea').on('input', $refresh.show)
})
