import React from "react";
import { View, StyleSheet, Image } from "react-native";

const Photo = (props) => {
  return (
    <View style={styles.photo}>
      <Image
        resizeMode="cover"
        style={styles.image}
        source={{ uri: props.src }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  photo: {
    marginBottom: 10,
    height: 100,
    width: 100,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "#ccc",
  },
  image: {
    flex: 1,
    width: "100%",
  },
});

export default Photo;
