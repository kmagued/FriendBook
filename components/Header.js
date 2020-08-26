import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import { SimpleLineIcons } from "@expo/vector-icons";

const Header = (props) => {
  return (
    <View style={{ width: "100%" }}>
      <View style={styles.topContainer}>
        <View style={{ flex: 0.7, alignItems: "flex-end" }}>
          <Text style={styles.title}>{props.title}</Text>
        </View>
        <View style={{ flex: 0.3, alignItems: "flex-end", paddingRight: 10 }}>
          <SimpleLineIcons
            name="note"
            size={20}
            color={Colors.primaryColor}
            onPress={props.onNewPost}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    color: Colors.primaryColor,
    fontSize: 28,
    fontWeight: "600",
  },
});

export default Header;
