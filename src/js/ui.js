/**
 * Dirty UI functions, TODO: replace with a proper front-end framework (probably Svelte) and drop jQuery
 */
import jQuery from 'jquery'
import {sites} from './data'

export const $ = jQuery

export function setSkus(skus) {
  skus.sort()
  $('#skus').val(skus.join('\n'))
  $('#sku-count').text(skus.length)
  showResults()
}

export function setCountry(name) {
  const mysites = name ? sites.filter(site => site.country === name) : sites
  const urls = mysites.map(site => site.url).join('\n')
  $('#sites').val(urls)
  $('#sites-count').text(mysites.length)
  showResults()
}

function addSku($site, sku) {
  const $div = $('<div class="col col-md-3 col-sm-4 col-12 mb-2">')
  const $a = $('<a>')
  const url = $site.prop('data-url').replace('%s', sku)
  $a.prop('href', url)
  $a.prop('target', '_blank')
  $a.text(sku)
  $div.append($a)
  $site.append($div)
}

export function showResults() {
  const $results = $('#results')
  $results.html('')

  const skus = $('#skus')
    .val()
    .split('\n')
    .filter(sku => sku.length > 0)
  if (!skus.length) {
    $results.html('<div class="alert alert-warning" role="alert">Add at least one SKU</div>')
    return
  }

  const sites = $('#sites')
    .val()
    .split('\n')
    .filter(site => site.length > 0)
  if (!sites.length) {
    $results.html('<div class="alert alert-warning" role="alert">Add at least one site</div>')
    return
  }

  for (const site of sites) {
    const hostname = $('<a>')
      .prop('href', site)
      .prop('hostname')
      .replace('www.', '')
    $results.append($('<h3>').text(hostname))

    const $site = $('<div class="row mb-3">')
    $site.prop('data-url', site)

    for (const sku of skus) {
      addSku($site, sku)
    }
    $results.append($site)
  }
}

export function addToggle(text, value, $target) {
  const $button = $('<button type="button" class="btn btn-secondary btn-sm">')
  $button.val(value).text(text)
  $button.appendTo($target)
  $button.click(() => {
    $button.toggleClass('active')
    $button.siblings().removeClass('active')
  })
  return $button
}
