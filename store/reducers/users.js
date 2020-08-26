import {
  CREATE_USER,
  LOGIN,
  SIGN_OUT,
  SET_USERS,
  CHECK_USERNAME,
  CHECK_INFO,
  SEARCH_USERS,
} from "../actions/users";
import User from "../../models/User";

const initialState = {
  usersList: [],
  loggedIn: false,
  loggedUser: User,
  validUname: false,
  validMail: false,
  validMobile: false,
  validPassword: false,
  searchList: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        usersList: action.users,
        loggedIn: false,
      };
    case CHECK_USERNAME:
      for (const key in state.usersList) {
        if (state.usersList[key].username === action.username) {
          return {
            ...state,
            validUname: false,
          };
        }
      }
      return {
        ...state,
        validUname: true,
      };

    case CHECK_INFO:
      var validMail = false;
      var validPassword = false;
      var validMobile = false;

      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(action.email)) {
        validMail = true;
      } else {
        validMail = false;
      }

      if (action.password.length > 6) {
        validPassword = true;
      } else {
        validPassword = false;
      }

      if (action.mobile.length === 11) {
        validMobile = true;
      } else {
        validMobile = false;
      }

      return {
        validMail: validMail,
        validMobile: validMobile,
        validPassword: validPassword,
      };

    case CREATE_USER:
      const newUser = new User(
        action.id,
        action.username,
        action.firstname,
        action.lastname,
        action.email,
        action.mobile,
        action.password,
        action.friends,
        action.image
      );

      return {
        ...state,
        usersList: state.usersList.concat(newUser),
        loggedUser: newUser,
        loggedIn: true,
      };

    case LOGIN:
      if (state.usersList.length !== 0) {
        for (const key in state.usersList) {
          if (
            state.usersList[key].username === action.username &&
            state.usersList[key].password === action.password
          ) {
            const currUser = state.usersList[key];
            return {
              ...state,
              usersList: state.usersList,
              loggedIn: true,
              loggedUser: currUser,
            };
          }
        }
      }
      return {
        ...state,
        usersList: state.usersList,
        loggedIn: false,
        loggedUser: User,
      };

    case SIGN_OUT:
      return {
        ...state,
        loggedIn: false,
      };

    case SEARCH_USERS:
      const searchedUsers = state.usersList.filter(
        (user) =>
          user.firstname.includes(action.input) ||
          user.lastname.includes(action.input)
      );

      return {
        ...state,
        searchList: searchedUsers,
      };

    default:
      return state;
  }
};

export default usersReducer;
