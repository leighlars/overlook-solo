import Guest from './guest';
// import { raw } from 'file-loader';
// import User from './user';

class Hotel {
  constructor(rawData, todaysDate) {
    this.isAuthenticated;
    this.isManager;
    this.username = 'manager' || null;
    this.password = 'overlook2020';
    this.rooms = rawData.roomsData;
    this.bookings = this.matchBookingsInfoFromRooms(rawData);
    this.users = this.matchDataWithUsers(rawData, todaysDate);
  }

  getUserID(userName) {
    let checkUserID = userName.substring(userName.length - 2).split("");
    let makeNums = checkUserID.map((char) => Number(char));
    let idNum = makeNums.filter((char) => !isNaN(char)).join("");
    return idNum - 1;
  }

  authenticate(userName, password) {
    let idNum = this.getUserID(userName);
    if (password === "overlook2020" && userName === "manager") {
      this.isAuthenticated = true;
      this.isManager = true;

    } else if ((userName.includes('customer') &&  (idNum <= 50 && idNum > -1)) && (password === 'overlook2020')) {
      this.isAuthenticated = true;
      this.isManager = false;

    } else {
      alert("Incorrect username and/or password. Please try again.");
    }
  }
  
  matchBookingsInfoFromRooms(rawData) {
    let noNulls = rawData.bookingsData.filter(booking => booking.roomNumber !== null);
    return noNulls.reduce((bookingCost, booking) => {
      let obj = {};
      obj.id = booking.id;
      obj.userID = booking.userID;
      obj.date = booking.date;
      obj.roomNumber = booking.roomNumber;
      obj.roomType = rawData.roomsData.find(room => room.number === booking.roomNumber).roomType;
      obj.bidet = rawData.roomsData.find(room => room.number === booking.roomNumber).bidet;
      obj.bedSize = rawData.roomsData.find(room => room.number === booking.roomNumber).bedSize;
      obj.numBeds = rawData.roomsData.find(room => room.number === booking.roomNumber).numBeds;
      obj.cost = rawData.roomsData.find(room => room.number === booking.roomNumber).costPerNight;
      obj.roomServiceCharges = booking.roomServiceCharges;
      bookingCost.push(obj);
      return bookingCost;
    }, []);
  }

  matchDataWithUsers(rawData, todaysDate) {
    let instantiatedUsers = rawData.userData.map(rawUser => new Guest(rawUser, todaysDate));
    this.matchBookingsWithUser(instantiatedUsers, rawData);
    return instantiatedUsers;
  }
  
  matchBookingsWithUser(users, rawData) {
    users.forEach((user) => {
      user.allBookings = this.matchBookingsInfoFromRooms(rawData).filter(booking => booking.userID === user.id);
    });
  }

  filterRoomsByTags(date, maxCost, tags) {
    let bookingsOnDay = this.bookings.filter(booking => booking.date === date).map(booking => booking.roomNumber); 
    let expensiveRooms = this.rooms.filter(room => room.costPerNight > maxCost).map(room => room.number);
    let allUnavailable = bookingsOnDay.concat(expensiveRooms);
    let availableRooms = this.rooms.filter(room => !allUnavailable.includes(room.number));
    if (tags.length > 0) {
      availableRooms = this.filterByTags(availableRooms, tags);
    }
    return availableRooms.sort((a, b) => a.costPerNight - b.costPerNight);
  }

  filterByTags(availableRooms, tags) {
    return availableRooms.filter((room) => {
      let matchesRoomType = tags.some((tag) => {
        return tag === room.roomType;
      });
      return matchesRoomType;
    });
  }

  // move methods below to manager

  getAllTodaysBookings(todaysDate) {
    return this.bookings.filter(booking => booking.date === todaysDate);
  }

  getNumTodaysAvailability (todaysDate) {
    let numberAvailable = this.rooms.length - this.getAllTodaysBookings(todaysDate).length;
    return `Available lodging: ${numberAvailable} rooms`
  }
 
  getTodaysBookedPercentage(todaysDate) {
    let bookedRooms = this.getAllTodaysBookings(todaysDate);
    if (bookedRooms.length > 0) {
      let percentage = ((bookedRooms.length / this.rooms.length) * 100).toFixed(0);
      return `Occupied lodging: ${percentage}%`;
    } else {
      return `Occupied lodging: 0%`;
    }
  }

  getTodaysRevenue(todaysDate) {
    let todaysBookings = this.getAllTodaysBookings(todaysDate);
    let revenue = todaysBookings.reduce((totalRevenue, booking) => {
      totalRevenue += Number(booking.cost);
      return totalRevenue;
    }, 0).toFixed(2);
    return `Today's Revenue: $${revenue}`;
  }

  getGuestsByName(input) {
    let capFirstLtr = input.charAt(0).toUpperCase() + input.slice(1);
    return this.users.filter(user => user.name.includes(capFirstLtr));
  }


}

export default Hotel;