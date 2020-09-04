import {describe, it} from 'mocha'
import {expect} from 'chai'
import {skus, sites, countries} from './data'
import {parse} from './parsers'

describe("skus", () => {
    it("checks that every sku can be parsed", () => {
        for (const s of skus) {
            expect(parse(s), `product should be built from SKU ${s}`).to.not.be.an('undefined')
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