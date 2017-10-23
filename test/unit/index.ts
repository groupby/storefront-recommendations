import * as pkg from '../../src';
import PastPurchases from '../../src/past-purchases';
import Recommendations from '../../src/recommendations';
import suite from './_suite';

suite('package', ({ expect }) => {
  it('should expose Recommendations', () => {
    expect(pkg.Recommendations).to.eq(Recommendations);
  });

  it('should expose PastPurchases', () => {
    expect(pkg.PastPurchases).to.eq(PastPurchases);
  });
});
