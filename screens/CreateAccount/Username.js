import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FormInput from "../../components/FormInput";
import Colors from "../../constants/Colors";
import { checkUsername } from "../../store/actions/users";
import { connect } from "react-redux";

class Username extends React.Component {
  state = { username: "", errorMessage: "" };

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
                onPress={() => this.props.navigation.navigate("Name")}
              />
            </View>
            <View style={{ flex: 0.12, marginTop: 30 }}>
              <Text style={styles.title}>Choose a Username</Text>
            </View>

            <KeyboardAvoidingView
              style={{ flex: 0.85 }}
              behavior="padding"
              keyboardVerticalOffset={100}
            >
              <View style={{ flex: 0.9 }}>
                <FormInput
                  textColor="white"
                  inputColor="white"
                  style={{ paddingTop: 20 }}
                  name="USERNAME"
                  error={this.state.errorMessage}
                  value={this.state.username}
                  onChangeText={(text) =>
                    this.setState({ username: text, errorMessage: "" })
                  }
                />
              </View>
              <View style={{ alignItems: "flex-end", flex: 0.1 }}>
                <TouchableOpacity
                  style={styles.next}
                  onPress={() => {
                    if (this.state.username !== "") {
                      this.props.check(this.state.username).then(() => {
                        if (this.props.valid) {
                          this.props.navigation.navigate("UserImage", {
                            username: this.state.username,
                            firstname: this.props.navigation.getParam(
                              "firstname"
                            ),
                            lastname: this.props.navigation.getParam(
                              "lastname"
                            ),
                          });
                        } else {
                          this.setState({
                            errorMessage: "Username already exists",
                          });
                        }
                      });
                    } else {
                      this.setState({
                        errorMessage: "You must enter a valid username",
                      });
                    }
                  }}
                >
                  <Ionicons
                    name="ios-arrow-forward"
                    size={25}
                    color={Colors.primaryColor}
                  />
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
});

const mapStateToProps = (state) => ({
  valid: state.users.validUname,
});

const mapDispatchToProps = {
  check: checkUsername,
};

export default connect(mapStateToProps, mapDispatchToProps)(Username);
