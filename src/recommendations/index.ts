import { tag, Tag } from '@storefront/core';

@tag('gb-recommendations', require('./index.html'), require('./index.css'))
class Recommendations {}

interface Recommendations extends Tag<Recommendations.Props, Recommendations.State> {}
namespace Recommendations {
  export interface Props {}

  export interface State {}
}

export default Recommendations;
