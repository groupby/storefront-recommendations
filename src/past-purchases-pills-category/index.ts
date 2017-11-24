import { alias, tag, Events, ProductTransformer, Selectors, Store, Structure, Tag } from '@storefront/core';

@alias('pastPurchasesPillsCategory')
@tag('gb-past-purchases-pills-category', require('./index.html'))
class PastPurchasesPillCategory {
  props: PastPurchasesPillCategory.Props = {
    navigation: undefined
  };

  state: PastPurchasesPillCategory.State = {
    navigation: undefined,
    refinements: [],
  };

  init() {
    this.updateState();
  }
  onUpdate() {
    this.updateState();
    this.updateAlias('pastPurchasesPillsCategory', this.state);
  }

  updateState() {
    const navigation = this.props.navigation;
    navigation.selected.forEach((index) => {
      navigation.refinements[index]['selected'] = true;
    });

    const refinements = navigation && navigation.refinements ? navigation.refinements.map((refinement) => {
      const action = refinement['selected'] ? 'deselectPastPurchaseRefinement' : 'selectPastPurchaseRefinement';
      console.log('wwhhyhyhyh', action, navigation.field, refinement['index']);

      return {
        ...refinement,
        onClick: () => this.actions[action](navigation.field, refinement['index'])
      };
    }) : [];

    this.state = { ...this.state, refinements, navigation };
  }
}

interface PastPurchasesPillCategory extends Tag<PastPurchasesPillCategory.Props, PastPurchasesPillCategory.State> { }
namespace PastPurchasesPillCategory {
  export interface Props extends Tag.Props {
    navigation: Store.Navigation;
  }

  export interface State {
    navigation: Store.Navigation;
    refinements: Store.Refinement[];
  }

  export type PillsRefinement = Store.Refinement & {
    onClick: Function,
    selected: boolean,
    display?: string,
  };
}

export default PastPurchasesPillCategory;
