import Guest from './guest';

class Hotel {
  constructor(rawData, todaysDate) {
    this.isAuthenticated;
    this.isManager;
    this.rooms = rawData.roomsData;
    this.bookings = this.getBookingsCost(rawData);
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
    } else if ((userName.includes('customer') &&  (idNum <= 50 && idNum > 0)) && (password === 'overlook2020')) {
      this.isAuthenticated = true;
      this.isManager = false;
    } else {
      alert("Incorrect username and/or password. Please try again.");
    }
  }
  
  getBookingsCost(rawData) {
    return rawData.bookingsData.reduce((bookingCost, booking) => {
      let obj = {};
      obj.id = booking.id;
      obj.userID = booking.userID;
      obj.date = booking.date;
      obj.room = booking.roomNumber;
      obj.roomServiceCharges = booking.roomServiceCharges;
      obj.cost = rawData.roomsData.find(room => room.number === booking.roomNumber).costPerNight;
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
      user.allBookings = this.getBookingsCost(rawData).filter(booking => booking.userID === user.id);
    });
  }

  getAllTodaysBookings(todaysDate) {
    return this.bookings.filter(booking => booking.date === todaysDate);
  }

  // findTodaysAvailableRooms(todaysDate) {
  //   return this.rooms.filter(room => ! )
  // }
 
  getTodaysBookedPercentage(todaysDate) {
    let bookedRooms = this.getAllTodaysBookings(todaysDate);
    let difference = this.rooms.length - bookedRooms.length;
    let percentage = (difference / this.rooms.length) * 100;
    return `${percentage}%`;
  }

  getNumTodaysAvailability (rawData, todaysDate) {
    return this.rooms.length - this.getAllTodaysBookings(todaysDate).length;
  }

  getTodaysRevenue(todaysDate) {
    let todaysBookings = this.getAllTodaysBookings(todaysDate);
    return todaysBookings.reduce((totalRevenue, booking) => {
      totalRevenue += Number(booking.cost);
      return totalRevenue;
    }, 0);
  }





}

export default Hotel;