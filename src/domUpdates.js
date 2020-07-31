let domUpdates = {
  currentUser: null,
  todaysDate: null,
  overlook: null,

  defineData(user, todaysDate, overlook) {
    console.log(user);
    this.currentUser = user;
    this.todaysDate = todaysDate;
    this.overlook = overlook;
    console.log(this.currentUser);
  },

  displayGuestDashboard() {
    document.querySelector('.login-view').style.display = "none";
    document.querySelector('.guest-view').style.display = "flex";
    document.querySelector('.guest-name').innerText = this.currentUser.name;
    document.querySelector('.guest-total-spent').innerText = `Total Spent: ${this.currentUser.getTotalMoneySpent()}`;
  },

  displayManagerDashboard() {
    document.querySelector(".login-view").style.display = "none";
    document.querySelector('.manager-view').style.display = "flex";
    document.getElementById('open-rooms').innerText = this.overlook.getNumTodaysAvailability(this.todaysDate);
    document.getElementById('booked-rooms').innerText = this.overlook.getTodaysBookedPercentage(this.todaysDate);
    document.getElementById('revenue').innerText = this.overlook.getTodaysRevenue(this.todaysDate);
  },



}

export default domUpdates;