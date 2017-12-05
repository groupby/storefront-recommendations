import { alias, tag, Events, ProductTransformer, Selectors, Store, Structure, Tag } from '@storefront/core';

@alias('pastPurchasesPills')
@tag('gb-past-purchases-pills', require('./index.html'))
class PastPurchasesPills {

  state: PastPurchasesPills.State = {
    navigations: {},
    navigationsArray: [],
    queryNavigation: {},
    displayQuery: '',
  };

  init() {
    this.flux.on(Events.PAST_PURCHASE_REFINEMENTS_UPDATED, this.updateNavigations);
    this.flux.on(Events.PAST_PURCHASE_QUERY_UPDATED, this.updateDisplayQuery);
  }

  updateNavigations = (navigations: Store.Indexed<Store.Navigation>) => {
    if (!navigations.allIds) {
      return;
    }

    const navigationsArray = navigations.allIds.map((key) => {
      return navigations.byId[key];
    });

    this.buildQueryNavigation();

    navigationsArray.unshift(this.state.queryNavigation);

    this.set({ navigations, navigationsArray });
  }

  updateDisplayQuery = (newQuery: string) => {
    if (newQuery) {
      this.state.displayQuery = newQuery;
    }
    if (this.state.navigations) {
      this.updateNavigations(this.state.navigations);
    }
  }

  buildQueryNavigation = () => {
    const currentQuery = this.select(Selectors.pastPurchaseQuery) || '';
    const displayQuery = this.state.displayQuery;
    const queriesAreEqual = displayQuery === currentQuery;
    const hasRefinementSelected = this.select(Selectors.pastPurchaseSelectedRefinements).length !== 0;

    const resetQuery = () => this.actions.updatePastPurchaseQuery('');

    const refinements = [{
      value: 'All your purchases',
      total: this.select(Selectors.pastPurchaseAllRecordCount),
      onClick: resetQuery,
      onClose: undefined,
    }];

    if (displayQuery) {
      refinements.unshift({
        value: displayQuery,
        total: this.select(Selectors.pastPurchaseCurrentRecordCount),
        onClick: () => this.actions.updatePastPurchaseQuery(displayQuery),
        onClose: () => {
          this.state.displayQuery = '';
          if (queriesAreEqual) {
            resetQuery();
          } else if (this.state.navigations) {
            this.updateNavigations(this.state.navigations);
          }
        },
      });
    }

    this.state.queryNavigation = {
      field: 'query',
      label: 'Query',
      selected: hasRefinementSelected ? [] : [(displayQuery && !queriesAreEqual) ? 1 : 0],
      refinements
    };
  }
}

interface PastPurchasesPills extends Tag<any, PastPurchasesPills.State> { }
namespace PastPurchasesPills {
  export interface State {
    navigations: any;
    navigationsArray: Store.Navigation[];
    queryNavigation: any;
    displayQuery: string;
  }
}

export default PastPurchasesPills;
