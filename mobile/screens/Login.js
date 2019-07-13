import React, { Component } from "react";
import { Text, StyleSheet, View , Platform, Alert, Image } from "react-native";
import LoginForm from "../components/LoginForm";
import axios from "axios";
axios.defaults.baseURL = "http://192.168.1.11:4000"

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorMessage: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleChange(name, value) {
    this.setState({
      [name]: value
    });
  }

  async handleSignIn() {
    try {
      this.setState({ errorMessage: ""});
    const { email, password } = this.state;
    const result = await axios.post("/auth/login", { email, password });
    this.props.handleChange("token", result.data.token);
    } catch(error) {
      this.setState({ errorMessage: error.response.data.message });
    }
  }
  

  async handleSignUp() {
    try {
    const { email, password } = this.state;
    const result = await axios.post("/auth/signup", { email, password });
    this.handleSignIn();
    } catch (error) {
     this.setState({ errorMessage: error.response.data.message });
    }
  }

  render() {
    return(
      <View style={styles.container}>
      <Text style={styles.headerText}>Taxify</Text>
      <Image source={require("../images/cab1.png")} style={styles.logo} />
      <LoginForm
      email={this.state.email}
      password={this.state.password}
      handleChange={this.handleChange}
      handleSignIn={this.handleSignIn}
      handleSignUp={this.handleSignUp}
      />
      <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3A3743"
  },
  errorMessage: {
    marginHorizontal: 10,
    fontSize: 18,
    color: "#F5D7CC",
    fontWeight: "bold"
  },
  headerText: {
    fontSize: 44,
    color: "#C1D76D",
    textAlign: "center",
    fontFamily: Platform.OS == "android" ? "sans-serif-light" : undefined,
    marginTop: 70,
    fontWeight: "200",
    paddingBottom: 35
  },
  logo: {
    height: 200,
    width: 200,
    alignSelf: "center",
    marginBottom: 30
  }
});
