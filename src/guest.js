class Guest {
  constructor(guestDetails, todaysDate) {
    this.id = guestDetails.id;
    this.name = guestDetails.name;
    this.allBookings;
    this.pastBookings = [];
    this.currentBooking = {};
    this.futureBookings = [];
  }



  // getTotalMoneySpent() {
  //   let allBookings = this.pastBookings.concat(this.futureBookings).push(this.currentBooking);
  //   return allBookings.reduce((totalSpent, booking) => {
  //   })
  // }

// Any room bookings I have made (past or present/upcoming)
// The total amount I have spent on rooms
// I should be able to select a date for which I’d like to book a room for myself
// Upon selecting a date, I should be shown a list of room details for only rooms that are available on that date
// I should be able to filter the list of available rooms by their roomType property
// I should be able to select a room for booking
// In the event that no rooms are available for the date/roomType selected, display a message fiercely apologizing to the user and asking them to adjust their room search

}

export default Guest;