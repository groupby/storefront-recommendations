import { alias, tag, Events, ProductTransformer, Selectors, Store, Structure, Tag } from '@storefront/core';

@alias('pastPurchases')
@tag('gb-past-purchases', require('./index.html'))
class PastPurchases {

  structure: Structure = this.config.structure;
  state: PastPurchases.State = {
    products: this.mapProducts(Selectors.orderHistory(this.flux.store.getState()))
  };

  init() {
    this.flux.actions.fetchOrderHistory();
    this.flux.on(Events.ORDER_HISTORY_UPDATED, this.updateProducts);
  }

  updateProducts = (products: Store.Product[]) =>
    this.set({ products: this.mapProducts(products) })

  mapProducts(products: Store.Product[]) {
   return products.map(ProductTransformer.transformer(this.structure));
  }
}

interface PastPurchases extends Tag<any, PastPurchases.State> { }
namespace PastPurchases {
  export interface State {
    products: any[];
  }
}

export default PastPurchases;
