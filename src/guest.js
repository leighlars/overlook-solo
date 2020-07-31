// import Hotel from '../src/hotel';
class Guest {
  constructor(guestDetails, todaysDate) {
    this.id = guestDetails.id;
    this.name = guestDetails.name;
    this.allBookings;
    this.pastBookings;
    this.currentBooking;
    this.futureBookings;
  }
  // Any room bookings I have made (past or present/upcoming)


  // The total amount I have spent on rooms
  getTotalMoneySpent() {
    let totalBookingsExpenditures = this.allBookings.reduce((totalSpent, booking) => {
      totalSpent += booking.cost;
      return totalSpent;
    }, 0).toFixed(2);
    return `$${totalBookingsExpenditures}`;
  }

  getPastBookings(todaysDate) {

    // i need to loop over bookings
    // if any booking date is older than today
    // make an arr of those dates
    // doable w filter
  }

  getUpcomingBookings(todaysDate) {
     // i need to loop over bookings
    // if any booking date is younger? than today
    // make an arr of those dates
    // doable w filter
  }

  getCurrentBooking(todaysDate) {
    return this.allBookings.find(booking => booking.date = todaysDate);
  }


// I should be able to select a date for which I’d like to book a room for myself
// Upon selecting a date, I should be shown a list of room details for only rooms that are available on that date
// I should be able to filter the list of available rooms by their roomType property
// I should be able to select a room for booking
// In the event that no rooms are available for the date/roomType selected, display a message fiercely apologizing to the user and asking them to adjust their room search

}

export default Guest;