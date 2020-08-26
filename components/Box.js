import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Box = (props) => {
  return (
    <View style={{ ...props.style, ...styles.btn }}>
      <Text style={styles.num}>{props.num}</Text>
      <Text style={styles.text}>{props.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  num: {
    fontSize: 20,
    fontWeight: "800",
    color: "white",
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "300",
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Box;
