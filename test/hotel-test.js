import Hotel from '../src/Hotel'
import { expect } from 'chai';


describe('Hotel', function () {
  let hotel;
  beforeEach(function() {
    hotel = new Hotel('manager', 'overlook2020');
  });

  it('should be a function', function() {
    expect(Hotel).to.be.a('function');
  });
  
  it('should be an instance of Hotel', function() {
    expect(hotel).to.be.an.instanceOf(Hotel);
  });

  it('should have a name', function() {
    expect(hotel.userName).to.equal('manager');
  });

  it("should have a password", function () {
    expect(hotel.password).to.equal('overlook2020');
  });

  it('should be authenticated after log in', function () {
    hotel.authenticate();
    expect(hotel.isManager).to.equal(true);
  });

  it('should be authenticated after log in', function () {
    hotel.authenticate();
    expect(hotel.isAuthenticated).to.equal(true);
  });
  

});