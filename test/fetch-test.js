import fetchMethods from '../src/fetchMethods';
import chai from 'chai';
import { expect } from 'chai';
const spies = require('chai-spies');
chai.use(spies);

describe('fetchMethods', function() {
  let fetchMethods;
  
  beforeEach(function() {
    fetchMethods = {};
    global.window = () => {};
    chai.spy.on(window, 'fetchData', () => {});
    chai.spy.on(window, 'deleteBooking', () => {});
    chai.spy.on(window, 'postNewBooking', () => {});
  })
  
  it.skip('should have a property of rootURL', function() {
    expect(fetchMethods.rootURL).to.equal("https://fe-apps.herokuapp.com/api/v1/overlook/1904/");
  });

  it.skip('should execute to fetch all data', () => {
    fetchMethods.fetchData();
    expect(window.fetchData).to.have.been.called(1);
  });

  it.skip('should execute to delete booking', () => {
    fetchMethods.deleteBooking(deletedBooking);
    expect(window.deleteBooking).to.have.been.called(1);
  });

  it.skip('should execute to delete booking', () => {
    fetchMethods.postNewBooking(newBooking);
    expect(window.fetchMethods.postNewBooking).to.have.been.called(1);
  });

});