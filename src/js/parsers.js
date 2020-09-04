/**
 * Brand specific implementations of SKU parsing.
 */
import {Product} from './product'

// ADATA (eg. AX4U460038G19-DRZ)
export function ADATA(sku) {
  // https://regex101.com/r/MWiKJR/1
  const regex = /AX4U(\d{4})3(\d)G(\d{2})-([BSDQ])([\w]{1,2}[\d]{0,2})/g
  const groups = regex.exec(sku)
  const brand = 'ADATA'
  const code = groups[5]
  const size = groups[2]
  const sticks = groups[4] === 'Q' ? '4' : groups[4] === 'D' ? '2' : '1'
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

// Apacer (eg. EK.16GA5.GGBK2)
export function Apacer(sku) {
  return {
    'EK.16GA5.GGBK2': Product('Apacer', 'Blade', sku, '4133', '18', '16', '2', null, false),
    'EK.16GA4.GFAK2': Product('Apacer', 'Commando', sku, '3600', '17', '16', '2', null, false),
  }[sku]
}

// Avexir (eg. AVD4UZ136001708G-2BZ1RR)
export function Avexir(sku) {
  // https://regex101.com/r/T7pqzr/1
  const regex = /AVD4UZ1([\d]{4})([\d]{2})[0]?([1,3,6]?[2,4,6,8])G-([\d])([\w]{3})([\w]{2})/g
  const groups = regex.exec(sku)
  const brand = 'Avexir'
  const code = groups[5]
  const size = (parseInt(groups[3]) * parseInt(groups[4])).toString()
  const speed = groups[1]
  const cas = groups[2]
  const sticks = groups[4]
  const ecc = false

  let series = ''
  if (code === 'BZ1') {
    series = 'Blitz'
  }

  let color = groups[6]
  if (color === 'RR') {
    color = 'Red'
  } else if (color === 'GY') {
    color = 'Gold'
  } else if (code === 'SW') {
    color = 'White'
  }

  return Product(brand, series, sku, speed, cas, size, sticks, color, ecc)
}

const CorsairColors = {
  null: 'black',
  C: 'chrome',
  M: 'black',
  T: 'torque',
  R: 'red',
  W: 'white',
}

// Corsair (eg. CMD32GX4M4B3600C16)
export function Corsair(sku) {
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
  } else if (code === 'MT') {
    series = 'Dominator RGB'
  } else if (code === 'MK' || code === 'MU') {
    series = 'Vengeance'
  } else if (code === 'MR') {
    series = 'Vengeance RGB'
  } else if (code === 'MW') {
    series = 'Vengeance RGB Pro'
  }

  return Product(brand, series, sku, speed, cas, size, sticks, color, ecc)
}

