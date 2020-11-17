import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  StatusBar,
  Button,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import FormInput from "../components/FormInput.js";
import Colors from "../constants/Colors";
import { connect } from "react-redux";
import { login, fetchUsers } from "../store/actions/users";

class LoginScreen extends React.Component {
  state = {
    username: "",
    password: "",
    loggedIn: true,
    loading: false,
    errorMessage: "",
  };

  loginHandler = () => {
    this.setState({ loading: true });
    this.props
      .login(this.state.username, this.state.password)
      .then(() => {
        this.setState({ loading: false });
        if (this.props.loggedIn) {
          console.log("Login successful");
          this.props.navigation.navigate("LoggedIn");
        } else {
          this.setState({ errorMessage: "Invalid username or password" });
        }
      })
      .catch(() => {
        console.log("Error logging in");
      });
  };

  componentDidMount() {
    StatusBar.setBarStyle("dark-content");
    this.props.fetch();
    // console.log(this.props.users);
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <SafeAreaView style={styles.screen}>
          {/* HEADER - FRIENDBOOK TITLE */}
          <View style={{ flex: 0.2 }}>
            <Text style={styles.title}>FriendBook</Text>
          </View>
          {/* END OF HEADER */}

          {/* BODY - USERNAME AND PASSWORD INPUTS + LOGIN BUTTON */}
          <View style={styles.bodyContainer}>
            {/* USERNAME AND PASSWORD INPUTS */}
            <View style={{ flex: 0.4 }}>
              <FormInput
                textColor="#4a6572"
                inputColor="#232f34"
                name="USERNAME"
                value={this.state.username}
                onChangeText={(text) => {
                  this.setState({ username: text, errorMessage: "" });
                }}
              />
              <FormInput
                textColor="#4a6572"
                inputColor="#232f34"
                name="PASSWORD"
                value={this.state.password}
                secureTextEntry
                autoCorrect={false}
                onChangeText={(text) => {
                  this.setState({ password: text, errorMessage: "" });
                }}
              />
            </View>
            {/* END OF USERNAME AND PASSWORD INPUTS */}

            {/* ERROR MESSAGE */}
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{this.state.errorMessage}</Text>
            </View>
            {/* END OF ERROR MESSAGE */}

            {/* LOGIN BUTTON */}
            <View style={{ flex: 0.1 }}>
              <TouchableOpacity
                style={styles.loginBtnContainer}
                onPress={this.loginHandler}
              >
                {this.state.loading ? (
                  <ActivityIndicator size="small" />
                ) : (
                  <Text style={styles.loginBtnText}>LOGIN</Text>
                )}
              </TouchableOpacity>
            </View>
            {/* END OF LOGIN BUTTON */}
          </View>
          {/* END OF BODY */}

          {/* FOOTER - SIGNUP AREA */}
          <View style={styles.footerContainer}>
            <Text>Don't have a FriendBook Account?</Text>
            <Button
              title="Sign Up"
              color={Colors.primaryColor}
              onPress={() => {
                this.props.navigation.navigate("CreateAccount");
              }}
            />
          </View>
          {/* END OF FOOTER */}
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 150,
  },
  title: {
    fontSize: 50,
    fontWeight: "800",
    color: Colors.primaryColor,
  },
  bodyContainer: {
    width: "75%",
    flex: 0.75,
  },
  loginBtnContainer: {
    borderRadius: 15,
    padding: 15,
    backgroundColor: Colors.primaryColor,
  },
  loginBtnText: {
    textAlign: "center",
    color: "white",
    fontWeight: "600",
    fontSize: 18,
  },
  errorContainer: {
    flex: 0.1,
    alignItems: "center",
  },
  errorText: {
    color: Colors.secondary,
    fontSize: 16,
    fontWeight: "600",
  },
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

const mapStateToProps = (state) => {
  return {
    users: state.users.usersList,
    loggedIn: state.users.loggedIn,
  };
};

const mapDispatchToProps = {
  login: login,
  fetch: fetchUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
