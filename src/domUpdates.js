let domUpdates = {
  currentUser: null,
  todaysDate: null,
  overlook: null,

  defineData(user, todaysDate, overlook) {
    this.currentUser = user;
    this.todaysDate = todaysDate;
    this.overlook = overlook;
  },
  
  /// MANAGER DASH
  displayManagerDashboard() {
    document.querySelector(".login-view").style.display = "none";
    document.querySelector('.manager-view').style.display = "flex";
    let mgrQuickView = `<article class='mgr-quick-view'>
          <div class='mgr-stats'>
            <p id="open-rooms">${this.overlook.getNumTodaysAvailability(this.todaysDate)}</p>
            <p id="booked-rooms">${this.overlook.getTodaysBookedPercentage(this.todaysDate)}</p>
            <p id="revenue">${this.overlook.getTodaysRevenue(this.todaysDate)}</p> 
          </div>
        <div class="search-bar">
          <input type="text" class="inputs" id="search-guest-input" placeholder="Search Guest Name" maxlength="70" minlength="0">
          <button class="mgr-search-btn">Find</button>
          <button class="clear-text-btn">Clear</button>
        </div>
      </article>
        <section class='known-guests'>
        </section>`;
    document.querySelector(".manager-view").insertAdjacentHTML('beforeend', mgrQuickView); 
  },

  displayKnownGuests(input) {
    document.querySelector('.known-guests').style.display = "flex";
    document.querySelector('.known-guests').innerHTML = "";
    this.overlook.getGuestsByName(input).forEach(guest => {
      let cardHTML = `<div class='guest-card' id=${guest.id}>
            <h4 class='mgr-guest-name'>${guest.name}</h4>
            <p>Total Spent: ${guest.getTotalMoneySpent()}</p>
            <button class='expand-found-guest-btn' id=${guest.id}>Reservations</button>
          </div>`;
      document.querySelector(".known-guests").insertAdjacentHTML('beforeend', cardHTML);
    })
  },
  
  //// GUEST DASH

  displayGuestDashboard(guest) {
    document.querySelector('.login-view').style.display = "none";
    this.viewGuestModal(guest);
    // document.getElementById('guest-delete-bookings').style.display = "none"; // not working, need to delete for guest view so they can't delete 
    // not sure why they can't delete their own booking tho. sounds silly. 
  },

  viewGuestModal(guest) {
    document.querySelector('.guest-view').innerHTML = '';
    document.querySelector('.guest-view').style.display = 'flex';
    document.querySelector('.manager-view').style.opacity = .8;
    let guestModal = `<section class='guest-modal'>
          <span id='exit-btn-style'><button class="exit-btn">X</button></span>
          <h4 class='guest-name'>${guest.name}</h4>
          <p class='guest-total-spent'>Total Spent: ${guest.getTotalMoneySpent()}</p>
          <button class='guest-bookings-btns make-new' id='${guest.id}' id='guest-new-bookings'>Make New Reservation</button>
          <button class='guest-bookings-btns current-booking' id='${guest.id}'>Current Reservation</button>
          <button class='guest-bookings-btns future-bookings' id='${guest.id}'>Upcoming Reservations</button>
          <button class='guest-bookings-btns past-bookings' id='${guest.id}'>Past Reservations</button>
          </section>`;
    document.querySelector('.guest-view').insertAdjacentHTML('beforeend', guestModal);
  },
      
  closeModal() {
    document.querySelector(".guest-modal").style.display = 'none';
    document.querySelector(".manager-view").style.opacity = 1;
  },
  // ^^ issue w closing modal on log in view. do i want a close or not?
  
  displayNewBookingForm() {
    // `<span id='exit-btn-style'><button class="exit-btn">X</button></span>`
    // it'll need a calendar
    // a button list of room types to choose from
    // Allow customers to filter available rooms by cost (min/max), bed size, and/or number of beds
    // a button to post the new booking / add to users bookings arr
    // an alert if they've chosen an unavail room
    // 
  },
  
  displayCurrentBooking(guest) {
    console.log(guest);
    document.querySelector(".guest-modal").innerHTML = "";
    document.querySelector(".manager-view").style.opacity = 0.8;
    // document.querySelector(".guest-view").style.display = "flex";
    let currentBooking = this.currentUser.getCurrentBooking(this.todaysDate);
    let currentHTML = `<section class='guest-modal'>
          <span id='exit-btn-style'><button class="exit-btn">X</button></span>
          <h4 class='booking-date'>${currentBooking.date}</h4>
          <p class='booking-room-num'>Room number: ${currentBooking.roomNumber}</p>
          <p class='booking-room-type'>Room type: ${currentBooking.roomType}</p>
          <p class='booking-bed-info'>Bed: ${currentBooking.numBeds}, ${currentBooking.bedSize}</p>
          <p class='booking-bidet-info'>Bidet: ${currentBooking.bidet}</p>
          <p class='booking-room-cost'>Cost: $${currentBooking.cost}</p>
          </section>`;
    document.querySelector(".guest-modal").insertAdjacentHTML('beforeend', currentHTML);
  },
  // ^^ need to tweak styling in scss
  
  displayUpcomingBookings() {
    document.querySelector(".guest-modal").innerHTML = "";
    // document.querySelector(".guest-view").style.display = "flex";
    document.querySelector(".manager-view").style.opacity = 0.8;
    let upcomingBookings = this.currentUser.getUpcomingBookings(this.todaysDate);
    upcomingBookings.forEach(booking => {
      let futureHTML = `<section class='guest-modal'>
            <span id='exit-btn-style'><button class="exit-btn">X</button></span>
            <h4 class='booking-date'>${booking.date}</h4>
            <p class='booking-room-num'>Room number: ${booking.roomNumber}</p>
            <p class='booking-room-type'>Room type: ${booking.roomType}</p>
            <p class='booking-bed-info'>Bed: ${booking.numBeds}, ${booking.bedSize}</p>
            <p class='booking-bidet-info'>Bidet: ${booking.bidet}</p>
            <p class='booking-room-cost'>Cost: $${booking.cost}</p>
            // <button class='guest-bookings-btns' id='${booking.id}' id='guest-delete-bookings'>Delete Reservation</button> add to future bookings view?
            </section>`;
      document.querySelector(".guest-modal").insertAdjacentHTML('beforeend', futureHTML);
    })
    // prompt before delete?
  },

  displayPastBookings() {
    document.querySelector(".guest-modal").innerHTML = "";
    document.querySelector(".guest-view").style.display = "flex";
    document.querySelector(".manager-view").style.opacity = 0.8;
    let pastBookings = this.currentUser.getPastBookings(todaysDate);
    // access user's past bookings and map over them to get info except for user id and booking id
    // for each booking, create html and add it to dom
    // display this info in table?
    // will need scroll
    document.querySelector(".guest-modal").insertAdjacentHTML('beforeend', pastHTML);
  }



}

export default domUpdates;