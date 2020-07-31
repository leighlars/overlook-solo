// import Hotel from '../src/hotel';
class Guest {
  constructor(guestDetails, todaysDate) {
    this.id = guestDetails.id;
    this.name = guestDetails.name;
    this.allBookings;
    this.pastBookings;
    this.futureBookings;
  }
  // Any room bookings I have made (past or present/upcoming)

  getTotalMoneySpent() {
    let totalBookingsExpenditures = this.allBookings.reduce((totalSpent, booking) => {
      totalSpent += booking.cost;
      return totalSpent;
    }, 0).toFixed(2);
    return `$${totalBookingsExpenditures}`;
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
    return this.allBookings.filter(booking => booking.date  < todaysDate);
  }

  getUpcomingBookings(todaysDate) {
    return this.allBookings.filter(booking => booking.date > todaysDate);
  }



// I should be able to select a date for which I’d like to book a room for myself
// Upon selecting a date, I should be shown a list of room details for only rooms that are available on that date
// I should be able to filter the list of available rooms by their roomType property
// I should be able to select a room for booking
// In the event that no rooms are available for the date/roomType selected, display a message fiercely apologizing to the user and asking them to adjust their room search

}

export default Guest;