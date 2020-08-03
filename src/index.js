import domUpdates from './domUpdates';
import fetchMethods from './fetchMethods';
import Hotel from './hotel';

import './images/grey-mountain.jpg';
import './css/base.scss';
import moment from 'moment';

let currentUser;
let todaysDate;
let overlook;

function getData() {
  event.preventDefault();
  return fetchMethods.fetchData().then((data) => {
    overlook = new Hotel(data, todaysDate);
  })
    .then(() => {
      todaysDate = moment().format("YYYY/MM/DD");
      let userName = document.getElementById("username-input");
      let pwd = document.getElementById("pw-input");
      overlook.authenticate(userName.value, pwd.value);
      if (overlook.isAuthenticated && overlook.isManager) {
        domUpdates.defineData(currentUser, todaysDate, overlook);
        domUpdates.displayManagerDashboard();

      }
      if (overlook.isAuthenticated && overlook.isManager === false) {
        currentUser = overlook.users[Number(overlook.getUserID(userName.value))]; 
        domUpdates.defineData(currentUser, todaysDate, overlook);
        domUpdates.displayGuestDashboard(currentUser);
      }
    })
    .catch((err) => console.log(err.message));
}

/// HANDLERS

function mgrViewHandler() {
  event.preventDefault();
  if (event.target.className === 'mgr-search-btn') {
    let input = document.getElementById('search-guest-input');
    domUpdates.displayKnownGuests(input.value);
  }
  if (event.target.className === 'clear-text-btn') {
    document.getElementById('search-guest-input').value = '';
    document.querySelector(".known-guests").innerHTML = '';
  }
  if (event.target.closest('.expand-found-guest-btn')) {
    let guestCard = event.target.id;
    let guest = overlook.users.find(user => user.id === Number(guestCard));
    domUpdates.viewGuestModal(guest);
  }
}

function guestViewHandler() {
  let guest = overlook.users.find((user) => user.id === Number(event.target.id));
  if (event.target.className === 'exit-btn') {
    domUpdates.closeModal(guest);
  }
  if (event.target.className === 'return-btn') {
    domUpdates.createGuestHomeHTML(guest);
  }
  if (event.target.className === 'guest-bookings-btns current-booking') {
    domUpdates.displayBookingInfo(guest, 'Current');
  }
  if (event.target.className === "guest-bookings-btns future-bookings") {
    let guest = overlook.users.find((user) => user.id === Number(event.target.id));
    fetchMethods.fetchData().then((data) => {
      overlook.bookings = overlook.matchBookingsInfoFromRooms(data);
      overlook.matchBookingsWithUser([guest], data);
      domUpdates.displayBookingInfo(guest, 'Upcoming');
    });
  }
  if (event.target.className === 'guest-bookings-btns guest-delete-booking') {
    let deletedBookingIDs = event.target.id.split(' ');
    let deletedBooking = {id: Number(deletedBookingIDs[0])}
    fetchMethods.deleteBooking(deletedBooking);
    domUpdates.displayDeleteMessage(deletedBookingIDs[1]);
  }
  if (event.target.className === 'guest-bookings-btns past-bookings') {
    domUpdates.displayBookingInfo(guest, 'Past');
  }
}

function formHandler() {
  let guest = overlook.users.find((user) => user.id === Number(event.target.id));
  if (event.target.className === 'guest-bookings-btns new-booking-form') {
    domUpdates.displayNewBookingForm(guest);
  }
  if (event.target.closest('.tag-btn')) {
    event.preventDefault();
    domUpdates.toggleTagButton();
  }
  if (event.target.className === "guest-bookings-btns search-reservations-btn") {
    event.preventDefault();
    domUpdates.displayAvailableRooms(guest);
  }
  if (event.target.className === 'book-room-btn') {
    event.preventDefault();
    let bookingInfo = event.target.id.split(' ');
    let newBooking = {"userID": Number(bookingInfo[0]), "date": bookingInfo[1], "roomNumber": Number(bookingInfo[2])};
    fetchMethods.postNewBooking(newBooking);
    domUpdates.displayConfirmationMessage(bookingInfo);
  }
}


document.querySelector('.login-btn').addEventListener('click', getData);
document.querySelector('.manager-view').addEventListener('click', mgrViewHandler);
document.querySelector('.guest-view').addEventListener('click', guestViewHandler);
document.querySelector('.guest-view').addEventListener("click", formHandler);
