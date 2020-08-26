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

class Name extends React.Component {
  state = { firstname: "", lastname: "", errorMessage: "" };
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
                onPress={() => this.props.navigation.navigate("Login")}
              />
            </View>
            <View style={{ flex: 0.12, marginTop: 30 }}>
              <Text style={styles.title}>What's your name?</Text>
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
                  name="FIRST NAME"
                  error={this.state.errorMessage}
                  value={this.state.firstname}
                  onChangeText={(text) =>
                    this.setState({ firstname: text, errorMessage: "" })
                  }
                />
                <FormInput
                  textColor="white"
                  inputColor="white"
                  name="LAST NAME"
                  value={this.state.lastname}
                  onChangeText={(text) => this.setState({ lastname: text })}
                />
              </View>

              <View style={{ alignItems: "flex-end", flex: 0.1 }}>
                <TouchableOpacity
                  style={styles.next}
                  onPress={() => {
                    if (this.state.firstname !== "") {
                      this.props.navigation.navigate("Username", {
                        firstname: this.state.firstname,
                        lastname: this.state.lastname,
                      });
                    } else {
                      this.setState({
                        errorMessage: "You must enter your first name",
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

export default Name;
