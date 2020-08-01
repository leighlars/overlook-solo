// import User from '../src/user';
class Guest {
  constructor(guestDetails, todaysDate) {
    // super(id, name)
    this.id = guestDetails.id;
    this.name = guestDetails.name;
    this.allBookings;
    this.pastBookings;
    this.futureBookings;
  }

  getTotalMoneySpent() {
    let totalBookingsExpenditures = this.allBookings.reduce((totalSpent, booking) => {
      totalSpent += booking.cost;
      return totalSpent;
    }, 0).toFixed(2);
    return `$${totalBookingsExpenditures}`;
  }

  getBookingInfo(todaysDate, type) {
    if (type === 'Current') {
      return this.getCurrentBooking(todaysDate);
    }
    if (type === 'Past') {
      return this.getPastBookings(todaysDate);
    }
    if (type === 'Upcoming') {
      return this.getUpcomingBookings(todaysDate);
    }
  }


  getCurrentBooking(todaysDate) {
    let currentBooking = this.allBookings.find(booking => booking.date = todaysDate);
    if (currentBooking) {
      return currentBooking;
    } else {
      return "You're not booked with us today. Add a new reservation to get started."
    }
  }

  getPastBookings(todaysDate) {
    let pastBookings = this.allBookings.filter(booking => booking.date  < todaysDate);
    return pastBookings.sort((a, b) => {
      if (a.date < b.date) {
        return 1
      }
      if (a.date > b.date) {
        return -1
      }
      return 0;
    })
  }

  getUpcomingBookings(todaysDate) {
    let futureBookings = this.allBookings.filter(booking => booking.date > todaysDate);
    return futureBookings.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      }
      if (a.date > b.date) {
        return -1;
      }
      return 0;
    });
  }

}

export default Guest;