import { Events, ProductTransformer, Selectors } from '@storefront/core';
import * as sinon from 'sinon';
import PastPurchases from '../../src/past-purchases';
import suite from './_suite';

const STRUCTURE = { w: 'x' };

suite('PastPurchases', ({ expect, spy, stub }) => {
  let pastPurchases: PastPurchases;

  beforeEach(() => {
    PastPurchases.prototype.config = <any>{ structure: STRUCTURE };
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
        const tag = new PastPurchases();

        expect(tag.state).to.eql({ products: [] });
      });
    });
  });

  describe('init()', () => {
    it('should listen for PAST_PURCHASES_UPDATED', () => {
      const on = spy();
      pastPurchases.flux = <any>{ on };

      pastPurchases.init();

      expect(on).to.be.calledWithExactly(Events.PAST_PURCHASE_PRODUCTS_UPDATED, pastPurchases.updateProducts);
    });
  });

  describe('updateProducts()', () => {
    it('should set products', () => {
      const products: any[] = ['a', 'b', 'c'];
      const remapped = ['d', 'e', 'f'];
      const set = pastPurchases.set = spy();
      const mapProducts = pastPurchases.mapProducts = spy(() => remapped);

      pastPurchases.updateProducts(products);

      expect(set).to.be.calledWithExactly({ products: remapped });
      expect(mapProducts).to.be.calledWithExactly(products);
    });
  });

  describe('mapProducts()', () => {
    it('should transform and remap products', () => {
      const transform = spy(() => ({ data: 'x' }));
      const transformer = stub(ProductTransformer, 'transformer').returns(transform);
      const products = [
        { data: 'a', meta: '1', },
        { data: 'b', meta: '2', },
        { data: 'c', meta: '3', },
      ];
      const transformedProducts = [
        { data: 'x', meta: '1', },
        { data: 'x', meta: '2', },
        { data: 'x', meta: '3', },
      ];

      expect(pastPurchases.mapProducts(<any[]>products)).to.eql(transformedProducts);
      expect(transformer).to.be.calledWithExactly(STRUCTURE);
      expect(transform).to.be.calledThrice
        .and.calledWith('a')
        .and.calledWith('b')
        .and.calledWith('c');
    });
  });
});