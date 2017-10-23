import { Events, ProductTransformer, Selectors } from '@storefront/core';
import * as sinon from 'sinon';
import PastPurchases from '../../src/past-purchases';
import suite from './_suite';

const STRUCTURE = { w: 'x' };
const STATE = { y: 'z' };

suite('PastPurchases', ({ expect, spy, stub }) => {
  let getState: sinon.SinonSpy;
  let pastPurchasesProducts: sinon.SinonStub;
  let pastPurchases: PastPurchases;

  beforeEach(() => {
    getState = spy();
    PastPurchases.prototype.config = <any>{ structure: STRUCTURE };
    PastPurchases.prototype.flux = <any>{ store: { getState } };
    pastPurchasesProducts = stub(Selectors, 'products').returns([]);
    pastPurchases = new PastPurchases();
  });

  afterEach(() => {
    delete PastPurchases.prototype.flux;
    delete PastPurchases.prototype.config;
  });

  describe('constructor()', () => {
    describe('structure', () => {
      it('should have initial value', () => {
        expect(pastPurchases.structure).to.eq(STRUCTURE);
      });
    });

    describe('state', () => {
      it('should set initial value', () => {
        const products = ['a', 'b', 'c'];
        const remapped = ['d', 'e', 'f'];
        const mapProducts = stub(PastPurchases.prototype, 'mapProducts').returns(remapped);
        stub(Selectors, 'pastPurchases').returns(products);
        pastPurchasesProducts.returns(products);

        const tag = new PastPurchases();

        expect(tag.state).to.eql({ products: remapped });
        expect(mapProducts).to.be.calledWith(products);
      });
    });
  });

  describe('init()', () => {
    it('should listen for PAST_PURCHASES_UPDATED', () => {
      const on = spy();
      const fetchPastPurchases = spy();
      pastPurchases.flux = <any>{ on, actions: { fetchPastPurchases } };

      pastPurchases.init();

      expect(on).to.be.calledWithExactly(Events.PAST_PURCHASES_UPDATED, pastPurchases.updateProducts);
    });
  });

  describe('updateProducts()', () => {
    it('should set products', () => {
      const products: any[] = ['a', 'b', 'c'];
      const remapped = ['d', 'e', 'f'];
      const set = pastPurchases.set = spy();
      const mapProducts = pastPurchases.mapProducts = spy(() => remapped);
      stub(Selectors, 'pastPurchases').returns(products);

      pastPurchases.updateProducts(products);

      expect(set).to.be.calledWithExactly({ products: remapped });
      expect(mapProducts).to.be.calledWithExactly(products);
    });
  });

  describe('mapProducts()', () => {
    it('should transform and remap products', () => {
      const transform = spy(() => 'x');
      const transformer = stub(ProductTransformer, 'transformer').returns(transform);

      expect(pastPurchases.mapProducts(<any[]>['a', 'b', 'c'])).to.eql(['x', 'x', 'x']);
      expect(transformer).to.be.calledWithExactly(STRUCTURE);
      expect(transform).to.be.calledThrice
        .and.calledWith('a')
        .and.calledWith('b')
        .and.calledWith('c');
    });
  });
});