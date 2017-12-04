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

    // messy check TODO review
    if (navigation && navigation.selected && navigation.refinements) {
      navigation.refinements.forEach((value, index) => {
        value['selected'] = navigation.selected.some((i) => i === index);
      });
    }
    const refinements = navigation && navigation.refinements ? navigation.refinements.map((refinement, index) => {
      const action = refinement['selected'] ? 'deselectPastPurchaseRefinement' : 'resetAndSelectPastPurchaseRefinement';
      return {
        ...refinement,
        onClick: (() => refinement['onClick'] ?
          refinement['onClick']() :
          [this.actions.updatePastPurchaseQuery(''), this.actions.resetAndSelectPastPurchaseRefinement(navigation.field, index)])
          // this.actions.resetPastPurchaseQueryThenResetAndSelectRefinement(navigation.field, index)),
          // this.actions.resetAndSelectPastPurchaseRefinement(navigation.field, index)),
      };
    }) : [];

    this.state = { refinements, navigation };
  }
}

interface PastPurchasesPillCategory extends Tag<PastPurchasesPillCategory.Props, PastPurchasesPillCategory.State> { }
export namespace PastPurchasesPillCategory {
  export interface Props extends Tag.Props {
    navigation: Store.Navigation;
  }

  export interface State {
    navigation: Store.Navigation;
    refinements: Store.Refinement[];
  }
}

export default PastPurchasesPillCategory;
