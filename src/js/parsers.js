/**
 * Brand specific implementations of SKU parsing
 */
import {Product} from './product'

const CorsairColors = {
  null: 'black',
  C: 'chrome',
  M: 'black',
  T: 'torque',
  R: 'red',
  W: 'white'
}

// Corsair (eg. CMD32GX4M4B3600C16)
function Corsair(sku) {
  // https://regex101.com/r/lM1T9q/3
  const regex = /C([A-Z]{2})(\d{2})GX(\d)M(\d)[A-Z](\d{4})C(\d{2})([A-Z])?/g
  const groups = regex.exec(sku)
  const brand = 'Corsair'
  const code = groups[1]
  const size = groups[2]
  const sticks = groups[4]
  const speed = groups[5]
  const cas = groups[6]
  const color = CorsairColors[groups[7]]
  const ecc = false

  let series = ''
  if (code === 'MD') {
    series = 'Dominator'
  } else if (code === 'MK' || code === 'MU' || code === 'MR') {
    series = 'Vengeance'
  }

  return Product(brand, series, sku, speed, cas, size, sticks, color, ecc)
}

// Team Group (eg. TXD416G3733HC18ADC01)
function TeamGroup(sku) {
  // https://regex101.com/r/z0CUon/3
  const regex = /T([A-Z]{1,3})D4(\d{2})G(\d{4})HC(\d{2})\w([DQ])C01/g
  const groups = regex.exec(sku)
  const brand = 'Team'
  const code = groups[1]
  const size = groups[2]
  const speed = groups[3]
  const cas = groups[4]
  const sticks = groups[5] === 'Q' ? 4 : 2
  const color = null
  const ecc = false

  let series = ''
  if (code === 'DPG') {
    series = 'Dark Pro'
  } else if (code === 'X') {
    series = 'T-Force XTREEM'
  }

  return Product(brand, series, sku, speed, cas, size, sticks, color, ecc)
}

const GskillTridentZColors = {
  '': 'silver-red',
  A: 'silver-red',
  B: 'silver-red',
  KK: 'black-black',
  KKE: 'black-black',
  KKF: 'black-black',
  KW: 'black-white',
  KO: 'black-orange',
  KY: 'black-yellow',
  R: 'rgb',
  RF: 'rgb',
  RX: 'rgb',
  SK: 'silver-black',
  SW: 'silver-white',
  SWE: 'silver-white',
  SWF: 'silver-white'
}

const GskillRipjawsColors = {
  G: 'black',
  K: 'black',
  R: 'red',
  S: 'silver'
}

// G-Skill (eg. F4-3200C14D-16GFX)
function GSkill(sku) {
  // https://regex101.com/r/CjUiJS/3
  const regex = /F4-(\d{4})C(\d{2})([DQ2]{1,2})-(\d{2})G([A-Z]{2,6})/g
  const groups = regex.exec(sku)
  const brand = 'G.Skill'
  const speed = groups[1]
  const cas = groups[2]
  const sticks = groups[3] === 'Q2' ? 8 : groups[3] === 'Q' ? 4 : 2
  const size = groups[4]
  const code = groups[5]
  const ecc = false

  let series = ''
  let color = null
  if (code.indexOf('TZ') === 0) {
    series = 'Trident Z'
    color = GskillTridentZColors[code.replace('TZ', '')]
  } else if (code.indexOf('FX') === 0) {
    series = 'Flare X'
  } else if (code.indexOf('SX') === 0) {
    series = 'Sniper X'
  } else if (code[0] === 'V') {
    series = 'Ripjaws V'
    color = GskillRipjawsColors[code[1]]
  }

  return Product(brand, series, sku, speed, cas, size, sticks, color, ecc)
}

// Samsung ECC (eg. M391A1K43BB1-CRC)
function Samsung(sku) {
  return {
    'M391A1K43BB1-CRC': Product('Samsung', 'ECC', 'M391A1K43BB1-CRC', '2400', '17', '8', '1', null, true),
    'M391A2K43BB1-CRC': Product('Samsung', 'ECC', 'M391A2K43BB1-CRC', '2400', '17', '16', '1', null, true)
  }[sku]
}

// GeIL (eg. GEX416GB3200C16ADC)
function Geil(sku) {
  // https://regex101.com/r/mOcKR8/7/
  const regex = /G([A-Z]{2,6})4(\d{1,2})GB(\d{4})C(\d{2})A?(\w)C/g
  const groups = regex.exec(sku)
  const brand = 'GeIL'
  const code = groups[1]
  const speed = groups[3]
  const cas = groups[4]
  const size = groups[2]
  const sticks = groups[5] === 'Q' ? 4 : 2
  const color = null
  const ecc = false

  let series = ''
  if (code === 'EX') {
    series = 'Evo X'
  }

  return Product(brand, series, sku, speed, cas, size, sticks, color, ecc)
}

// KFA2 HOF (eg. HOF4CXLBS3600K17LD162K)
function KFA(sku) {
  // https://regex101.com/r/WBL7z2/2
  const regex = /([A-Z]{3,6})4.*?(\d{4})[A-Z](\d{2})[A-Z]{2}(\d{2})(\d)K/g
  const groups = regex.exec(sku)
  const brand = 'KFA2'
  const code = groups[1]
  const speed = groups[2]
  const cas = groups[3]
  const size = groups[4]
  const sticks = groups[5]
  const color = null
  const ecc = false

  let series = ''
  if (code === 'HOF') {
    series = 'HOF'
  }

  return Product(brand, series, sku, speed, cas, size, sticks, color, ecc)
}

// Kingston Hyper X (eg. HX436C17PB3K4/32)
function Kingston(sku) {
  // https://regex101.com/r/sZJJWU/1
  const regex = /HX4(\d{2})C(\d{2})PB3K(\d)\/(\d{2})/g
  const groups = regex.exec(sku)
  const brand = 'Kingston'
  const series = 'Hyper X'
  const speed = `${groups[1]}00`
  const cas = groups[2]
  const size = groups[4]
  const sticks = groups[3]
  const color = null
  const ecc = false

  return Product(brand, series, sku, speed, cas, size, sticks, color, ecc)
}

// Crucial Ballistix Elite (eg. BLE2K8G4D34AEEAK) - no info on cas latency
function Crucial(sku) {
  return {
    BLE2K8G4D34AEEAK: Product('Crucial', 'Ballistix Elite', 'BLE2K8G4D34AEEAK', '3466', '16', '16', '2', null, false)
  }[sku]
}

// turns any SKU into a Product
export default function parse(sku) {
  return {
    CM: Corsair,
    F4: GSkill,
    TD: TeamGroup,
    TX: TeamGroup,
    M3: Samsung,
    GE: Geil,
    HO: KFA,
    HX: Kingston,
    BL: Crucial
  }[sku.slice(0, 2)](sku)
}
