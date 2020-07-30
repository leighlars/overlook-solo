let domUpdates = {
  currentUser: null,
  todaysDate: null,
  userRepository: null,

  defineData(user, todaysDate, userRepository) {
    this.currentUser = user;
    this.todaysDate = todaysDate;
    this.userRepository = userRepository;
  },

  displayPage() {},

  displayGuestDashboard() {},

  displayManagerDashboard() {},
}

export default domUpdates;