/**
 * Dirty UI functions
 */
/* assets */
import '../index.html'
import '../main.css'
import 'normalize.css'
import '../icon.png'

import {u} from 'umbrellajs'
import {sites} from './data'

export const ui = u

export function setSkus(skus) {
  skus.sort()
  ui('#skus').first().value = skus.join('\n')
  onSkusChanged()
}

export function getSkus() {
  return ui('#skus')
    .first()
    .value.split('\n')
    .filter(sku => sku.length > 0)
}

export function onSkusChanged() {
  const skus = getSkus()
  ui('#sku-count').text(skus ? skus.length : 0)
  showResults()
}

export function setCountry(name) {
  const mysites = name ? sites.filter(site => site.country === name) : []
  ui('#sites').first().value = mysites.map(site => site.url).join('\n')
  onSitesChanged()
}

function hostname(url) {
  const matches = url.match(new RegExp('^https?://([^/?#]+)(?:[/?#]|$)', 'i'))
  return matches && matches[1]
}

function getSites() {
  const sites = ui('#sites')
    .first()
    .value.split('\n')
  return sites.filter(site => hostname(site))
}

export function onSitesChanged() {
  const sites = getSites()
  ui('#sites-count').text(sites ? sites.length : 0)
  showResults()
}

function addSku(site, sku) {
  const a = ui('<a></a>')
  const url = site.attr('data-url').replace('%s', sku)
  a.attr('href', url)
  a.attr('target', '_blank')
  a.text(sku)
  site.append(a)
}

export function showResults() {
  const results = ui('#results')
  results.html('')

  const skus = getSkus()
  if (!skus.length) {
    results.append('<div class="warning">Add at least one SKU</div>')
    return
  }

  const sites = getSites()
  if (!sites.length) {
    results.append('<div class="warning">Add at least one site</div>')
    return
  }

  for (const site of sites) {
    const domain = hostname(site).replace('www.', '')

    results.append(`<h3>${domain}</h3>`)

    const sitediv = ui(`<div data-url="${site}"></div>`)
    results.append(sitediv)

    for (const sku of skus) {
      addSku(sitediv, sku)
    }
  }
}

export function addToggle(text, value, target) {
  const button = ui('<button type="button" class="toggle">')
  button.attr('value', value).text(text)
  target.append(button)
  button.on('click', () => {
    button.toggleClass('active')
    button.siblings().removeClass('active')
  })
  return button
}

export function domReady(fn) {
  if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
    fn()
  } else {
    document.addEventListener('DOMContentLoaded', fn)
  }
}
