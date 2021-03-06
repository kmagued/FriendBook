import firebase from "@firebase/app";
import "@firebase/firestore";
import React from "react";
import { View, Text, ActivityIndicator, StatusBar } from "react-native";
import Navigator from "./navigation/Navigator";
import { combineReducers, createStore, applyMiddleware } from "redux";
import usersReducer from "./store/reducers/users";
import postReducer from "./store/reducers/post";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import Colors from "./constants/Colors";

const baseConfig = {
  apiKey: process.env.API_KEY,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  databaseURL: process.env.DATABASE_URL,
};

firebase.initializeApp(baseConfig);

const rootReducer = combineReducers({
  users: usersReducer,
  post: postReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

class App extends React.Component {
  state = { loading: false };

  componentDidMount() {
    StatusBar.setBarStyle("dark-content");
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 5000);
  }
  render() {
    return this.state.loading ? (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.primaryColor,
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 50,
          }}
        >
          FriendBook
        </Text>
        <ActivityIndicator
          size="large"
          style={{ marginTop: 10 }}
          color="white"
        />
      </View>
    ) : (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}

export default App;
