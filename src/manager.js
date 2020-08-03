import User from '../src/user'

class Manager extends User {
  constructor(userName, password) {
    super(userName, password);
    this.userName = 'manager';
    this.password = 'overlook2020';
  }

  getAllTodaysBookings(todaysDate) {
    return this.bookings.filter(booking => booking.date === todaysDate);
  }

  getNumTodaysAvailability(todaysDate) {
    let numberAvailable = this.rooms.length - this.getAllTodaysBookings(todaysDate).length;
    return `Available lodging: ${numberAvailable} rooms`
  }

  getTodaysBookedPercentage(todaysDate) {
    let bookedRooms = this.getAllTodaysBookings(todaysDate);
    if (bookedRooms.length > 0) {
      let percentage = (bookedRooms.length / this.rooms.length) * 100;
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

export default Manager;