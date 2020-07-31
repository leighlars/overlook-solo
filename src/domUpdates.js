let domUpdates = {
  currentUser: null,
  todaysDate: null,
  overlook: null,

  defineData(user, todaysDate, overlook) {
    // console.log()
    this.currentUser = user;
    this.todaysDate = todaysDate;
    this.overlook = overlook;
  },
  
  displayManagerDashboard() {
    document.querySelector(".login-view").style.display = "none";
    document.querySelector('.manager-view').style.display = "flex";
    document.getElementById('open-rooms').innerText = this.overlook.getNumTodaysAvailability(this.todaysDate);
    document.getElementById('booked-rooms').innerText = this.overlook.getTodaysBookedPercentage(this.todaysDate);
    document.getElementById('revenue').innerText = this.overlook.getTodaysRevenue(this.todaysDate);
  },

  displayKnownGuests(input) {
    document.querySelector('.known-guests').style.display = "flex";
    document.querySelector('.known-guests').innerHTML = "";
    this.overlook.getGuestsByName(input).forEach(guest => {
      let cardHTML = `<div class='guest-card' id=${guest.id}>
            <h4 class='mgr-guest-name'>${guest.name}</h4>
            <p>Total Spent: ${guest.getTotalMoneySpent()}</p>
            <button class='expand-found-guest-btn'>Reservations</button>
          </div>`;
      document.querySelector(".known-guests").insertAdjacentHTML('beforeend', cardHTML);
    })
    

  },
  
  displayGuestDashboard() {
    document.querySelector('.login-view').style.display = "none";
    document.querySelector('.guest-view').style.display = "flex";
    document.querySelector('.guest-name').innerText = this.currentUser.name;
    document.querySelector('.guest-total-spent').innerText = this.currentUser.getTotalMoneySpent();
  },




}

export default domUpdates;