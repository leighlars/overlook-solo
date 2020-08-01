let domUpdates = {
  currentUser: null,
  todaysDate: null,
  overlook: null,
  tagsSelected: [],

  defineData(user, todaysDate, overlook) {
    this.currentUser = user;
    this.todaysDate = todaysDate;
    this.overlook = overlook;
  },

  capitalize(words) {
    return words.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  },
  
  /// MANAGER DASH
  displayManagerDashboard() {
    document.querySelector('.login-view').style.display = 'none';
    document.querySelector('.manager-view').style.display = 'flex';
    let mgrQuickView = `<article class='mgr-quick-view'>
          <div class='mgr-stats'>
            <p id='open-rooms'>${this.overlook.getNumTodaysAvailability(this.todaysDate)}</p>
            <p id='booked-rooms'>${this.overlook.getTodaysBookedPercentage(this.todaysDate)}</p>
            <p id='revenue'>${this.overlook.getTodaysRevenue(this.todaysDate)}</p> 
          </div>
        <div class='search-bar'>
          <input type='text' class='inputs' id='search-guest-input' placeholder='Search Guest Name' maxlength='70' minlength='0'>
          <button class='mgr-search-btn'>Find</button>
          <button class='clear-text-btn'>Clear</button>
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
    document.querySelector(".guest-view").insertAdjacentHTML('beforeend', `<section class='guest-modal'></section>`);
    this.createGuestHomeHTML(guest);
  },

  createGuestHomeHTML(guest) {
    document.querySelector('.guest-modal').innerHTML = '';
    let guestHome = `
          <h4 class='guest-name'>${guest.name}</h4>
          <p class='guest-total-spent'>Total Spent: ${guest.getTotalMoneySpent()}</p>
          <button class='guest-bookings-btns new-booking-form' id='${guest.id}'>Make New Reservation</button>
          <button class='guest-bookings-btns current-booking' id='${guest.id}'>Current Reservation</button>
          <button class='guest-bookings-btns future-bookings' id='${guest.id}'>Upcoming Reservations</button>
          <button class='guest-bookings-btns past-bookings' id='${guest.id}'>Past Reservations</button>
        `;
    document.querySelector('.guest-modal').insertAdjacentHTML('beforeend', guestHome);
  },

      
  // closeModal(guest) {
  // i want to exit the whole modal in manager dashboard, but not in user dashboard
  // },
  
  displayNewBookingForm(guest) {
    document.querySelector(".guest-modal").innerHTML = '';
    document.querySelector(".guest-modal").insertAdjacentHTML('beforeend', `
        <span id='exit-btn-style'><button class="return-btn" id='${guest.id}'>Back</button><button class="exit-btn">X</button></span> 
        <h4>Make New Reservation</h4>`);
    let formHTML = `<form class='booking-form'>
                        <input type='date' class='date-input' min='2020/08/5' max="2021-08-30"></input>
                        <label for='price' class='cost-label'>Choose a maximum room price:</label>
                        <input type="range" class='price-input' name="price" id="price" min="170" max="500" step="25" value="500">
                        <output class="price-output" for="price"></output>
                        <div class='tag-list'></div>
                        <button class='guest-bookings-btns search-reservations' id='${guest.id}'>Search Rooms</button>     
                      </form>`;
    document.querySelector('.guest-modal').insertAdjacentHTML('beforeend', formHTML);
    const price = document.querySelector("#price");
    const output = document.querySelector(".price-output");
    output.textContent = price.value;
    price.addEventListener("input", () => output.textContent = price.value);
    this.createTagHTML();
  },

  toggleTagButton() {
    let tag = event.target.id;
    let tagButton = event.target.closest(".tag-btn");
    if (!tagButton.classList.contains("active")) {
      tagButton.classList.add("active");
      this.tagsSelected.push(tag);
    } else {
      tagButton.classList.remove("active");
      let i = this.tagsSelected.indexOf(tag);
      this.tagsSelected.splice(i, 1);
    }
  },


  
  createTagHTML() {
    let tagHTML = `
      <div class='tag-box box-type'><p class='tag-prompt'>Filter Tags By Type:</p>
        <button class='tag-btn' id='single' id='type-tag'>Single Room</button>
        <button class='tag-btn' id='junior' id='type-tag' >Junior Suite</button>
        <button class='tag-btn' id='suite' id='type-tag'>Suite</button>
        <button class='tag-btn' id='residential' id='type-tag'>Residential Suite</button>
      </div>
      <div class='tag-box box-numBeds'><p class='tag-prompt'>Filter Tags By Number of Beds:</p>
        <button class='tag-btn' id='1'>1</button>
        <button class='tag-btn' id='2'>2</button>
      </div>
      <div class='tag-box box-bedSize'><p class='tag-prompt'>Filter Tags By Bed Size:</p>
        <button class='tag-btn' id='king'>King</button>
        <button class='tag-btn' id='queen'>Queen</button>
        <button class='tag-btn' id='full'>Full</button>
        <button class='tag-btn' id='twin'>Twin</button>
      </div>`;
    document.querySelector('.tag-list').insertAdjacentHTML('beforeend', tagHTML);
  },

  
  displayBookingInfo(guest, type) {
    document.querySelector('.guest-modal').innerHTML = "";
    document.querySelector('.manager-view').style.opacity = 0.8;
    document.querySelector('.guest-modal').insertAdjacentHTML('beforeend', `
        <span id='exit-btn-style'><button class="return-btn" id=${guest.id}>Back</button><button class="exit-btn">X</button></span> 
        <h4>${type} Reservations</h4>`);
    document.querySelector('.guest-modal').insertAdjacentHTML('beforeend', `<section class='booking-list'></section>`);
    let bookingInfo = guest.getBookingInfo(this.todaysDate, type);
    if (Array.isArray(bookingInfo)) {
      bookingInfo.forEach(booking => {
        this.createBookingHTML(booking);
      })
    } else {
      this.createBookingHTML(bookingInfo);
    }
    if (type === 'Upcoming') {
      this.addDeleteButtonToHTML(bookingInfo);
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


  addDeleteButtonToHTML(bookingInfo) {
    document.querySelectorAll(".booking").forEach(element => {
      element.insertAdjacentHTML('beforeend', 
        `<button class='guest-bookings-btns' id='${bookingInfo.id}' id='guest-delete-bookings'>Delete Reservation</button>`);
    })
  }
  
}

export default domUpdates;