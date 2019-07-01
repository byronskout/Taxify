import React, { Component } from "react";
import { Text, StyleSheet, View , TextInput } from "react-native";


export default class LoginForm extends Component {
  render() {
    return(
      <View>
      <TextInput
      style={styles.input}
      placeholder="Email"
      placeholderTextColor="#FFF"
      />
      <TextInput
      style={styles.input}
      placeholder="Password"
      placeholderTextColor="#FFF"
      />
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
  }
});
