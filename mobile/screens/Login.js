import React, { Component } from "react";
import { Text, StyleSheet, View , Platform } from "react-native";
import LoginForm from "../components/LoginForm";


export default class Login extends Component {
  render() {
    return(
      <View style={styles.container}>
      <Text style={styles.headerText}>Taxify</Text>
      <LoginForm />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3A3743"
  },
  headerText: {
    fontSize: 44,
    color: "#C1D76D",
    textAlign: "center",
    fontFamily: Platform.OS == "android" ? "sans-serif-light" : undefined,
    marginTop: 70,
    fontWeight: "200"
  }
});
