import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import Colors from "../constants/Colors";

const FormInput = (props) => {
  return (
    <View style={{ ...props.style, ...styles.container }}>
      <Text style={{ ...styles.text, color: props.textColor }}>
        {props.name}
      </Text>
      {!props.error ? (
        <TextInput
          {...props}
          style={{ ...styles.input, color: props.inputColor }}
          value={props.value}
        />
      ) : (
        <View>
          <TextInput
            {...props}
            style={{ ...styles.errorInput, color: props.inputColor }}
            value={props.value}
          />
          <Text
            style={{ color: Colors.secondary, fontSize: 16, fontWeight: "600" }}
          >
            {props.error}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  text: {
    fontWeight: "500",
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    fontSize: 25,
    fontWeight: "600",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  errorInput: {
    fontSize: 25,
    fontWeight: "600",
    borderBottomColor: Colors.secondary,
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
});

export default FormInput;
