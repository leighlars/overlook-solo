import Guest from '../src/guest';
import { expect } from "chai";

describe('Guest', function () {
  let user, guest, bookings, todaysDate;
  beforeEach(function() {
    todaysDate = "2020/04/22";
    user = { id: 1, name: "Leatha Ullrich" },
    bookings = [
      {
        id: "5fwrgu4i7k55hl6sz",
        userID: 1,
        date: "2020/04/25",
        roomNumber: 1,
        roomServiceCharges: [],
        roomType: "residential suite",
        bidet: true,
        bedSize: "queen",
        numBeds: 1,
        cost: 358.4,
      },
      {
        id: "5fwrgu4i7k55hl6t5",
        userID: 1,
        date: "2020/01/24",
        roomNumber: 2,
        roomServiceCharges: [],
        roomType: "suite",
        bidet: false,
        bedSize: "full",
        numBeds: 2,
        cost: 477.38,
      },
      {
        id: "5fwrgu4i7k55hl6t6",
        userID: 1,
        date: "2020/04/22",
        roomNumber: 3,
        roomServiceCharges: [],
        roomType: "single room",
        bidet: false,
        bedSize: "king",
        numBeds: 1,
        cost: 491.14,
      },
      {
        id: "5fwrgu4i7k55hl6t7",
        userID: 1,
        date: "2020/02/16",
        roomNumber: 4,
        roomServiceCharges: [],
        roomType: "single room",
        bidet: false,
        bedSize: "queen",
        numBeds: 1,
        cost: 429.44,
      }
    ]
    guest = new Guest(user, todaysDate);
    guest.allBookings = bookings;
  });
  
  it('should be a function', () => {
    expect(Guest).to.be.a('function');
  });
  
  it('should be an instance of Guest', () => {
    expect(guest).to.be.an.instanceOf(Guest);
  });

  it("should return an array of all bookings", () => {
    expect(guest.allBookings.length).to.deep.equal(4);
  });

  it('should return array of bookings with information from room data', () => {
    expect(guest.allBookings[0].cost).to.deep.equal(358.4);
  });

  it('should return the total spent on rooms', () => {
    expect(guest.getTotalMoneySpent()).to.equal('$1756.36');
  });

  it('should find booking by day', () => {
    expect(guest.getCurrentBooking(todaysDate)).to.deep.equal({
      id: "5fwrgu4i7k55hl6sz",
      userID: 1,
      date: "2020/04/22",
      roomNumber: 1,
      roomServiceCharges: [],
      roomType: "residential suite",
      bidet: true,
      bedSize: "queen",
      numBeds: 1,
      cost: 358.4,
    });
  });

  it('should return an array of past bookings', () => {
    expect(guest.getPastBookings(todaysDate)).to.deep.equal([
      {
        id: "5fwrgu4i7k55hl6t5",
        userID: 1,
        date: "2020/01/24",
        roomNumber: 2,
        roomServiceCharges: [],
        roomType: "suite",
        bidet: false,
        bedSize: "full",
        numBeds: 2,
        cost: 477.38,
      },
      {
        id: "5fwrgu4i7k55hl6t7",
        userID: 1,
        date: "2020/02/16",
        roomNumber: 4,
        roomServiceCharges: [],
        roomType: "single room",
        bidet: false,
        bedSize: "queen",
        numBeds: 1,
        cost: 429.44,
      },
    ]);
  });

  it('should return an array of upcoming bookings', () => {
    expect(guest.getUpcomingBookings(todaysDate)[0]).to.deep.equal({
      id: "5fwrgu4i7k55hl6sz",
      userID: 1,
      date: "2020/04/25",
      roomNumber: 1,
      roomServiceCharges: [],
      roomType: "residential suite",
      bidet: true,
      bedSize: "queen",
      numBeds: 1,
      cost: 358.4,
    });
  });

});
