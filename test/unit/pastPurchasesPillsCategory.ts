import { Events } from '@storefront/core';
import * as Sinon from 'sinon';
import PastPurchasesPillsCategory from '../../src/past-purchases-pills-category';
import suite from './_suite';

suite('PastPurchasesPillsCategory', ({ expect, spy, stub }) => {
  let pastPurchasesPillsCategory: PastPurchasesPillsCategory;

  beforeEach(() => {
    pastPurchasesPillsCategory = new PastPurchasesPillsCategory();
  });

  describe('constructor()', () => {
    describe('props', () => {
      it('should set initial value', () => {
        const tag = new PastPurchasesPillsCategory();

        expect(tag.props).to.eql({ navigation: undefined });
      });
    });

    describe('state', () => {
      it('should set initial value', () => {
        const tag = new PastPurchasesPillsCategory();

        expect(tag.state).to.eql({
          refinements: [],
          navigation: undefined,
        });
      });
    });
  });

  describe('init()', () => {
    it('should call updateState()', () => {
      const updateState = pastPurchasesPillsCategory.updateState = spy();

      pastPurchasesPillsCategory.init();

      expect(updateState).to.be.calledOnce;
    });
  });

  describe('onUpdate()', () => {
    it('should call updateState() and updateAlias()', () => {
      const updateState = pastPurchasesPillsCategory.updateState = spy();
      const updateAlias = pastPurchasesPillsCategory.updateAlias = spy();
      const state: any = { a: 1 };
      pastPurchasesPillsCategory.state = state;

      pastPurchasesPillsCategory.onUpdate();

      expect(updateState).to.be.calledOnce;
      expect(updateAlias).to.be.calledOnce.and.calledWithExactly('pastPurchasesPillsCategory', state);
    });
  });

  describe('updateState()', () => {
    it('should set state', () => {
      const field = 'colors';
      const navigation: any = {
        field,
        selected: [1],
        refinements: [{ a: 1, }, { b: 2, }, { c: 3, }]
      };
      const newNavigation: any = {
        field,
        selected: [1],
        refinements: [{ a: 1, }, { b: 2, selected: true }, { c: 3, }]
      };
      const newRefinements: any = [
        {
          a: 1,
          onClick: () => this.actions['selectPastPurchaseRefinement'](field, 0),
        },
        {
          b: 2,
          selected: true,
          onClick: () => this.actions['deselectPastPurchaseRefinement'](field, 1),
        },
        {
          c: 3,
          onClick: () => this.actions['selectPastPurchaseRefinement'](field, 2),
        }
      ];
      pastPurchasesPillsCategory.props.navigation = navigation;
      pastPurchasesPillsCategory.actions = <any>{};
      const deselectAction = pastPurchasesPillsCategory.actions.deselectPastPurchaseRefinement = spy();
      const selectAction = pastPurchasesPillsCategory.actions.selectPastPurchaseRefinement = spy();
      const set = pastPurchasesPillsCategory.set = spy((state) => pastPurchasesPillsCategory.state = state);

      pastPurchasesPillsCategory.updateState();

      expect(pastPurchasesPillsCategory.state.navigation).to.be.eql(newNavigation);
      // there is no way to perform deep comparison with functions :(
      expect(JSON.stringify(pastPurchasesPillsCategory.state.refinements)).to.be
        .eql(JSON.stringify(newRefinements));
      pastPurchasesPillsCategory.state.refinements[0]['onClick']();
      expect(selectAction).to.be.calledWithExactly(field, 0);
      pastPurchasesPillsCategory.state.refinements[1]['onClick']();
      expect(deselectAction).to.be.calledWithExactly(field, 1);
      pastPurchasesPillsCategory.state.refinements[2]['onClick']();
      expect(selectAction).to.be.calledWithExactly(field, 2);
    });
  });

  it('should set state when navigation is undefined', () => {
    pastPurchasesPillsCategory.props.navigation = undefined;
    const set = pastPurchasesPillsCategory.set = spy();

    pastPurchasesPillsCategory.updateState();

    expect(set).to.be.calledWithExactly({ navigation: undefined, refinements: [] });
  });
});