class APIData {
  constructor() {
    this.rootURL = 'https://fe-apps.herokuapp.com/api/v1/overlook/1904/';
  }

  fetchData() {
    let userData = fetch(`${this.rootURL}users/users`)
      .then(response => response.json())
      .then(data => { 
        return data.userData;
      })
      .catch(err => console.log(err.message));

    let roomsData = fetch(`${this.rootURL}rooms/rooms`)
      .then(response => response.json())
      .then(data => {
        return data.roomsData;
      })
      .catch(err => console.log(err.message))

    let bookingsData = fetch(`${this.rootURL}bookings/bookings`)
      .then(response => response.json())
      .then(data => {
        return data.bookingsData;
      })
      .catch(err => console.log(err.message))

    return Promise.all([userData, roomsData, bookingsData])
      .then(data => {
        let allData = {}
        allData.userData = data[0];
        allData.roomsData = data[1];
        allData.bookingsData = data[2];
        return allData;
      }); 
  }

}

export default APIData;