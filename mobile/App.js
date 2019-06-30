import React, { Component } from "react";
import { StyleSheet, Button, View } from "react-native";
import Driver from './screens/Driver';
import Passenger from './screens/Passenger';
import GenericContainer from './components/GenericContainer';

const DriverwithGenericContainer = GenericContainer(Driver);
const PassengerwithGenericContainer = GenericContainer(Passenger);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDriver: false,
      isPassenger: false
    };

  }

  render() {
    if(this.state.isDriver) {
      return <DriverwithGenericContainer/>;
    }

    if(this.state.isPassenger) {
      return <PassengerwithGenericContainer/>;
    }

    return (
      <View style={styles.container}>
      <Button onPress={() => this.setState({ isPassenger: true })}
      title="Passenger"
      />
      <Button onPress={() => this.setState({ isDriver: true })}
      title="Driver"/>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
  flex: 1,
  marginTop: 50
}
});
