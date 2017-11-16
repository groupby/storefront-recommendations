
import { alias, tag, Events, ProductTransformer, Selectors, Store, Structure, Tag } from '@storefront/core';

@alias('pastPurchasesPill')
@tag('gb-past-purchases-pill', require('./index.html'), require('./index.css'))
class PastPurchasesPill {
  props: PastPurchasesPill.Props = {
    navigation: undefined
  };

  state: PastPurchasesPill.State = {
    link: () => 'TODO',
    // some flux action
    onClick: () => {
      console.log(this.state.navigation);
    },

    // TODO
    selected: true
  };

  init() {
    this.state = { ...this.state, navigation: this.props.navigation };
  }
  onUpdate() {
    this.state = { ...this.state, navigation: this.props.navigation };
    this.updateAlias('pastPurchasesPill', this.state);
  }
}

interface PastPurchasesPill extends Tag<PastPurchasesPill.Props, PastPurchasesPill.State> { }
namespace PastPurchasesPill {
  export interface Props extends Tag.Props {
    navigation: Store.PastPurchases.PastPurchaseRefinement;
  }

  export interface State {
    navigation?: Store.PastPurchases.PastPurchaseRefinement;
    selected?: any;
    link(): string;
    onClick(): void;
  }
}

export default PastPurchasesPill;
