import Guest from './guest';

class Hotel {
  constructor(rawData, todaysDate) {
    // this.userName = userName;
    // this.password = pwd;
    // this.isAuthenticated = false;
    // this.isManager = false;
    this.users = this.matchDataWithUsers(rawData, todaysDate);
    this.rooms = rawData.roomData;
    this.bookings;
  }

  matchDataWithUsers(rawData, todaysDate) {
    let instantiatedUsers = rawData.userData.map(rawUser => new Guest(rawUser, todaysDate));
    this.matchBookingsWithUser(instantiatedUsers, rawData.bookingsData);
    return instantiatedUsers;
  }

  matchBookingsWithUser(users, rawBookingsData) {
    users.forEach((user) => {
      user.allBookings = rawBookingsData.filter(bookingsDataPoint => bookingsDataPoint.userID === user.id);
    });
  }


  // authenticate() {
  //   if (this.password === 'overlook2020') {
  //     this.isAuthenticated = true;
  //   }
  //   if (this.userName === 'manager') {
  //     this.isManager = true;
  //   }
  //   if (Number(this.userName.slice(-2)) <= 50) {
  //     this.isAuthenticated = true;
  //   }
  // }




}

export default Hotel;