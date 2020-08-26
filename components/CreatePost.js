import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

const CreatePost = (props) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <SafeAreaView
          style={{ ...styles.topContainer, backgroundColor: "#ececec" }}
        >
          <View
            style={{ ...styles.box, alignItems: "flex-start", paddingLeft: 10 }}
          >
            <Ionicons name="md-close" size={25} onPress={props.onClose} />
          </View>
          <View style={{ ...styles.box, alignItems: "center" }}>
            <Text style={styles.title}>Create Post</Text>
          </View>
          <View
            style={{ ...styles.box, alignItems: "flex-end", marginRight: 7 }}
          >
            {props.loading ? (
              <ActivityIndicator color={Colors.primaryColor} />
            ) : (
              <Button
                title="Post"
                disabled={props.disabled}
                color={Colors.primaryColor}
                onPress={props.onPost}
              />
            )}
          </View>
        </SafeAreaView>

        <View style={styles.post}>
          <TextInput
            multiline
            placeholder="What's on your mind?"
            style={{
              fontSize: 20,
              fontWeight: "400",
              paddingBottom: 25,
              padding: 15,
            }}
            value={props.content}
            onChangeText={props.onChange}
          />
          {props.image !== " " ? (
            <View>
              <ImageBackground
                resizeMode="cover"
                source={{ uri: props.image.uri }}
                style={{
                  width: "100%",
                  height: 400,
                  alignItems: "flex-end",
                }}
              >
                <Ionicons
                  name="md-close"
                  size={20}
                  color="white"
                  style={{ marginRight: 10, marginTop: 10 }}
                  onPress={props.closeImage}
                />
              </ImageBackground>
            </View>
          ) : (
            <View />
          )}
        </View>
        <TouchableOpacity
          style={{
            padding: 20,
            alignItems: "center",
            backgroundColor: Colors.primaryColor,
            width: "70%",
            borderRadius: 15,
          }}
          onPress={props.onAddImage}
        >
          <Text style={{ color: "white", fontSize: 20, fontWeight: "500" }}>
            Add Photo
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  post: {
    borderWidth: 1,
    borderColor: "#ccc",
    width: "90%",
    marginVertical: 15,
    borderRadius: 10,
    overflow: "hidden",
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
  },
  topContainer: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC",
  },
  box: {
    flex: 0.34,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CreatePost;
