class Hotel {
  constructor(userName, pwd) {
    this.userName = userName;
    this.password = pwd;
    this.isAuthenticated = false;
    this.isManager = false;
  }

  authenticate() {
    if (this.password === 'overlook2020') {
      this.isAuthenticated = true;
    }
    if (this.userName === 'manager') {
      this.isManager = true;
    }
    if (Number(this.password.slice(-2)) <= 50) {
      this.isAuthenticated = true;
    }
  }


}

export default Hotel;