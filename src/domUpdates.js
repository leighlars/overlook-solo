let domUpdates = {
  currentUser: null,
  todaysDate: null,
  overlook: null,

  defineData(user, todaysDate, overlook) {
    this.currentUser = user;
    this.todaysDate = todaysDate;
    this.overlook = overlook;
  },

  capitalize(words) {
    return words.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
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
  },

  viewGuestModal(guest) {
    document.querySelector('.guest-view').innerHTML = '';
    document.querySelector('.guest-view').style.display = 'flex';
    document.querySelector('.manager-view').style.opacity = .8;
    let guestModal = `<section class='guest-modal'>
          <h4 class='guest-name'>${guest.name}</h4>
          <p class='guest-total-spent'>Total Spent: ${guest.getTotalMoneySpent()}</p>
          <button class='guest-bookings-btns make-new' id='${guest.id}' id='guest-new-bookings'>Make New Reservation</button>
          <button class='guest-bookings-btns current-booking' id='${guest.id}'>Current Reservation</button>
          <button class='guest-bookings-btns future-bookings' id='${guest.id}'>Upcoming Reservations</button>
          <button class='guest-bookings-btns past-bookings' id='${guest.id}'>Past Reservations</button>
          </section>`;
    document.querySelector('.guest-view').insertAdjacentHTML('beforeend', guestModal);
  },

      
  // closeModal(guest) {
  // i want to exit the whole modal in manager dashboard, but not in user dashboard
  // },
  
  displayNewBookingForm() {
    document.querySelector(".guest-modal").innerHTML = "";
    document.querySelector(".manager-view").style.opacity = 0.8;
    document.querySelector(".guest-modal").insertAdjacentHTML('beforeend', `
        <span id='exit-btn-style'><button class="return-btn">Back</button><button class="exit-btn">X</button></span> 
        <h4>Current Reservation</h4>`);
    let formHTML = `
    <input type="date"></input>

    `;    
    // it'll need a calendar
    // a button list of room types to choose from
    // Allow customers to filter available rooms by cost (min/max), bed size, and/or number of beds
    // a button to post the new booking / add to users bookings arr
    // an alert if they've chosen an unavail room
    // 
  },
  
  displayBookingInfo(guest, type) {
    document.querySelector(".guest-modal").innerHTML = "";
    document.querySelector(".manager-view").style.opacity = 0.8;
    document.querySelector(".guest-modal").insertAdjacentHTML('beforeend', `
        <span id='exit-btn-style'><button class="return-btn">Back</button><button class="exit-btn">X</button></span> 
        <h4>${type} Reservations</h4>`);
    document.querySelector(".guest-modal").insertAdjacentHTML('beforeend', `<section class='booking-list'></section>`);
    let bookingInfo = guest.getBookingInfo(this.todaysDate, type);
    if (Array.isArray(bookingInfo)) {
      bookingInfo.forEach(booking => {
        this.createBookingHTML(booking);
      })
    } else {
      this.createBookingHTML(bookingInfo);
    }
  },

  createBookingHTML(bookingInfo) {
    const bookingHTML = `
      <section class='booking'>
         <h4 class='booking-date'>${bookingInfo.date}</h4>
         <p class='booking-room-num'>Room number: ${bookingInfo.roomNumber}</p>
         <p class='booking-room-type'>Room type: ${this.capitalize(bookingInfo.roomType)}</p>
         <p class='booking-bed-info'>Bed: ${bookingInfo.numBeds}, ${this.capitalize(bookingInfo.bedSize)}</p>
         <p class='booking-bidet-info'>Bidet: ${this.capitalize(String(bookingInfo.bidet))}</p>
         <p class='booking-room-cost'>Cost: $${bookingInfo.cost}</p>
      </section>`;     
    document.querySelector(".booking-list").insertAdjacentHTML('beforeend', bookingHTML);
  },


  displayUpcomingBookings(guest) {
    document.querySelector(".guest-modal").innerHTML = "";
    document.querySelector(".manager-view").style.opacity = 0.8;
    document.querySelector(".guest-modal").insertAdjacentHTML('beforeend', `
        <span id='exit-btn-style'><button class="return-btn">Back</button><button class="exit-btn">X</button></span> 
        <h4>Upcoming Reservations</h4>`);
    console.log(guest);   
    let upcomingBookings = guest.getUpcomingBookings(this.todaysDate);
    upcomingBookings.forEach(booking => {
      let futureHTML = `<section class='booking-view'>
            <h4 class='booking-date'>${booking.date}</h4>
            <p class='booking-room-num'>Room Number: ${booking.roomNumber}</p>
            <p class='booking-room-type'>Room Type: ${this.capitalize(booking.roomType)}</p>
            <p class='booking-bed-info'>Bed: ${booking.numBeds}, ${this.capitalize(booking.bedSize)}</p>
            <p class='booking-bidet-info'>Bidet: ${this.capitalize(booking.bidet)}</p>
            <p class='booking-room-cost'>Cost: $${booking.cost}</p>
            <button class='guest-bookings-btns' id='${booking.id}' id='guest-delete-bookings'>Delete Reservation</button>
            </section>`;
      document.querySelector(".guest-modal").insertAdjacentHTML('beforeend', futureHTML);
    })
    // prompt before delete?
  },

}

export default domUpdates;