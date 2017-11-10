import { alias, configurable, tag, Events, Selectors, Store, Tag } from '@storefront/core';

@configurable
@alias('pastPurchasesSort')
@tag('gb-past-purchases-sort', require('./index.html'))
class Sort {
  state: Sort.State = {
    sorts: [],
    onSelect: (index) => { this.actions.selectPastPurchasesSort(index); }
  };

  init() {
    this.updateSorts();
    this.flux.on(Events.PAST_PURCHASE_SORT_UPDATED, this.updateSorts);
  }

  updateSorts = () =>
    this.set({ sorts: this.extractSorts() })

  extractSorts() {
    const sorts = this.select(Selectors.pastPurchaseSort);
    return sorts.items.map((sort, index) => ({
      label: sort.field,
      selected: sorts.selected === index
    }));
  }
}

interface Sort extends Tag<any, Sort.State> { }
namespace Sort {
  export interface State {
    sorts: Option[];
    onSelect(index: number): void;
  }

  export interface Option {
    label: string;
    selected?: boolean;
  }
}

export default Sort;
