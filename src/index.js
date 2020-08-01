import domUpdates from './domUpdates';
import fetchData from './fetchData';
import Hotel from './hotel';

import './images/grey-mountain.jpg';
import './css/base.scss';
import moment from 'moment';

let currentUser;
let todaysDate;
let overlook;

function getData() {
  event.preventDefault();
  return fetchData().then((data) => {
    overlook = new Hotel(data, todaysDate);
  })
    .then(() => {
      todaysDate = moment().format("YYYY/MM/DD");
      let userName = document.getElementById("username-input");
      let pwd = document.getElementById("pw-input");
      overlook.authenticate(userName.value, pwd.value);
      if (overlook.isManager && overlook.isAuthenticated) {
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

// should i fetch on load or at the click of login?

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
    let guestCard = document.querySelector('.expand-found-guest-btn').id;
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
  if (event.target.className === 'guest-bookings-btns new-booking-form') {
    // domUpdates.displayNewBookingForm();
  }
  if (event.target.className === 'book-reservation') {
    // get inputs from cal and tags
    // let newBooking = {"userID": currentUser.id, "date": todaysDate, "roomNumber": Number(roomInput.value)};
    // postNewBooking(newBooking);
  }
  if (event.target.className === 'guest-bookings-btns current-booking') {
    domUpdates.displayBookingInfo(guest, 'Current');
  }
  if (event.target.className === "guest-bookings-btns future-bookings") {
    let guest = overlook.users.find((user) => user.id === Number(event.target.id));
    domUpdates.displayBookingInfo(guest, 'Upcoming');
  }
  if (event.target.className === 'guest-bookings-btns past-bookings') {
    domUpdates.displayBookingInfo(guest, 'Past');
  }
  if (event.target.className === 'guest-bookings-btns delete-booking') {
    // get id of booking set to var deletedBooking
    // let deletedBooking =
    // deleteBooking(deletedBooking);
    // how do i click on a calendar date?
    // 
  // I should be able to select a date for which I’d like to book a room for myself
  // Upon selecting a date, I should be shown a list of room details for only rooms that are available on that date
  // I should be able to filter the list of available rooms by their roomType property
  // I should be able to select a room for booking
  // In the event that no rooms are available for the date/roomType selected, display a message fiercely apologizing to the user and asking them to adjust their room search
  }
}

function postNewBooking(newBooking) {
  fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings", {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(newBooking)
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data)
    })
    .catch((error) => {
      console.log('Failed:', error)
    })
}

function deleteBooking(deletedBooking) {
  fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings", {
    method: "DELETE",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(deletedBooking),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log('Success', data);
    })
    .catch((err) => console.log(err));
}





document.querySelector('.guest-view').addEventListener('click', guestViewHandler);
document.querySelector('.manager-view').addEventListener('click', mgrViewHandler);
document.querySelector('.login-btn').addEventListener('click', getData);
// window.addEventListener('load', getData); // fetch on load?