class Guest {
  constructor(guestDetails) {
    this.id = guestDetails.id;
    this.name = guestDetails.name;
    this.pastBookings = [];
    this.currentBooking = "";
    this.futureBookings = [];
  }


  // getTotalMoneySpent() {
  //   let allBookings = this.pastBookings.concat(this.futureBookings).push(this.currentBooking);
  //   return allBookings.reduce((totalSpent, booking) => {

  //   })
  // }

}

export default Guest;