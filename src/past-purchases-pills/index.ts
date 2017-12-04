import { alias, tag, Events, ProductTransformer, Selectors, Store, Structure, Tag } from '@storefront/core';

@alias('pastPurchasesPills')
@tag('gb-past-purchases-pills', require('./index.html'))
class PastPurchasesPills {

  state: PastPurchasesPills.State = {
    navigations: {},
    navigationsArray: [],
    queryNavigation: undefined
  };

  init() {
    console.log('init called');
    this.flux.on(Events.PAST_PURCHASE_REFINEMENTS_UPDATED, this.updateNavigations);
    this.flux.on(Events.PAST_PURCHASE_QUERY_UPDATED, this.updateQueryNavigation);
  }

  updateNavigations = (navigations: Store.Indexed<Store.Navigation>) => {
    console.log('update navigations called');
    const navigationsArray = navigations.allIds.map((key) => {
        return navigations.byId[key];
      });

    this.buildQueryNavigation();
    navigationsArray.unshift(this.state.queryNavigation);

    this.set({ navigations, navigationsArray });
  }

  buildQueryNavigation = () => {
    const query = this.select(Selectors.pastPurchaseQuery) || '';
    const displayQuery = this.select(Selectors.pastPurchaseDisplayQuery) || '';
    const hasRefinementSelected = this.select(Selectors.pastPurchaseSelectedRefinements).length !== 0;
    const displayQueryNotEmpty = displayQuery !== '';
    console.log('whyyyyyyyyyyyyyyyy', query, 'display', displayQuery);

    const refinements = [{
      value: 'All your purchases',
      total: this.select(Selectors.pastPurchaseAllRecordCount),
      onClick: () => this.actions.updatePastPurchaseQuery(''),
    }];

    if (displayQueryNotEmpty) {
      console.log('slajkdhaslkhdaskjdaskldaksdhalskhdaklshda');
      refinements.unshift({
        value: displayQuery,
        total: this.select(Selectors.pastPurchaseCurrentRecordCount),
        onClick: () => this.actions.updatePastPurchaseQuery(displayQuery),
      });
    }

    const navigation = {
      field: 'query',
      label: 'Query',
      selected: hasRefinementSelected ? [] : [query === displayQuery ? 0 : displayQueryNotEmpty ? 1 : 0],
      refinements
    };

    this.state.queryNavigation = navigation;
  }

  updateQueryNavigation = () => {
    this.updateNavigations(this.state.navigations);
  }
}

interface PastPurchasesPills extends Tag<any, PastPurchasesPills.State> { }
namespace PastPurchasesPills {
  export interface State {
    navigations: any;
    navigationsArray: Store.Navigation[];
    queryNavigation: any;
  }
}

export default PastPurchasesPills;
