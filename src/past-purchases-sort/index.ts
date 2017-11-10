import { alias, configurable, tag, Events, Selectors, Store, Tag } from '@storefront/core';

@configurable
@alias('pastPurchasesSort')
@tag('gb-past-purchases-sort', require('./index.html'))
class Sort {
  state: Sort.State = {
    //todo move to selector in flux
    // labels: ['Most Recent', 'Most Purchased'],
    labels: [],
    sorts: [],
    // onSelect: (index) => this.actions.selectSort(index)
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
      label: this.getLabel(sort, index),
      selected: sorts.selected === index
    }));
  }

  getLabel(sort: Store.Sort, index: number) {
    if (index < this.state.labels.length) {
      return this.state.labels[index];
    } else {
      return `${sort.field} ${sort.descending ? 'Descending' : 'Ascending'}`;
    }
  }
}

interface Sort extends Tag<any, Sort.State> { }
namespace Sort {
  export interface State {
    labels: string[];
    sorts: Option[];
    onSelect(index: number): void;
  }

  export interface Option {
    label: string;
    selected?: boolean;
  }
}

export default Sort;
