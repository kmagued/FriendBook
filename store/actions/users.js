import User from "../../models/User";

export const CREATE_USER = "CREATE_USER";
export const LOGIN = "LOGIN";
export const SIGN_OUT = "SIGN_OUT";
export const SET_USERS = "SET_USERS";
export const CHECK_USERNAME = "CHECK_USERNAME";
export const CHECK_INFO = "CHECK_INFO";
export const SEARCH_USERS = "SEARCH_USERS";

export const fetchUsers = () => {
  return async (dispatch) => {
    const response = await fetch(
      "https://friendbook-64688.firebaseio.com/users.json"
    );

    if (!response.ok) {
      throw new Error("something went wrong!");
    }

    const resData = await response.json();
    const loadedUsers = [];

    for (const key in resData) {
      loadedUsers.push(
        new User(
          key,
          resData[key].username,
          resData[key].firstname,
          resData[key].lastname,
          resData[key].email,
          resData[key].mobile,
          resData[key].password,
          resData[key].friendsList,
          resData[key].image
        )
      );
    }

    dispatch({ type: SET_USERS, users: loadedUsers });
  };
};

export const checkUsername = (username) => {
  return async (dispatch) => {
    dispatch({
      type: CHECK_USERNAME,
      username,
    });
  };
};

export const checkInfo = (email, mobile, password) => {
  return async (dispatch) => {
    dispatch({
      type: CHECK_INFO,
      email,
      mobile,
      password,
    });
  };
};

export const createUser = (
  username,
  firstname,
  lastname,
  email,
  mobile,
  password,
  image
) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://friendbook-64688.firebaseio.com/users.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          firstname,
          lastname,
          email,
          mobile,
          friends: [],
          password,
          image,
        }),
      }
    );

    const resData = await response.json();

    dispatch({
      type: CREATE_USER,
      id: resData.name,
      username,
      firstname,
      lastname,
      email,
      mobile,
      friends: [],
      password,
      image,
    });
  };
};

export const login = (username, password) => {
  return async (dispatch) => {
    dispatch({
      type: LOGIN,
      username: username,
      password: password,
    });
  };
};

export const signout = () => {
  return async (dispatch) => {
    dispatch({
      type: SIGN_OUT,
    });
  };
};

export const searchUsers = (input) => {
  return async (dispatch) => {
    dispatch({
      type: SEARCH_USERS,
      input,
    });
  };
};
