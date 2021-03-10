import {describe, it} from 'mocha'
import {expect} from 'chai'
import {ADATA, Apacer, Avexir, Corsair, TeamGroup, GSkill, Samsung, Geil, HOF, HEX, Kingston, Patriot, SuperTalent, Crucial, Inno3d, Zadak} from './parsers'

const parsers = new Map([
    [ADATA, ['AX4U460038G19-DRZ']],
    [Apacer, ['EK.16GA5.GGBK2']],
    [Avexir, ['AVD4UZ136001708G-2BZ1RR']],
    [Corsair, ['CMD32GX4M4B3600C16']],
    [TeamGroup, ['TXD416G3733HC18ADC01']],
    [GSkill, ['F4-3200C14D-16GFX']],
    [Samsung, ['M391A1K43BB1-CRC']],
    [Geil, ['GEX416GB3200C16ADC']],
    [HOF, ['HOF4CXLBS3600K17LD162C']],
    [HEX, ['HEX4D16G4800C19']],
    [Kingston, ['HX436C17PB3K4/32']],
    [Patriot, ['PV416G373C7K']],
    [SuperTalent, ['F3600UX16G']],
    [Crucial, ['BLE2K8G4D34AEEAK']],
    [Inno3d, ['RCX2-16G3600R']],
    [Zadak, ['ZD4-SHC3200C14-64GDSD']]
])

describe("parsers", () => {
    for (const [p, skus] of parsers) {
        it(`checks the ${p.name} parser`, () => {
            for (const s of skus) {
                expect(p(s).speed, `product should be built from SKU ${s}`).to.not.be.an('undefined')
            }
        })
    }
});
