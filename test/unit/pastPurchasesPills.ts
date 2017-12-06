import { Events, Selectors } from '@storefront/core';
import PastPurchasesPills from '../../src/past-purchases-pills';
import suite from './_suite';

suite('PastPurchasesPills', ({ expect, spy, stub }) => {
  let pastPurchasesPills: PastPurchasesPills;

  beforeEach(() => {
    pastPurchasesPills = new PastPurchasesPills();
  });

  describe('constructor()', () => {
    describe('state', () => {
      it('should set initial value', () => {
        const tag = new PastPurchasesPills();

        expect(tag.state).to.eql({
          navigations: [],
          queryNavigation: {},
          displayQuery: '',
          displayCount: 0,
        });
      });
    });
  });

  describe('init()', () => {
    it('should listen for PAST_PURCHASE_NAVIGATIONS_UPDATED', () => {
      const on = spy();
      const once = spy();
      pastPurchasesPills.flux = <any>{ on, once };

      pastPurchasesPills.init();

      expect(once).to.be.calledWithExactly(Events.PAST_PURCHASE_NAVIGATIONS_UPDATED,
        pastPurchasesPills.updateState);
      expect(on).to.be.calledWithExactly(Events.PAST_PURCHASE_PRODUCTS_UPDATED,
        pastPurchasesPills.updateState);
    });
  });

  describe('updateState()', () => {
    it('should call updateDisplayQuery and updateNavigations', () => {
      const updateDisplayQuery = pastPurchasesPills.updateDisplayQuery = spy();
      const updateNavigations = pastPurchasesPills.updateNavigations = spy();

      pastPurchasesPills.updateState();

      expect(updateDisplayQuery).to.be.calledOnce;
      expect(updateNavigations).to.be.calledOnce;
    });
  });

  describe('updateNavigations()', () => {
    it('should update navigations via set', () => {
      const buildQueryNavigation = pastPurchasesPills.buildQueryNavigation = spy();
      const navigations = [1, 2, 3];
      pastPurchasesPills.state.queryNavigation = 4;
      const newNavigations = [4, 1, 2, 3];
      const select = pastPurchasesPills.select = spy(() => navigations);
      const set = pastPurchasesPills.set = spy();

      pastPurchasesPills.updateNavigations();

      expect(select).to.be.calledWithExactly(Selectors.pastPurchaseNavigations);
      expect(buildQueryNavigation).to.be.calledOnce;
      expect(navigations).to.be.eql(newNavigations);
      expect(set).to.be.calledWithExactly({ navigations });
    });
  });

  describe('updateDisplayQuery()', () => {
    it('should update displayQuery and displayCount if new query is not empty', () => {
      const query = 'giraffe';
      const select = pastPurchasesPills.select = spy(() => query);

      pastPurchasesPills.updateDisplayQuery();

      expect(select).to.be.calledWithExactly(Selectors.pastPurchaseQuery);
      expect(pastPurchasesPills.state.displayCount).to.be.eql(query);
      expect(select).to.be.calledWithExactly(Selectors.pastPurchaseCurrentRecordCount);
      expect(pastPurchasesPills.state.displayQuery).to.be.eql(query);
    });

    it('should not update displayQuery and displayCount if new query is empty', () => {
      const query = '';
      const select = pastPurchasesPills.select = spy();
      pastPurchasesPills.state.displayCount = 3;
      pastPurchasesPills.state.displayQuery = 'giraffe';

      pastPurchasesPills.updateDisplayQuery();

      expect(select).to.be.calledWithExactly(Selectors.pastPurchaseQuery);
      expect(select).to.be.calledOnce;
      expect(pastPurchasesPills.state.displayCount).to.not.be.eql(query);
      expect(pastPurchasesPills.state.displayQuery).to.not.be.eql(query);
    });
  });

  describe('buildQueryNavigation()', () => {
    it('should update queryNavigation', () => {
      const currentQuery = '';
      const displayQuery = pastPurchasesPills.state.displayQuery = 'monkey';
      const displayCount = pastPurchasesPills.state.displayCount = 5;
      const allRecordCount = 3;
      const storeRefinements = [];
      const select = pastPurchasesPills.select = stub();
      select.withArgs(Selectors.pastPurchaseQuery).returns(currentQuery);
      select.withArgs(Selectors.pastPurchaseAllRecordCount).returns(allRecordCount);
      select.withArgs(Selectors.pastPurchaseSelectedRefinements).returns(storeRefinements);
      const refinements = [
        {
          value: displayQuery,
          total: displayCount,
        },
        {
          value: 'All your purchases',
          total: allRecordCount,
        },
      ];
      const navigation = {
        field: 'query',
        label: 'Query',
        selected: [1],
        refinements
      };
      pastPurchasesPills.actions = <any>{};
      const updatePastPurchaseQuery = pastPurchasesPills.actions.updatePastPurchaseQuery = spy();
      const updateState = pastPurchasesPills.updateState = spy();

      pastPurchasesPills.buildQueryNavigation();

      expect(JSON.stringify(pastPurchasesPills.state.queryNavigation)).to.be.eql(
        JSON.stringify(navigation)
      );
      pastPurchasesPills.state.queryNavigation.refinements[1]['onClick']();
      expect(updatePastPurchaseQuery).to.be.calledWith('');
      pastPurchasesPills.state.queryNavigation.refinements[0]['onClose']();
      expect(updateState).to.be.calledOnce;
      pastPurchasesPills.state.queryNavigation.refinements[0]['onClick']();
      expect(updatePastPurchaseQuery).to.be.calledWith(displayQuery);
    });

    it('should not add a refinement for displayquery and should set selected to 0 when displayQuery is falsy', () => {
      const displayCount = pastPurchasesPills.state.displayCount = 5;
      const allRecordCount = 3;
      const storeRefinements = [];
      const select = pastPurchasesPills.select = stub();
      select.withArgs(Selectors.pastPurchaseQuery).returns(undefined);
      select.withArgs(Selectors.pastPurchaseAllRecordCount).returns(allRecordCount);
      select.withArgs(Selectors.pastPurchaseSelectedRefinements).returns(storeRefinements);
      const refinements = [
        {
          value: 'All your purchases',
          total: allRecordCount,
        },
      ];
      const navigation = {
        field: 'query',
        label: 'Query',
        selected: [0],
        refinements
      };

      pastPurchasesPills.buildQueryNavigation();

      expect(JSON.stringify(pastPurchasesPills.state.queryNavigation)).to.be.eql(
        JSON.stringify(navigation)
      );
    });

    // tslint:disable-next-line max-line-length
    it('should not set selected when there exists refinements in the store and should reset query when onclose is clicked and queries are equal', () => {
      const currentQuery = 'giraffe';
      const displayQuery = pastPurchasesPills.state.displayQuery = 'giraffe';
      const displayCount = pastPurchasesPills.state.displayCount = 5;
      const allRecordCount = 3;
      const storeRefinements = [1, 2];
      const select = pastPurchasesPills.select = stub();
      select.withArgs(Selectors.pastPurchaseQuery).returns(currentQuery);
      select.withArgs(Selectors.pastPurchaseAllRecordCount).returns(allRecordCount);
      select.withArgs(Selectors.pastPurchaseSelectedRefinements).returns(storeRefinements);
      const refinements = [
        {
          value: displayQuery,
          total: displayCount,
        },
        {
          value: 'All your purchases',
          total: allRecordCount,
        },
      ];
      const navigation = {
        field: 'query',
        label: 'Query',
        selected: [],
        refinements
      };
      pastPurchasesPills.actions = <any>{};
      const updatePastPurchaseQuery = pastPurchasesPills.actions.updatePastPurchaseQuery = spy();

      pastPurchasesPills.buildQueryNavigation();

      expect(JSON.stringify(pastPurchasesPills.state.queryNavigation)).to.be.eql(
        JSON.stringify(navigation)
      );
      pastPurchasesPills.state.queryNavigation.refinements[0]['onClose']();
      expect(updatePastPurchaseQuery).to.be.calledWith('');
    });
  });
});
