/**
 * Data model
 */
import {sorted, set} from './python'

// latency = cycle time here
function getLatency(speed, cas) {
  return (1 / (parseInt(speed) / 1000 / 2)) * parseInt(cas)
}

function isExotic(product) {
  return product.speed < 3000 || product.speed > 3600 || product.size < 16 || product.size > 32 || product.ecc
}

export function Product(brand, series, sku, speed, cas, size, sticks, color, ecc) {
  const latency = String(Math.round(getLatency(speed, cas) * 10) / 10)
  const rank = parseInt(size) / parseInt(sticks) === 16 ? '2' : '1'

  return {
    brand,
    series,
    sku,
    speed,
    cas,
    latency,
    size,
    sticks,
    rank,
    color,
    ecc
  }
}

// helper methods on a list of products, filtering methods can be chained
export function Products(products) {
  function skus() {
    return sorted(set(products.map(product => product.sku)))
  }

  function display(value) {
    return Products(products.filter(product => !value || value == 'Full' || !isExotic(product)))
  }

  function displays() {
    return products.some(product => !isExotic(product)) ? ['Simple', 'Full'] : ['Full']
  }

  function brand(value) {
    return Products(products.filter(product => !value || product.brand === value))
  }

  function brands() {
    return sorted(set(products.map(product => product.brand)))
  }

  function series(value) {
    return Products(products.filter(product => !value || product.series === value))
  }

  function seriess() {
    return sorted(set(products.map(product => product.series)))
  }

  function speed(value) {
    return Products(products.filter(product => !value || product.speed === value))
  }

  function speeds() {
    return sorted(set(products.map(product => product.speed)))
  }

  function cas(value) {
    return Products(products.filter(product => !value || product.cas === value))
  }

  function cass() {
    return sorted(set(products.map(product => product.cas)))
  }

  function sticks(value) {
    return Products(products.filter(product => !value || product.sticks === value))
  }

  function stickss() {
    return sorted(set(products.map(product => product.sticks)))
  }

  function rank(value) {
    return Products(products.filter(product => !value || product.rank === value))
  }

  function ranks() {
    return sorted(set(products.map(product => product.rank)))
  }

  function latency(value) {
    return Products(products.filter(product => !value || product.latency === value))
  }

  function latencies() {
    const values = set(products.map(product => product.latency))
    values.sort((a, b) => parseFloat(a) > parseFloat(b))
    return values
  }

  function size(value) {
    return Products(products.filter(product => !value || product.size === value))
  }

  function sizes() {
    const values = set(products.map(product => product.size))
    values.sort((a, b) => parseInt(a) > parseInt(b))
    return values
  }

  return {
    skus,
    display,
    displays,
    brand,
    brands,
    series,
    seriess,
    speed,
    speeds,
    cas,
    cass,
    sticks,
    stickss,
    rank,
    ranks,
    latency,
    latencies,
    size,
    sizes
  }
}
