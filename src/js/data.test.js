import {describe, it} from 'mocha'
import {expect} from 'chai'
import {skus, sites, countries} from './data'
import {parse} from './parsers'

describe("skus", () => {
    it("checks that every sku can be parsed", () => {
        for (const s of skus) {
            const parsed = parse(s)
            expect(parsed, `product should be built from SKU ${s}`).to.not.be.an('undefined')
            expect(parsed.brand, `brand should be not null ${s}`).to.not.be.equal('')
            expect(parsed.series, `series should be not null ${s}`).to.not.be.equal('')
            expect(parsed.speed, `speed should be not null ${s}`).to.not.be.equal('')
            expect(parsed.cas, `cas should be not null ${s}`).to.not.be.equal('')
            expect(parsed.latency, `latency should be not null ${s}`).to.not.be.equal('')
            expect(parsed.size, `size should be not null ${s}`).to.not.be.equal('')
            expect(parsed.sticks, `sticks should be not null ${s}`).to.not.be.equal('')
            expect(parsed.ranks, `ranks should be not null ${s}`).to.not.be.equal('')
        }
    });
});

describe("sites", () => {
    it("checks that every site is valid", () => {
        for (const s of sites) {
            expect(s.country, "country should be defined").to.not.be.an('undefined')
            expect(countries, "country should be a known code").to.be.property(s.country)
            expect(s.name, "name should be defined").to.not.be.an('undefined')
            expect(s.url, "url should be defined").to.not.be.an('undefined')
            expect(s.url, "url should contain a variable part (%s)").to.contain('%s')
        }
    });
});