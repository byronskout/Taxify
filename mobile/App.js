import React, { Component } from "react";
import { StyleSheet, Button, View } from "react-native";
import Driver from './screens/Driver';
import Passenger from './screens/Passenger';
import GenericContainer from './components/GenericContainer';
import Login from './screens/Login';
import DriverOrPassenger from './screens/DriverOrPassenger';

const DriverwithGenericContainer = GenericContainer(Driver);
const PassengerwithGenericContainer = GenericContainer(Passenger);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDriver: false,
      isPassenger: false,
      token: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(name, value) {
    this.setState ({ [name]: value });
  }

  render() {

    if(this.state.token === "") {
      return <Login handleChange={this.handleChange} />
    }

    if(this.state.isDriver) {
      return <DriverwithGenericContainer token={this.state.token} />;
    }

    if(this.state.isPassenger) {
      return <PassengerwithGenericContainer token={this.state.token} />;
    }

    return (
      <DriverOrPassenger handleChange={this.handleChange} />
    );
  }
}
