/**
 * Dirty UI functions
 */
/* eslint eslint-comments/no-use: off */
/* eslint-disable github/unescaped-html-literal */
import '../index.html'
import '../main.css'
import 'normalize.css'
import '../icon.png'

import {u} from 'umbrellajs'
import {sites} from './data'
import parse from './parsers'

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
  showResults()
}

function addSku(table, sku, retailers) {
  let tr

  try {
    const product = parse(sku)
    const details = product.color ? ` <small>(${product.color})</small>` : ''
    tr = ui(`<tr>
    <td>${product.brand} ${product.series} ${details}</td>
    <td>${product.sku}</td>
    <td>${product.speed}C${product.cas} / ${product.latency}ns</td>
    <td>${product.sticks}x${product.size / product.sticks}GB / ${product.rank === '1' ? 'SR' : 'DR'}</td>
    </tr>`)
  } catch (e) {
    tr = ui(`<tr>
    <td></td>
    <td>${sku}</td>
    <td></td>
    <td></td>
    </tr>`)
  }

  table.append(tr)

  // add links
  const links = ui(`<td></td>`)

  for (const retailer of retailers) {
    links.append(ui(`<a target="_blank" href="${retailer.replace('%s', sku)}">${hostname(retailer)}</a>`))
  }

  tr.append(links)
}

export function showResults() {
  const results = ui('#results')
  results.html('')

  const skus = getSkus()
  if (!skus.length) {
    results.append(`<div class="warning">No SKU => no links</div>`)
    return
  }

  const retailers = getSites()
  for (const sku of skus) {
    addSku(results, sku, retailers)
  }
}

export function addToggle(text, value, target, title) {
  const button = ui(`<button type="button" class="toggle">`)
  button.attr('value', value).text(text)
  if (title) {
    button.attr('title', title)
  }
  target.append(button)
  button.on('click', () => {
    button.toggleClass('active')
    button.siblings().removeClass('active')
  })
  return button
}

export function toggleHidden(element) {
  element = ui(element)
  const toggle = element.attr('aria-hidden') === 'false' ? 'true' : 'false'
  element.attr('aria-hidden', toggle)
}

export function domReady(fn) {
  if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
    fn()
  } else {
    document.addEventListener('DOMContentLoaded', fn)
  }
}
