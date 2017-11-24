import { alias, tag, Events, ProductTransformer, Selectors, Store, Structure, Tag } from '@storefront/core';

@alias('pastPurchasesPill')
@tag('gb-past-purchases-pill', require('./index.html'))
class PastPurchasesPill {
  props: PastPurchasesPill.Props = {
    refinement: undefined,
  };

  state: PastPurchasesPill.State = {
    refinement: undefined,
    onClick: undefined,
    selected: false
  };

  init() {
    this.updateState();
  }
  onUpdate() {
    this.updateState();
    this.updateAlias('pastPurchasesPill', this.state);
  }

  updateState() {
    const refinement = this.props.refinement;
    this.state = {
      ...this.state,
      refinement,
      onClick: refinement.onClick,
      // explicitly false if falsy
      selected: refinement.selected || false };
  }
}

interface PastPurchasesPill extends Tag<PastPurchasesPill.Props, PastPurchasesPill.State> { }
namespace PastPurchasesPill {
  export interface Props extends Tag.Props {
    refinement: PillsRefinement;
  }

  export interface State {
    refinement: PillsRefinement;
    selected?: any;
    onClick: Function;
  }

  // TODO reuse interface from category
  export type PillsRefinement = Store.Refinement & {
    onClick: Function,
    selected: boolean,
    display?: string,
  };
}

export default PastPurchasesPill;
