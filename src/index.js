import domUpdates from './domUpdates';
import fetchData from './fetchData';
import Hotel from './hotel';

import './images/grey-mountain.jpg';
import './css/base.scss';
import moment from 'moment';


let currentUser;
let todaysDate;

function getData() {
  return fetchData().then((data) => {
    todaysDate = moment().format('YYYY/MM/DD');
    let overlook = new Hotel(data, todaysDate);
    currentUser = overlook.users[0];
    console.log(currentUser);
    domUpdates.defineData(currentUser, todaysDate, overlook);
  }).then(() => {
    // domUpdates.displayPage();
  })
    .catch((err) => console.log(err.message));
}

window.addEventListener('load', getData);