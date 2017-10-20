import { alias, tag, Events, ProductTransformer, Selectors, Store, Structure, Tag } from '@storefront/core';

@alias('pastPurchases')
@tag('gb-past-purchases', require('./index.html'))
class PastPurchases {

  structure: Structure = this.config.structure;
  state: PastPurchases.State = {
    products: this.mapProducts(Selectors.pastPurchases(this.flux.store.getState()))
  };

  init() {
    this.flux.on(Events.PAST_PURCHASES_UPDATED, this.updateProducts);
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
