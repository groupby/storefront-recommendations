import { alias, tag, Events, ProductTransformer, Selectors, Store, Structure, Tag } from '@storefront/core';

@alias('pastPurchasesPills')
@tag('gb-past-purchases-pills', require('./index.html'))
class PastPurchasesPills {

  state: PastPurchasesPills.State = {
    navigations: [],
  };

  init() {
    this.flux.on(Events.PAST_PURCHASE_REFINEMENTS_UPDATED, this.updateNavigations);
  }

  updateNavigations = (navigations: Store.Indexed<Store.Navigation>) => {
    const navigationsArray = navigations.allIds.map((key) => {
        return navigations.byId[key];
      });

    const query = this.select(Selectors.pastPurchaseQuery);

    if (query && query !== '') {
      this.addQueryNavigation(navigationsArray, query);
    }

    this.set({ navigations: navigationsArray });
  }

  addQueryNavigation = (navigations: any[], query: string) => {
    navigations.push({
      field: 'query',
      label: 'Query',
      selected: [0],
      refinements: [{ value: query, onClick: () => this.actions.updatePastPurchaseQuery('') }]
    });
  }
}

interface PastPurchasesPills extends Tag<any, PastPurchasesPills.State> { }
namespace PastPurchasesPills {
  export interface State {
    navigations: Store.Navigation[];
  }
}

export default PastPurchasesPills;
