import {
  alias,
  configurable,
  tag,
  Events,
  ProductTransformer,
  Selectors,
  Store,
  Structure,
  Tag
} from '@storefront/core';

export type Transformer = (product: Store.ProductWithMetadata) => { data: object, variants: object[], meta: any };

@configurable
@alias('pastPurchases')
@tag('gb-past-purchases', require('./index.html'))
class PastPurchases {

  structure: Structure = this.config.structure;
  state: PastPurchases.State = {
    products: []
  };

  productTransformer: Transformer = ({ data, meta }: Store.ProductWithMetadata) =>
    ({ ...ProductTransformer.transformer(this.structure)(data), meta })

  init() {
    this.flux.on(Events.ORDER_HISTORY_UPDATED, this.updateProducts);
  }

  updateProducts = (products: Store.ProductWithMetadata[]) =>
    this.set({ products: this.mapProducts(products) })

  mapProducts(products: Store.ProductWithMetadata[]) {
   return products.map(this.productTransformer);
  }
}

interface PastPurchases extends Tag<any, PastPurchases.State> { }
namespace PastPurchases {
  export interface State {
    products: any[];
  }
}

export default PastPurchases;