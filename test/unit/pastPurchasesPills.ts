import { Events } from '@storefront/core';
import PastPurchasesPills from '../../src/past-purchases-pills';
import suite from './_suite';

suite('PastPurchasesPills', ({ expect, spy, stub }) => {
  let getState: sinon.SinonSpy;
  let pastPurchasesPills: PastPurchasesPills;

  beforeEach(() => {
    pastPurchasesPills = new PastPurchasesPills();
  });

  describe('constructor()', () => {
    describe('state', () => {
      it('should set initial value', () => {
        const tag = new PastPurchasesPills();

        expect(tag.state).to.eql({ navigations: [] });
      });
    });
  });

  describe('init()', () => {
    it('should listen for PAST_PURCHASE_NAVIGATIONS_UPDATED', () => {
      const on = spy();
      pastPurchasesPills.flux = <any>{ on };

      pastPurchasesPills.init();

      expect(on).to.be.calledWithExactly(Events.PAST_PURCHASE_NAVIGATIONS_UPDATED,
        pastPurchasesPills.updateNavigations);
    });
  });

  describe('updateNavigations()', () => {
    it('should set navigations', () => {
      const navigations: any = {
        allIds: ['a', 'b', 'c'],
        byId: {
          a: { a: 1 },
          b: { b: 2 },
          c: { c: 3 },
        },
      };
      const updatedNavigations = [
        { a: 1 },
        { b: 2 },
        { c: 3 },
      ];
      const set = pastPurchasesPills.set = spy();

      pastPurchasesPills.updateNavigations(navigations);

      expect(set).to.be.calledWithExactly({ navigations: updatedNavigations });
    });
  });
});
