import { bootstrap } from '@storefront/testing';
import * as chai from 'chai';

bootstrap(chai, __dirname, [
  '../src/past-purchases/index.html',
  '../src/recommendations/index.html'
]);
