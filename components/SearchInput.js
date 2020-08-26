import React from "react";
import { TextInput, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SearchInput = (props) => {
  return (
    <View style={styles.searchContainer}>
      <Ionicons name="ios-search" size={25} color="#ccc" />
      <TextInput
        autoCorrect={false}
        {...props}
        required
        style={{ ...styles.inputContainer, ...props.style }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 0.95,
    fontSize: 20,
    marginLeft: 10,
  },
  searchContainer: {
    padding: 15,
    borderColor: "#ccc",
    borderWidth: 1,
    marginVertical: 10,
    borderRadius: 15,
    flexDirection: "row",
  },
});

export default SearchInput;
