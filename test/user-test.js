import User from '../src/User'
import { expect } from 'chai';


describe('User', function () {
  let user;
  beforeEach(function() {
    user = new User('manager', 'overlook2020');
  });

  it('should be a function', function() {
    expect(User).to.be.a('function');
  });
  
  it('should be an instance of User', function() {
    expect(user).to.be.an.instanceOf(User);
  });

  it('should have a username', function() {
    expect(user.userName).to.equal('manager');
  });

  it("should have a password", function () {
    expect(user.password).to.equal("overlook2020");
  });

  it("should be authenticated after log in", function () {
    user.authenticate();
    expect(user.isManager).to.equal(true);
  });
  

});