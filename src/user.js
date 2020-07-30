class User {
  constructor(userName, pwd, isAuthenticated = false, isManager = false) {
    this.userName = userName;
    this.password = pwd;
    this.isAuthenticated = isAuthenticated;
    this.isManager = isManager;
  }

  authenticate() {
    if (this.password === 'overlook2020') {
      this.isAuthenticated = true;
    }
    if (this.userName === 'manager') {
      this.isManager = true;
    }
    if (Number(this.userName.splice(-2)) > 50) {
      this.isAuthenticated = false;
    }
  }


}

export default User;