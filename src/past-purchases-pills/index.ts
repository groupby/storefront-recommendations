import { alias, tag, Events, ProductTransformer, Selectors, Store, Structure, Tag } from '@storefront/core';

@alias('pastPurchasesPills')
@tag('gb-past-purchases-pills', require('./index.html'))
class PastPurchasesPills {

  state: PastPurchasesPills.State = {
    navigations: []
  };

  init() {
    this.flux.on(Events.ORDER_HISTORY_NAVIGATIONS_UPDATED, this.updateNavigations);
  }

  updateNavigations = (navigations: Store.Recommendations.OrderHistoryNavigation[]) =>
    this.set({ navigations })
}

interface PastPurchasesPills extends Tag<any, PastPurchasesPills.State> { }
namespace PastPurchasesPills {
  export interface State {
    navigations: Store.Recommendations.OrderHistoryNavigation[];
  }
}

export default PastPurchasesPills;
