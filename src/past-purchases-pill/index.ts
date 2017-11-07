
import { alias, tag, Events, ProductTransformer, Selectors, Store, Structure, Tag } from '@storefront/core';

@alias('pastPurchasesPill')
@tag('gb-past-purchases-pill', require('./index.html'), require('./index.css'))
class PastPurchasesPill {
  props: PastPurchasesPill.Props = {
    navigation: undefined
  };

  state: PastPurchasesPill.State = {
    link: () => 'TODO',
    onClick: () => { },
    onSelect: (index: number, persist?: boolean) => { },
  };

  init() {
    this.state = {...this.state, navigation: this.props.navigation };
  }
  onUpdate() {
    this.state = { ...this.state, navigation: this.props.navigation };
    this.updateAlias('pastPurchasesPill', this.state);
  }
}

interface PastPurchasesPill extends Tag<PastPurchasesPill.Props, PastPurchasesPill.State> { }
namespace PastPurchasesPill {
  export interface Props extends Tag.Props {
    navigation: {
      field: string,
      count: number,
    };
  }

  export interface State {
    navigation?: any;
    selected?: any;
    link(): string;
    onClick(): void;
    onSelect(index: number, persist?: boolean): void;
  }
}

export default PastPurchasesPill;
