import User from './hotel';

class Manager extends User {
  constructor(username, pwd, bookings) {
    super(username, pwd, true, true);
    this.id = 1;
    this.userBookings = bookings;
  }
}

export default Manager;

// I should be able to search for any user by name and:
// View their name, a list of all of their bookings, and the total amount they’ve spent
// Add a room booking for that user
// Delete any upcoming room bookings for that user (they cannot delete a booking from the past)