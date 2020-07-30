import domUpdates from './domUpdates';
import apiData from './api-data';

import './css/base.scss';


let currentUser;
let todaysDate;

function getData() {
  return apiData.fetchData().then((data) => {
    // todaysDate = moment().format('YYYY/MM/DD');
    // let userRepository = new UserRepository(data, todaysDate);
    // currentUser = userRepository.users[Math.floor(Math.random() * userRepository.users.length)]
    // domUpdates.defineData(currentUser, todaysDate userRepository);
  }).then(() => {
    // domUpdates.displayPage();
  })
    .catch((err) => console.log(err.message));
}

// window.addEventListener('load', getData);