// Team Group (eg. TXD416G3733HC18ADC01)
export function TeamGroup(sku) {
  // https://regex101.com/r/z0CUon/6
  const regex = /T([\w]{1,3})D4(\d{2})G(\d{4})HC(\d{2})\w([DQ])C?01/g
  const groups = regex.exec(sku)
  const brand = 'Team Group'
  const code = groups[1]
  const size = groups[2]
  const speed = groups[3]
  const cas = groups[4]
  const sticks = groups[5] === 'Q' ? '4' : '2'
  const ecc = false

  let series = ''
  let color = null
  if (code.slice(0, 2) === 'DP') {
    series = 'Xtreem Dark Pro'
    color = code[2] === 'R' ? 'red' : 'grey'
  } else if (code === 'X') {
    series = 'T-Force Xtreem' // Silver
    color = 'silver'
  } else if (code === 'XK') {
    series = 'T-Force Xtreem' // Silver
    color = 'black'
  } else if (code === 'XB') {
    series = 'T-Force Xtreem' // 8Pack Edition
  } else if (code === 'XG') {
    series = 'T-Force Xtreem' // Gold
  } else if (code === 'XOB') {
    series = 'T-Force Xtreem' // OnePageBook Edition
  } else if (code === 'L') {
    series = 'T-Force Vulcan'
  } else if (code === 'F10') {
    series = 'Xtreem ARGB'
  } else if (code[0] === 'F') {
    series = 'T-Force Night Hawk RGB'
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
  SWF: 'silver-white',
}

const GskillTridentZRoyalColors = {
  S: 'silver',
  G: 'gold',
}

const GskillRipjawsColors = {
  G: 'black',
  K: 'black',
  KD: 'black', // with fans
  R: 'red',
  RD: 'red', // with fans
  S: 'silver',
}

// G-Skill (eg. F4-3200C14D-16GFX)
export function GSkill(sku) {
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
  if (code.indexOf('TZN') === 0) {
    series = 'Trident Z Neo'
    color = 'rgb'
  } else if (code.indexOf('TZ') === 0) {
    series = 'Trident Z'
    color = GskillTridentZColors[code.replace('TZ', '')]
  } else if (code.indexOf('TR') === 0) {
    series = 'Trident Z Royal'
    color = GskillTridentZRoyalColors[code.replace('TR', '')]
  } else if (code.indexOf('FX') === 0) {
    series = 'Flare X'
  } else if (code.indexOf('SX') === 0) {
    series = 'Sniper X'
  } else if (code[0] === 'V') {
    series = 'Ripjaws V'
    color = GskillRipjawsColors[code[1]]
  } else if (code.indexOf('RS') === 0) {
    series = 'Ripjaws so-dimm'
  }

  return Product(brand, series, sku, speed, cas, size, sticks, color, ecc)
}

// Samsung (eg. M391A1K43BB1-CRC)
export function Samsung(sku) {
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

const GeilSeries = {
  EX: 'EVO X',
  EXB: 'EVO X',
  EXG: 'EVO X',
  EXW: 'EVO X',
  FR: 'EVO Forza',
  PR: 'EVO Potenza',
  WW: 'White Dragon',
  LS: 'Super Luce RGB Sync',
}

// GEiL (eg. GEX416GB3200C16ADC)
export function Geil(sku) {
  // https://regex101.com/r/mOcKR8/8
  const regex = /G([A-Z]{2,6})\w(\d{1,2})GB(\d{4})C(\d{2})A?(\w)C/g
  const groups = regex.exec(sku)
  const brand = 'GEiL'
  const series = GeilSeries[groups[1]] || 'das'
  const speed = groups[3]
  const cas = groups[4]
  const size = groups[2]
  const sticks = groups[5] === 'Q' ? '4' : '2'
  const ecc = false

  let color = ''
  if (sku.indexOf('EXG') > 0 || sku.indexOf('EXW') > 0) {
    color = 'white'
  } else if (sku.indexOf('EX4') > 0 || sku.indexOf('EXB') > 0) {
    color = 'black'
  }

  return Product(brand, series, sku, speed, cas, size, sticks, color, ecc)
}

// Hall of Fame / Galax (eg. HOF4CXLBS3600K17LD162C) or KFA2 (eg. HOF4CXLBS3600K17LD162K)
export function HOF(sku) {
  // https://regex101.com/r/WBL7z2/5
  const regex = /([A-Z]{3,6})4([A-Z]{3})[1,4]?([A-Z]{2,3})(\d{4})[A-Z](\d{2})[A-Z]{2}(\d{2})(\d)([CK])/g
  const groups = regex.exec(sku)
  const brand = groups[8] === 'K' ? 'KFA2' : 'Galax'
  const code = groups[3]
  const code2 = groups[2]
  const speed = groups[4]
  const cas = groups[5]
  let size = groups[6]
  const sticks = groups[7]
  const color = null
  const ecc = false

  let series = ''
  if (code === 'BS') {
    series = 'Hall of Fame'
  } else if (code === 'BST' && code2 === 'CXL') {
    series = 'Hall of Fame Extreme'
  } else if (code === 'BST' && code2 === 'CRL') {
    series = 'Hall of Fame OC Lab Arduino'
  } else if (code === 'BST' && code2 === 'RJL') {
    series = 'Hall of Fame OC Lab Water Cooling'
  } else if (code === 'CST') {
    series = 'Hall of Fame II'
  }

  // GALAX HOF Extreme OC Lab Edition DDR4-4600MHz 16GB Kit
  // see http://galaxstore.net/GALAX-HOF-Extreme-OC-Lab-Edition-DDR4-4600MHz-16GB-Kit_p_182.html
  if (sku === 'HOF4KXL1BST4600S19TC081CZGG') {
    size = '16'
  }

  return Product(brand, series, sku, speed, cas, size, sticks, color, ecc)
}

const KingstonSeries = {
  PB3: 'Hyper X Predator',
  PB3A: 'Hyper X Predator RGB',
}

// Kingston Hyper X (eg. HX436C17PB3K4/32)
export function Kingston(sku) {
  // https://regex101.com/r/sZJJWU/2
  const regex = /HX4(\d{2})C(\d{2})(PB3A?)K?([\d]?)\/(\d{1,2})/g
  const groups = regex.exec(sku)
  const brand = 'Kingston'
  const series = KingstonSeries[groups[3]]
  const speed = groups[1] === '13' ? '4133' : `${groups[1]}00`
  const cas = groups[2]
  const size = groups[5]
  const sticks = groups[4] || '1'
  const color = null
  const ecc = false

  return Product(brand, series, sku, speed, cas, size, sticks, color, ecc)
}

const PatriotSeries = {
  V: 'Viper 4',
  VE: 'Viper 4 Elite',
  VLW: 'Viper LED',
  VR: 'Viper RGB',
  VS: 'Viper Steel',
  VB: 'Viper Blackout',
}

// Patriot Viper (eg. PV416G373C7K)
export function Patriot(sku) {
  // https://regex101.com/r/yYVaIh/4
  const regex = /P([BVELWRS]*)4(\d{2})G(\d{3})C(\d{1})K/g
  const groups = regex.exec(sku)
  const brand = 'Patriot'
  const series = PatriotSeries[groups[1]]
  const speed = `${groups[3]}${groups[3][2]}`
  const cas = `1${groups[4]}`
  const size = groups[2]
  const sticks = '2'
  const color = null
  const ecc = false

  return Product(brand, series, sku, speed, cas, size, sticks, color, ecc)
}

// SuperTalent (eg. F3600UX16G)
export function SuperTalent(sku) {
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
export function Crucial(sku) {
  // https://regex101.com/r/WvBqxu/1
  const regex = /BLE([\d]?)\w?([\d])G4D(\d{2})AEEAK/g
  const groups = regex.exec(sku)
  const brand = 'Crucial'
  const series = 'Ballistix Elite'
  const speed = `${groups[3]}00`
  const cas = '17'
  const sticks = groups[1] === '' ? '1' : groups[1]
  const size = (parseInt(groups[2]) * parseInt(sticks)).toString()
  const color = null
  const ecc = false

  return Product(brand, series, sku, speed, cas, size, sticks, color, ecc)
}

// Inno3d iChill RGB (eg. RCX2-16G3600R) - no info on cas latency
export function Inno3d(sku) {
  // https://regex101.com/r/R3HIDO/1
  const regex = /RCX([\d])-([\d]{2})G(\d{4})([A|R])/g
  const groups = regex.exec(sku)
  const brand = 'Inno3d'
  const series = 'iChill RGB'
  const speed = groups[3]
  const sticks = groups[1]
  const size = groups[2]
  const ecc = false

  let cas = null
  if (speed === '3600') {
    cas = '17'
  } else if (speed === '4000') {
    cas = '19'
  }

  let color = groups[4]
  if (color === 'A') {
    color = 'Aura Sync'
  } else if (color === 'R') {
    color = 'RGB'
  }

  return Product(brand, series, sku, speed, cas, size, sticks, color, ecc)
}

// Zadak Shield (eg. ZD4-SHC3200C14-64GDSD)
export function Zadak(sku) {
  // https://regex101.com/r/LTr1ZE/1/
  const regex = /ZD4-SH[C|K]([\d]{4})C([\d]{2})-([\d]{2})G/g
  const groups = regex.exec(sku)
  const brand = 'Zadak'
  const series = 'Shield'
  const speed = groups[1]
  const cas = groups[2]
  const color = null
  const sticks = '2'
  const size = groups[3] === '08' ? '16' : groups[3]
  const ecc = false

  return Product(brand, series, sku, speed, cas, size, sticks, color, ecc)
}

// turns any SKU into a Product
export function parse(sku) {
  const parser = {
    AV: Avexir,
    AX: ADATA,
    BL: Crucial,
    CM: Corsair,
    EK: Apacer,
    F3: SuperTalent,
    F4: GSkill,
    GE: Geil,
    GF: Geil,
    GL: Geil,
    GP: Geil,
    GW: Geil,
    HO: HOF,
    HX: Kingston,
    M3: Samsung,
    PV: Patriot,
    RC: Inno3d,
    TD: TeamGroup,
    TF: TeamGroup,
    TL: TeamGroup,
    TX: TeamGroup,
    ZD: Zadak,
  }[sku.slice(0, 2)]
  if (parser === undefined) {
    // no parser found
    return
  }
  return parser(sku)
}
