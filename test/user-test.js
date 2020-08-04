import User from '../src/user'
import {expect} from 'chai'

describe('User', () => {
  let userDetails = {name: 'Bob', id: 1};
  let user = new User(userDetails);
  it('should have a name', () => {
    expect(user.name).to.equal('Bob');
  });

  it('should have an id', () => {
    expect(user.id).to.equal(1);
  })


})