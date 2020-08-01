import fetchMethods from '../src/fetchMethods'
import chai from 'chai';
import { expect } from 'chai';
const spies = require('chai-spies');
chai.use(spies);

describe('FetchCall', function() {
  let fetchMethods;
  
  beforeEach(function() {
    global.window = () => {};
    chai.spy.on(window, 'fetchData', () => { })
  })
  
  it('should have a property of rootURL', function() {
    expect(fetchMethods.rootURL).to.equal("https://fe-apps.herokuapp.com/api/v1/overlook/1904/");
  })

});