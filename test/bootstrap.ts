import * as chai from 'chai';
import * as mock from 'mock-require';
import * as sinonChai from 'sinon-chai';

chai.use(sinonChai);

mock('../src/recommendations/index.html', {});
mock('../src/recommendations/index.css', {});
