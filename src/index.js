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
        domUpdates.displayGuestDashboard();
      }
    })
    .catch((err) => console.log(err.message));
}



document.querySelector('.login-btn').addEventListener('click', getData);
// window.addEventListener('load', getData);