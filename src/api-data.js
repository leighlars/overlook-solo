class apiData {
  constructor() {
    this.rootURL = 'https://fe-apps.herokuapp.com/api/v1/overlook/1904/';
  }

  fetchData() {
    let userData = fetch(`${this.rootURL}users/users`)
      .then(response => response.json())
      .then(data => { 
        return data.users;
      })
      .catch(err => console.log(err.message));

    let roomsData = fetch(`${this.rootURL}rooms/rooms`)
      .then(response => response.json())
      .then(data => {
        return data.rooms;
      })
      .catch(err => console.log(err.message))

    let bookingsData = fetch(`${this.rootURL}bookings/bookings`)
      .then(response => response.json())
      .then(data => {
        return data.bookings;
      })
      .catch(err => console.log(err.message))

    return Promise.all([userData, roomsData, bookingsData])
      .then(data => {
        let allData = {}
        allData.users = data[0];
        allData.rooms = data[1];
        allData.bookings = data[2];
        return allData;
      }); 
  }

}

export default apiData;