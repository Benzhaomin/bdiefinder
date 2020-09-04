/**
 * SKU identifier using the SKU parsers.
 */
/* eslint eslint-comments/no-use: off */
/* eslint-disable github/unescaped-html-literal */
import {skus} from './data'
import {parse} from './parsers'
import {ui} from './ui'

export default function identifier(div) {
  const container = ui(div)
  const idinput = container.find('input')
  const iddetails = container.find('div.results')

  idinput.on('change click blur paste', function () {
    const sku = idinput.first().value

    if (sku) {
      iddetails.first().style.display = 'block'
    } else {
      iddetails.first().style.display = 'none'
      return
    }

    try {
      const product = parse(sku)

      if (skus.includes(product.sku)) {
        iddetails.html(`<b>B-Die guaranteed!</b><br>`).addClass('isbdie')
      } else {
        iddetails
          .html(`<b>SKU not found!</b> It's either not B-Die or unknown to us just yet. <br>It might be: `)
          .removeClass('isbdie')
      }

      iddetails.append(`
          ${product.brand}
          ${product.series}
          ${product.color ? product.color : ''} /
          ${product.speed}C${product.cas}
          ${product.latency}ns /
          ${product.size}GB
          ${product.sticks} sticks
          ${product.rank === '1' ? 'SR' : 'DR'}`)
    } catch (e) {
      iddetails.html(`<b>SKU not found!</b> It's either not B-Die or unknown to us just yet.`).removeClass('isbdie')
    }
  })
}
