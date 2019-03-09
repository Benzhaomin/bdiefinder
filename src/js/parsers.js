/**
 * Brand specific implementations of SKU parsing
 */
import {Product} from './product'

// ADATA (eg. AX4U460038G19-DRZ)
function ADATA(sku) {
  // https://regex101.com/r/MWiKJR/1
  const regex = /AX4U(\d{4})3(\d)G(\d{2})-([BSDQ])([\w]{1,2}[\d]{0,2})/g
  const groups = regex.exec(sku)
  const brand = 'ADATA'
  const code = groups[5]
  const size = groups[2]
  const sticks = groups[4] === 'Q' ? 4 : groups[4] === 'D' ? 2 : 1
  const speed = groups[1]
  const cas = groups[3]
  const color = null
  const ecc = false

  let series = ''
  if (code === '' || code === 'RS' || code === 'R40') {
    series = 'Spectrix D40'
  } else if (code === 'R41' || code === 'T41') {
    series = 'Spectrix D41'
  } else if (code === 'R80') {
    series = 'Spectrix D80'
  } else if (code === 'RZ') {
    series = 'XPG Z1'
  }

  return Product(brand, series, sku, speed, cas, size, sticks, color, ecc)
}

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
  // https://regex101.com/r/lM1T9q/4
  const regex = /C([A-Z]{2})(\d{2,3})GX(\d)M(\d)[A-Z](\d{4})C(\d{2})([A-Z])?/g
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
  const sticks = groups[5] === 'Q' ? '4' : '2'
  const ecc = false

  let series = ''
  let color = null
  if (code === 'DPR') {
    series = 'Xtreem Dark Pro'
    color = 'red'
  } else if (code === 'DPG') {
    series = 'Xtreem Dark Pro'
    color = 'grey'
  } else if (code === 'XB') {
    series = 'T-Force Xtreem' // 8Pack Edition
  } else if (code === 'XG') {
    series = 'T-Force Xtreem' // Gold
  } else if (code === 'X') {
    series = 'T-Force Xtreem' // Silver
  } else if (code === 'L') {
    series = 'T-Force Vulcan'
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
  KD: 'black', // with fans
  R: 'red',
  RD: 'red', // with fans
  S: 'silver'
}

// G-Skill (eg. F4-3200C14D-16GFX)
function GSkill(sku) {
  // https://regex101.com/r/CjUiJS/4
  const regex = /F4-(\d{4})C(\d{2})([DQ2]{1,2})-(\d{2,3})G([A-Z]{2,6})/g
  const groups = regex.exec(sku)
  const brand = 'G.Skill'
  const speed = groups[1]
  const cas = groups[2]
  const sticks = groups[3] === 'Q2' ? '8' : groups[3] === 'Q' ? '4' : '2'
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

// Samsung (eg. M391A1K43BB1-CRC)
function Samsung(sku) {
  // https://regex101.com/r/smbbzc/1
  const regex = /M3(\d{2})A(\d{1})K43(BB\d{1})-(C[A-Z]{2})/g
  const groups = regex.exec(sku)
  const brand = 'Samsung'
  const code = groups[4]
  const size = groups[2] === '2' ? '16' : '8'
  const sticks = '1'
  const color = null
  const ecc = groups[1] === '91'
  const series = ecc ? 'ECC' : 'NON-ECC'

  let speed = ''
  let cas = ''
  if (code === 'CPB') {
    speed = '2133'
    cas = '15'
  } else if (code === 'CRC') {
    speed = '2400'
    cas = '17'
  } else if (code === 'CTD') {
    speed = '2666'
    cas = '19'
  }

  return Product(brand, series, sku, speed, cas, size, sticks, color, ecc)
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
  const sticks = groups[5] === 'Q' ? '4' : '2'
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

// Patriot Viper (eg. PV416G373C7K)
function Patriot(sku) {
  // https://regex101.com/r/yYVaIh/1
  const regex = /P(V[EL]?)([WR])?4(\d{2})G(\d{3})C(\d{1})K/g
  const groups = regex.exec(sku)
  const brand = 'Patriot'
  const series = 'Viper'
  const cas = `1${groups[5]}`
  const size = groups[3]
  const sticks = '2'
  const color = null
  const ecc = false

  let speed = `${groups[4]}0`
  if (speed === '3730') {
    speed = '3733'
  }

  return Product(brand, series, sku, speed, cas, size, sticks, color, ecc)
}

// SuperTalent (eg. F3600UX16G)
function SuperTalent(sku) {
  // https://regex101.com/r/kKlg3h/3
  const regex = /F(\d{4})U([ABX])(\d{1,2})G/g
  const groups = regex.exec(sku)
  const brand = 'Super Talent'
  const series = 'Project X'
  const speed = groups[1]
  const cas = '17'
  const size = groups[3]
  const sticks = groups[2] === 'X' ? '2' : '1'
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
    AX: ADATA,
    CM: Corsair,
    F4: GSkill,
    F3: SuperTalent,
    TD: TeamGroup,
    TX: TeamGroup,
    M3: Samsung,
    GE: Geil,
    HO: KFA,
    HX: Kingston,
    BL: Crucial,
    PV: Patriot
  }[sku.slice(0, 2)](sku)
}
