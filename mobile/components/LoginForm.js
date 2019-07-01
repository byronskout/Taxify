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
      value={this.props.email}
      onChangeText={(email) => this.props.handleChange("email", email)}
      />

      <TextInput
      style={styles.input}
      autoCapitalize="none"
      autoCorrect={false}
      secureTextEntry
      placeholder="Password"
      placeholderTextColor="#FFF"
      value={this.props.password}
      onChangeText={(pw) => this.props.handleChange("password", pw)}
      />

       <TouchableOpacity
       onPress={this.props.handleSignIn}
       style={styles.button}
       >
        <Text style={styles.buttonText}>Sign In</Text>
       </TouchableOpacity>

       <TouchableOpacity
       style={styles.button}
       onPress={this.props.handleSignUp}
       >
        <Text style={styles.buttonText}>Create Acoount</Text>
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
    marginBottom: 10,
    width: 350,
    marginLeft: 10,
    borderRadius: 5
  },
  button: {
    backgroundColor: "black",
    paddingVertical: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: 350,
    marginLeft: 10
  },
  buttonText: {
    textAlign: "center",
    fontSize: 23,
    color: "white",
    fontWeight: "200",
    fontFamily: Platform.OS == "android" ? "sans-serif-light" : undefined,
  }
});
