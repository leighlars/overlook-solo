import Guest from './guest';
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

  // filterRoomsByTags([roomType], [bedSize], [numBeds], [cost]) {
  //   // loop over roomsData, if 
  // }
  // Allow customers to filter available rooms by cost (min/max), bed size, and/or number of beds

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
    return rawData.bookingsData.reduce((bookingCost, booking) => {
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

  // move methods below to manager

  getAllTodaysBookings(todaysDate) {
    return this.bookings.filter(booking => booking.date === todaysDate);
  }

  // findTodaysAvailableRooms(todaysDate) {
  //   return this.rooms.filter(room => ! )
  // }

  getNumTodaysAvailability (rawData, todaysDate) {
    let numberAvailable = this.rooms.length - this.getAllTodaysBookings(todaysDate).length;
    return `Available lodging: ${numberAvailable} rooms`
  }
 
  getTodaysBookedPercentage(todaysDate) {
    let bookedRooms = this.getAllTodaysBookings(todaysDate);
    if (bookedRooms.length > 0) {
      let difference = this.rooms.length - bookedRooms.length;
      let percentage = (difference / this.rooms.length) * 100;
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