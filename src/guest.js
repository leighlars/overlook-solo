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



  // I should be able to select a date for which I’d like to book a room for myself
  // Upon selecting a date, I should be shown a list of room details for only rooms that are available on that date
  // I should be able to filter the list of available rooms by their roomType property
  // I should be able to select a room for booking
  // In the event that no rooms are available for the date/roomType selected, display a message fiercely apologizing to the user and asking them to adjust their room search

}

export default Guest;