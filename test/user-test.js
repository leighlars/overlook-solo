import User from '../src/User'
import { expect } from 'chai';


describe('User', function () {
  let user;
  beforeEach(function() {
    user = new User();
  });

  it('should be a function', function() {
    expect(User).to.be.a('function');
  });
  
  it('should be an instance of User', function() {
    expect(user).to.be.an.instanceOf(User);
  });

  

});