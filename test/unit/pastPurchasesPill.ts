import { Events } from '@storefront/core';
import PastPurchasesPill from '../../src/past-purchases-pill';
import suite from './_suite';

suite('PastPurchasesPill', ({ expect, spy, stub }) => {
  let pastPurchasesPill: PastPurchasesPill;

  beforeEach(() => {
    pastPurchasesPill = new PastPurchasesPill();
  });

  describe('constructor()', () => {
    describe('props', () => {
      it('should set initial value', () => {
        const tag = new PastPurchasesPill();

        expect(tag.props).to.eql({ refinement: undefined });
      });
    });

    describe('state', () => {
      it('should set initial value', () => {
        const tag = new PastPurchasesPill();

        expect(tag.state).to.eql({
          refinement: undefined,
          onClick: undefined,
          selected: false,
        });
      });
    });
  });

  describe('init()', () => {
    it('should call updateState()', () => {
      const updateState = pastPurchasesPill.updateState = spy();

      pastPurchasesPill.init();

      expect(updateState).to.be.calledOnce;
    });
  });

  describe('onUpdate()', () => {
    it('should call updateState() and updateAlias()', () => {
      const updateState = pastPurchasesPill.updateState = spy();
      const updateAlias = pastPurchasesPill.updateAlias = spy();
      const state: any = { a: 1 };
      pastPurchasesPill.state = state;

      pastPurchasesPill.onUpdate();

      expect(updateState).to.be.calledOnce;
      expect(updateAlias).to.be.calledOnce.and.calledWithExactly('pastPurchasesPill', state);
    });
  });

  describe('updateState()', () => {
    const onClick = () => 1;
    const selected = true;
    const refinement: any = {
      a: 1,
      onClick,
      selected,
    };

    it('should set state', () => {
      const set = pastPurchasesPill.set = spy();
      pastPurchasesPill.props.refinement = refinement;

      pastPurchasesPill.updateState();

      expect(set).to.be.calledWithExactly({ refinement, onClick, selected: true });
    });

    it('should set selected to false if selected is falsy', () => {
      refinement.selected = undefined;
      const set = pastPurchasesPill.set = spy();
      pastPurchasesPill.props.refinement = refinement;

      pastPurchasesPill.updateState();

      expect(set).to.be.calledWithExactly({ refinement, onClick, selected: false });
    });
  });
});