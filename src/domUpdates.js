import moment from 'moment';

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

  closeModal() {
    document.querySelector(".guest-view").style.display = "none";
    document.querySelector(".manager-view").style.opacity = 1;
  },
  
  addManagerButtons() {
    this.overlook.isManager ? document.querySelector("#exit-btn-style").insertAdjacentHTML('beforeend', `<button class="exit-btn">Main Menu</button>`) : null;
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
          <input type='text' class='input' id='search-guest-input' placeholder='Search Guest Name' maxlength='70' minlength='0'>
          <button class='mgr-search-btn'>Find</button>
          <button class='clear-text-btn'>Clear</button>
        </div>
      </article>
      <section class='known-guests'></section>`;
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
    if (this.overlook.isManager) {
      document.querySelector(".guest-modal").insertAdjacentHTML('beforeend', `
          <span id='exit-btn-style'><button class="exit-btn">X</button></span>`); 
    }
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

  
  // ADD NEW BOOKING FORM

  displayNewBookingForm(guest) {
    document.querySelector(".guest-modal").innerHTML = '';
    document.querySelector(".guest-modal").insertAdjacentHTML('beforeend', `
        <span id='exit-btn-style'><button class="return-btn" id='${guest.id}'>Main Menu</button></span> 
        <h4>Make New Reservation</h4>`);
    // this.addManagerButtons();
    let formHTML = `<form class='booking-form'>
                        <input type='date' class='date-input' min='2020/08/05' max="2021/08/30" required></input>
                        <label for='price' class='cost-label'>Slide to set maximum room price:</label>
                        <input type="range" class='price-input' name="price" id="price" min="170" max="500" step="25" value="300">
                        <output class="price-output" for="price"></output>
                        <div class='tag-list'></div>
                        <button type='submit' class='guest-bookings-btns search-reservations-btn' aria-label='submit-search-form' id='${guest.id}'>Search Rooms</button>     
                      </form>`;
    document.querySelector('.guest-modal').insertAdjacentHTML('beforeend', formHTML);
    const price = document.querySelector("#price");
    const output = document.querySelector(".price-output");
    price.addEventListener("input", () => output.textContent = `$${price.value}`);
    this.createTagHTML();
  },

  createTagHTML() {
    let tagHTML = `
      <div class='tag-box box-type'><p class='tag-prompt'>Filter Tags By Type:</p>
        <button class='tag-btn' id='single' id='type-tag'>Single Room</button>
        <button class='tag-btn' id='junior' id='type-tag'>Junior Suite</button>
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

  toggleTagButton() {
    let tag = event.target.id;
    let tagButton = event.target.closest('.tag-btn');
    if (!tagButton.classList.contains('active')) {
      tagButton.classList.add('active');
      this.tagsSelected.push(tag);
    } else {
      tagButton.classList.remove('active');
      let i = this.tagsSelected.indexOf(tag);
      this.tagsSelected.splice(i, 1);
    }
  },

  // organizeTags(tag) {
  //   if (tag === 'single' || tag === 'junior' || tag === 'suite' || tag === 'residential') {
  //     this.tagsSelected[0].type.push(tag);
  //   }
  //   if (tag === '1' || tag === '2') {
  //     this.tagsSelected[1].numBeds.push(tag);
  //   }
  //   if (tag === 'king' || tag === 'queen' || tag === 'full' || tag === 'twin') {
  //     this.tagsSelected[2].bedSize.push(tag);
  //   }
  // },
  
  displayAvailableRooms(guest) {
    let date; 
    if (document.querySelector('.date-input').value !== null) {
      date = document.querySelector(".date-input").value;
      date = moment(date).format("YYYY/MM/DD");
    }
    let maxCost = document.querySelector('#price').value;
    let foundRooms = this.overlook.filterRoomsByTags(date, maxCost, this.tagsSelected);
    document.querySelector(".guest-modal").innerHTML = "";
    document.querySelector('.guest-modal').insertAdjacentHTML('beforeend', `
      <span id='exit-btn-style'><button class='return-btn' id=${guest.id}>Guest Menu</button></span> 
      <h4>Search Results</h4>
      <section class='available-rooms'></section>`);
    this.addManagerButtons();  
    if (foundRooms.length > 0) {
      foundRooms.forEach(room => {
        let roomHTML = 
        `<div class='found-room'>
          <h4 class='found-room-date'>${date}</h4>
          <p class='found-room-room-num'>Room number: ${room.number}</p>
          <p class='found-room-room-type'>Room type: ${this.capitalize(room.roomType)}</p>
          <p class='found-room-bed-info'>Bed: ${room.numBeds}, ${this.capitalize(room.bedSize)}</p>
          <p class='found-room-bidet-info'>Bidet: ${this.capitalize(String(room.bidet))}</p>
          <p class='found-room-room-cost'>Cost: $${room.costPerNight}</p>
          <button type='submit' class='book-room-btn' id='${guest.id} ${date} ${room.number}'>Book</button>
        </div>`;
        document.querySelector('.available-rooms').insertAdjacentHTML('beforeend', roomHTML);
      });
    } else {
      document.querySelector('.available-rooms').insertAdjacentHTML('beforeend', `<p class='unavailable-msg'>Sorry, no rooms match your search. </br> Please go back and try again.</p>`);
    }
  },

  displayConfirmationMessage(bookingInfo) {
    let guest = this.overlook.users.find((user) => user.id === Number(bookingInfo[0]));
    document.querySelector(".guest-modal").innerHTML = "";
    document.querySelector(".guest-modal").insertAdjacentHTML('beforeend', 
      `<span id='exit-btn-style'><button class='return-btn' id='${guest.id}'>Main Menu</button></span> 
      <h4>Thank You!</h4>
      <section class='confirm-msg-box'></section>`);
    this.addManagerButtons();  
    let confirmHTML = `
      <p class='confirm-msg'>Thank you for booking with The Overlook.</br>
      We look forward to your stay on ${bookingInfo[1]}.</br>
      Would you like to: </p>
      <button class='guest-bookings-btns new-booking-form' id='${guest.id}'>Make Another Reservation</button>`;
    document.querySelector('.confirm-msg-box').insertAdjacentHTML('beforeend', confirmHTML);
  },

  displayDeleteMessage(idNum) {
    let guest = this.overlook.users.find((user) => user.id === Number(idNum));
    document.querySelector(".guest-modal").innerHTML = "";
    document.querySelector(".guest-modal").insertAdjacentHTML('beforeend', 
      `<span id='exit-btn-style'><button class='return-btn' id=${guest.id}>Guest Menu</button></span> 
      <h4>Cancellation Confirmed</h4>
      <section class='delete-msg-box'></section>`);
    this.addManagerButtons();  
    let deleteHTML = `
    <p class='confirm-msg'>Your booking has been canceled.</br>
      Please refer to our cancellation policy</br> 
      for information regarding your refund.</br>
      Would you like to: </p>
      <button class='guest-bookings-btns new-booking-form' id='${guest.id}'>Make Another Reservation</button>`;
    document.querySelector('.delete-msg-box').insertAdjacentHTML('beforeend', deleteHTML);
  },


  ///// DISPLAYING RESERVATIONS
  
  displayBookingInfo(guest, type) {
    document.querySelector('.manager-view').style.opacity = 0.8;
    document.querySelector('.guest-modal').innerHTML = "";
    document.querySelector('.guest-modal').insertAdjacentHTML('beforeend', `
        <span id='exit-btn-style'><button class="return-btn" id='${guest.id}'>Main Menu</button></span> 
        <h4>${type} Reservations</h4>
        <section class='booking-list'></section>`);
    let bookingInfo = guest.getBookingInfo(this.todaysDate, type);
    this.checkDataTypeForDisplay(bookingInfo);
    if (type === 'Upcoming') {
      this.addDeleteButtonToHTML(guest);
    }
  },

  checkDataTypeForDisplay(bookingInfo) {
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
      <section class='booking' id=${bookingInfo.id}>
         <h4 class='booking-date'>${bookingInfo.date}</h4>
         <p class='booking-room-num'>Room number: ${bookingInfo.roomNumber}</p>
         <p class='booking-room-type'>Room type: ${this.capitalize(bookingInfo.roomType)}</p>
         <p class='booking-bed-info'>Bed: ${bookingInfo.numBeds}, ${this.capitalize(bookingInfo.bedSize)}</p>
         <p class='booking-bidet-info'>Bidet: ${this.capitalize(String(bookingInfo.bidet))}</p>
         <p class='booking-room-cost'>Cost: $${bookingInfo.cost}</p>
      </section>`;     
    document.querySelector(".booking-list").insertAdjacentHTML('beforeend', bookingHTML);
  },

  addDeleteButtonToHTML(guest) {
    document.querySelectorAll(".booking").forEach(element => {
      element.insertAdjacentHTML('beforeend', 
        `<button class='guest-bookings-btns guest-delete-booking' id='${element.id} ${guest.id}'>Delete Reservation</button>`);
    });
  }
  
}

export default domUpdates;