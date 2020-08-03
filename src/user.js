class User {
  constructor(id) {
    this.userName =  "manager" || 'customer${id}';
    this.password = 'overlook2020';
  }

}

export default User;