import React from "react";
import firebase from "firebase";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FormInput from "../../components/FormInput";
import Colors from "../../constants/Colors";
import { connect } from "react-redux";
import { checkInfo, createUser, fetchUsers } from "../../store/actions/users";
import { uploadImage } from "../../methods/ImageHandler";

class UserInfo extends React.Component {
  state = {
    email: "",
    mobile: "",
    password: "",
    mailError: "",
    mobileError: "",
    passError: "",
    loading: false,
    error: "",
  };

  componentDidMount() {
    this.props.fetch();
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primaryColor }}>
          <View
            style={{
              flex: 1,
              paddingHorizontal: 30,
            }}
          >
            <View style={styles.topContainer}>
              <Ionicons
                color="white"
                name="ios-arrow-back"
                size={25}
                onPress={() => this.props.navigation.navigate("UserImage")}
              />
            </View>
            <View style={{ flex: 0.1, paddingTops: 30 }}>
              <Text style={styles.title}>Enter your info</Text>
            </View>

            <KeyboardAvoidingView
              style={{ flex: 0.8 }}
              behavior="padding"
              keyboardVerticalOffset={80}
            >
              <View style={{ flex: 1 }}>
                <FormInput
                  textColor="white"
                  inputColor="white"
                  style={{ paddingTop: 20 }}
                  name="EMAIL"
                  error={this.state.mailError}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={this.state.email}
                  onChangeText={(text) =>
                    this.setState({ email: text, mailError: "" })
                  }
                />
                <FormInput
                  textColor="white"
                  inputColor="white"
                  name="MOBILE"
                  error={this.state.mobileError}
                  keyboardType="number-pad"
                  value={this.state.mobile}
                  onChangeText={(text) =>
                    this.setState({ mobile: text, mobileError: "" })
                  }
                />
                <FormInput
                  textColor="white"
                  inputColor="white"
                  secureTextEntry
                  name="PASSWORD"
                  error={this.state.passError}
                  value={this.state.password}
                  onChangeText={(text) =>
                    this.setState({ password: text, passError: "" })
                  }
                />
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.errorText}>{this.state.error}</Text>
                </View>
              </View>
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  style={styles.signup}
                  onPress={() => {
                    Keyboard.dismiss();
                    const nav = this.props.navigation;
                    this.props
                      .check(
                        this.state.email,
                        this.state.mobile,
                        this.state.password
                      )
                      .then(() => {
                        if (!this.props.validMail) {
                          this.setState({ mailError: "Invalid email" });
                        }
                        if (!this.props.validMobile) {
                          this.setState({
                            mobileError: "Mobile number must be 11 digits",
                          });
                        }
                        if (!this.props.validPass) {
                          this.setState({
                            passError: "Password must be at least 6 characters",
                          });
                        }
                        if (
                          this.props.validMail &&
                          this.props.validMobile &&
                          this.props.validPass
                        ) {
                          this.setState({ loading: true });
                          if (nav.getParam("pickedImage") !== " ") {
                            uploadImage(
                              nav.getParam("pickedImage"),
                              nav.getParam("username"),
                              "images/"
                            )
                              .then(() => {
                                this.setState({ loading: false });
                                this.props.navigation.navigate("Login");
                                firebase
                                  .storage()
                                  .ref()
                                  .child("images/" + nav.getParam("username"))
                                  .getDownloadURL()
                                  .then((url) => {
                                    this.props.create(
                                      nav.getParam("username"),
                                      nav.getParam("firstname"),
                                      nav.getParam("lastname"),
                                      this.state.email,
                                      this.state.mobile,
                                      this.state.password,
                                      url
                                    );
                                  });
                              })
                              .catch(() => {
                                // console.log("Unable to upload image");
                                this.setState({
                                  error: "Something went wrong!",
                                  loading: false,
                                });
                              });
                          } else {
                            this.setState({ loading: false });
                            this.props.navigation.navigate("Login");
                            this.props.create(
                              nav.getParam("username"),
                              nav.getParam("firstname"),
                              nav.getParam("lastname"),
                              this.state.email,
                              this.state.mobile,
                              this.state.password,
                              nav.getParam("pickedImage")
                            );
                          }
                        }
                      });
                  }}
                >
                  {this.state.loading ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text
                      style={{
                        color: "white",
                        fontSize: 25,
                        fontWeight: "600",
                      }}
                    >
                      Sign Up
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  topContainer: {
    marginBottom: 20,
  },
  next: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: "white",
    opacity: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 38,
    fontWeight: "600",
  },
  signup: {
    backgroundColor: Colors.secondary,
    borderRadius: 25,
    padding: 10,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  errorText: {
    color: Colors.secondary,
    fontSize: 16,
    fontWeight: "600",
  },
});

const mapStateToProps = (state) => ({
  validMobile: state.users.validMobile,
  validMail: state.users.validMail,
  validPass: state.users.validPassword,
  users: state.users.usersList,
});

const mapDispatchToProps = {
  check: checkInfo,
  create: createUser,
  fetch: fetchUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
