import User from '../src/User'
import { expect } from 'chai';


describe('User', function () {
  it.only('should be a function', function() {
    expect(User).to.be.a('function');
  })  

});