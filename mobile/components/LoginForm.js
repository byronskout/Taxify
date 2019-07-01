import React, { Component } from "react";
import { Text, StyleSheet, View , TextInput, TouchableOpacity, Platform } from "react-native";


export default class LoginForm extends Component {
  render() {
    return(
      <View>
      <TextInput
      style={styles.input}
      placeholder="Email"
      keyboardType="email-address"
      autoCapitalize="none"
      autoCorrect={false}
      placeholderTextColor="#FFF"
      />
      <TextInput
      style={styles.input}
      autoCapitalize="none"
      autoCorrect={false}
      secureTextEntry
      placeholder="Password"
      placeholderTextColor="#FFF"
      />
       <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sign In</Text>
       </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    padding: 10,
    backgroundColor: "#8793A6",
    color: "#FFF",
    marginBottom: 10
  },
  button: {
    backgroundColor: "black",
    paddingVertical: 20
  },
  buttonText: {
    textAlign: "center",
    fontSize: 23,
    color: "white",
    fontWeight: "200",
    fontFamily: Platform.OS == "android" ? "sans-serif-light" : undefined,
  }
});
