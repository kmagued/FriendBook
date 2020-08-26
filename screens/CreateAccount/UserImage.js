import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { AddImageHandler } from "../../methods/ImageHandler";

class UserImage extends React.Component {
  state = { pickedImage: " ", loading: false };

  addImage = () => {
    AddImageHandler().then((img) => {
      this.setState({ pickedImage: img.uri });
    });
  };

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primaryColor }}>
          <View style={{ flex: 1 }}>
            <View style={styles.topContainer}>
              <Ionicons
                color="white"
                name="ios-arrow-back"
                size={25}
                onPress={() => this.props.navigation.navigate("Username")}
              />
            </View>

            <View style={styles.container}>
              <View>
                <Text style={styles.title}>Profile Photo</Text>
              </View>
              <View style={styles.image}>
                <Image
                  source={{ uri: this.state.pickedImage }}
                  style={styles.photo}
                  resizeMode="cover"
                />
              </View>
              <TouchableOpacity onPress={this.addImage}>
                <Text
                  style={{ color: "white", fontSize: 20, marginBottom: 10 }}
                >
                  Choose image
                </Text>
              </TouchableOpacity>
              {this.state.pickedImage !== " " ? (
                <TouchableOpacity
                  style={styles.next}
                  onPress={() => {
                    this.props.navigation.navigate("UserInfo", {
                      username: this.props.navigation.getParam("username"),
                      firstname: this.props.navigation.getParam("firstname"),
                      lastname: this.props.navigation.getParam("lastname"),
                      pickedImage: this.state.pickedImage,
                    });
                  }}
                >
                  <Text style={{ color: "white", fontSize: 25 }}>Next</Text>
                </TouchableOpacity>
              ) : (
                <View />
              )}
            </View>

            <View
              style={{ alignItems: "flex-end", flex: 0.1, marginRight: 25 }}
            >
              {this.state.pickedImage === " " ? (
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("UserInfo", {
                      username: this.props.navigation.getParam("username"),
                      firstname: this.props.navigation.getParam("firstname"),
                      lastname: this.props.navigation.getParam("lastname"),
                      pickedImage: this.state.pickedImage,
                    });
                  }}
                >
                  <Text style={{ color: "white", fontSize: 25 }}>Skip</Text>
                </TouchableOpacity>
              ) : (
                <View />
              )}
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 0.05,
    paddingHorizontal: 30,
  },
  container: {
    flex: 0.85,
    marginTop: 20,
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 38,
    fontWeight: "600",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "white",
    marginVertical: 20,
    overflow: "hidden",
  },
  next: {
    backgroundColor: Colors.secondary,
    borderRadius: 25,
    padding: 10,
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  photo: {
    flex: 1,
    width: "100%",
  },
});

export default UserImage;
