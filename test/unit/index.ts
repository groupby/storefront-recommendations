import * as pkg from '../../src';
import PastPurchasesPill from '../../src/past-purchases-pill';
import PastPurchasesPills from '../../src/past-purchases-pills';
import PastPurchasesPillsCategory from '../../src/past-purchases-pills-category';
import Recommendations from '../../src/recommendations';
import suite from './_suite';

suite('package', ({ expect }) => {
  it('should expose Recommendations', () => {
    expect(pkg.Recommendations).to.eq(Recommendations);
  });

  it('should expose PastPurchasesPills', () => {
    expect(pkg.PastPurchasesPills).to.eq(PastPurchasesPills);
  });

  it('should expose PastPurchasesPill', () => {
    expect(pkg.PastPurchasesPill).to.eq(PastPurchasesPill);
  });

  it('should expose PastPurchases', () => {
    expect(pkg.PastPurchasesPillsCategory).to.eq(PastPurchasesPillsCategory);
  });
});
