class User {
  constructor(
    id,
    username,
    fname,
    lname,
    email,
    mobile,
    password,
    friends,
    image
  ) {
    this.id = id;
    this.username = username;
    this.firstname = fname;
    this.lastname = lname;
    this.email = email;
    this.mobile = mobile;
    this.password = password;
    this.friends = friends;
    this.image = image;
  }
}

export default User;
