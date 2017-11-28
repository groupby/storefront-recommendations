import { bootstrap } from '@storefront/testing';
import * as chai from 'chai';

bootstrap(chai, __dirname, [
  '../src/past-purchases/index.html',
  '../src/past-purchases-pill/index.html',
  '../src/past-purchases-pills/index.html',
  '../src/past-purchases-pills-category/index.html',
  '../src/recommendations/index.html',
]);
