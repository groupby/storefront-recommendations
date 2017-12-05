import { alias, tag, Events, ProductTransformer, Selectors, Store, Structure, Tag } from '@storefront/core';

@alias('pastPurchasesPills')
@tag('gb-past-purchases-pills', require('./index.html'))
class PastPurchasesPills {

  state: PastPurchasesPills.State = {
    navigationsArray: [],
    queryNavigation: {},
    displayQuery: '',
    displayCount: 0,
  };

  init() {
    this.updateDisplayQuery(this.select(Selectors.pastPurchaseQuery));
    this.flux.on(Events.PAST_PURCHASE_PRODUCTS_UPDATED, this.doTheThing);
    this.flux.once(Events.PAST_PURCHASE_REFINEMENTS_UPDATED, this.doTheThing);
  }

  doTheThing = () => {
    this.updateDisplayQuery(this.select(Selectors.pastPurchaseQuery));
    this.updateNavigations(this.select(Selectors.pastPurchaseNavigations));
  }

  updateNavigations = (navigations: Store.Navigation[]) => {
    const navigationsArray = navigations;

    console.log('asdadasdadsadasdadsada', navigationsArray);
    console.log('cccc', this.select(Selectors.pastPurchaseNavigations));

    this.buildQueryNavigation();

    navigationsArray.unshift(this.state.queryNavigation);

    this.set({ navigationsArray });
  }

  updateDisplayQuery = (newQuery: string) => {
    if (newQuery) {
      this.state.displayQuery = newQuery;
      this.state.displayCount = this.select(Selectors.pastPurchaseCurrentRecordCount);
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
        total: this.state.displayCount,
        onClick: () => this.actions.updatePastPurchaseQuery(displayQuery),
        onClose: () => {
          this.state.displayQuery = '';
          if (queriesAreEqual) {
            resetQuery();
          } else {
            this.doTheThing();
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
    // navigations: any;
    navigationsArray: Store.Navigation[];
    queryNavigation: any;
    displayQuery: string;
    displayCount: number;
  }
}

export default PastPurchasesPills;
