import Hotel from '../src/Hotel'
import { expect } from 'chai';


describe('Hotel', function () {
  let hotel, rawData, todaysDate;
  beforeEach(function() {
    todaysDate = "2020/04/22";
    rawData = {
      userData: [
        { id: 1, name: "Leatha Ullrich" },
        { id: 2, name: "Rocio Schuster" },
        { id: 3, name: "Kelvin Schiller" },
        { id: 4, name: "Kennedi Emard" },
        { id: 5, name: "Rhiannon Little" },
      ],
      bookingsData: [
        {
          id: "5fwrgu4i7k55hl6sz",
          userID: 1,
          date: "2020/04/22",
          roomNumber: 1,
          roomServiceCharges: [],
        },
        {
          id: "5fwrgu4i7k55hl6t5",
          userID: 2,
          date: "2020/01/24",
          roomNumber: 2,
          roomServiceCharges: [],
        },
        {
          id: "5fwrgu4i7k55hl6t6",
          userID: 3,
          date: "2020/04/22",
          roomNumber: 3,
          roomServiceCharges: [],
        },
        {
          id: "5fwrgu4i7k55hl6t7",
          userID: 4,
          date: "2020/02/16",
          roomNumber: 4,
          roomServiceCharges: [],
        },
      ],
      roomsData: [
        {
          number: 1,
          roomType: "residential suite",
          bidet: true,
          bedSize: "queen",
          numBeds: 1,
          costPerNight: 358.4,
        },
        {
          number: 2,
          roomType: "suite",
          bidet: false,
          bedSize: "full",
          numBeds: 2,
          costPerNight: 477.38,
        },
        {
          number: 3,
          roomType: "single room",
          bidet: false,
          bedSize: "king",
          numBeds: 1,
          costPerNight: 491.14,
        },
        {
          number: 4,
          roomType: "single room",
          bidet: false,
          bedSize: "queen",
          numBeds: 1,
          costPerNight: 429.44,
        },
      ],
    };
    hotel = new Hotel(rawData, todaysDate);
  });

  it('should be a function', function() {
    expect(Hotel).to.be.a('function');
  });
  
  it('should be an instance of Hotel', function() {
    expect(hotel).to.be.an.instanceOf(Hotel);
  });

  it("should have rooms", function () {
    expect(hotel.rooms).to.deep.equal(rawData.roomsData);
  });

  it('should return array of bookings with cost of booking', function() {
    expect(hotel.bookings[0].cost).to.deep.equal(358.4);
  });
  
  it('should return instantiated users with appropriate bookings and cost of each booking', function() {
    expect(hotel.users[1]).to.deep.equal( 
      {
        id: 2,
        name: "Rocio Schuster",
        pastBookings: [],
        currentBooking: {},
        futureBookings: [],
        allBookings: [
          {
            id: "5fwrgu4i7k55hl6t5",
            userID: 2,
            date: "2020/01/24",
            room: 2,
            roomServiceCharges: [],
            cost: 477.38,
          }
        ],
      })
  });

  it('should return an array of all bookings for today', function() {
    expect(hotel.getAllTodaysBookings(todaysDate).length).to.deep.equal(2);
  })

  it('should return percentage of rooms booked for today', function() {
    expect(hotel.getTodaysBookedPercentage(todaysDate)).to.deep.equal("50%");
  });

  it("should return number of available rooms for today", function() {
    expect(hotel.getNumTodaysAvailability(rawData, todaysDate)).to.equal(2);
  });

  it('should return the total revenue for the day', function() {
    expect(hotel.getTodaysRevenue(todaysDate)).to.equal(849.54);
  });

  // it("should have a password", function () {
  //   expect(hotel.password).to.equal('overlook2020');
  // });

  // it('should be authenticated after log in', function () {
  //   hotel.authenticate();
  //   expect(hotel.isManager).to.equal(true);
  // });

  // it('should be authenticated after log in', function () {
  //   hotel.authenticate();
  //   expect(hotel.isAuthenticated).to.equal(true);
  // });

  // it("should have a name", function () {
  //   expect(hotel.userName).to.equal("manager");
  // });

  // it("should have a password", function () {
  //   expect(hotel.password).to.equal("overlook2020");
  // });

  // it("should be authenticated after log in", function () {
  //   hotel.authenticate();
  //   expect(hotel.isManager).to.equal(true);
  // });

  // it("should be authenticated after log in", function () {
  //   hotel.authenticate();
  //   expect(hotel.isAuthenticated).to.equal(true);
  // });
  

});