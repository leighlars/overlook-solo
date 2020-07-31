import domUpdates from './domUpdates';
import fetchData from './fetchData';
import Hotel from './hotel';

import './images/grey-mountain.jpg';
import './css/base.scss';
import moment from 'moment';


let currentUser;
let todaysDate;
let overlook;
let userName;

function getData() {
  event.preventDefault();
  return fetchData().then((data) => {
    todaysDate = moment().format('YYYY/MM/DD');
    userName = document.getElementById('username-input');
    let pwd = document.getElementById("pw-input");
    overlook = new Hotel(data, todaysDate);
    overlook.authenticate(userName.value, pwd.value);
  })
    .then(() => {
      if (overlook.isManager && overlook.isAuthenticated) {
        domUpdates.displayManagerDashboard(); //works
      }
      if (overlook.isAuthenticated && overlook.isManager === false) {
        // debugger;
        currentUser = overlook.users[Number(overlook.getUserID(userName.value))]; 
        domUpdates.displayGuestDashboard();
      }
      domUpdates.defineData(currentUser, todaysDate, overlook);
    })
    .catch((err) => console.log(err.message));
}



document.querySelector('.login-btn').addEventListener('click', getData);
// window.addEventListener('load', getData);