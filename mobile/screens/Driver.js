import React, { Component } from "react";
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableHighlight,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";
import apiKey from "../google_api_key";
import _ from "lodash";
import PolyLine from "@mapbox/polyline";
import socketIO from "socket.io-client";

export default class Driver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      latitude: 0,
      longitude: 0,
      destination: "",
      pointCoords: [],
      lookingForPassengers: false
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      error => console.error(error),
      { enableHighAccuracy: true, maximumAge: 2000, timeout: 20000 }
    );
  }

  async getRouteDirections(destinationPlaceId) {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${
          this.state.latitude
        },${
          this.state.longitude
        }&destination=place_id:${destinationPlaceId}&key=${apiKey}`
      );
      const json = await response.json();
      console.log(json);
      const points = PolyLine.decode(json.routes[0].overview_polyline.points);
      const pointCoords = points.map(point => {
        return { latitude: point[0], longitude: point[1] };
      });
      this.setState({
        pointCoords,
        predictions: []
      });
      this.map.fitToCoordinates(pointCoords);
    } catch (error) {
      console.error(error);
    }
  }

  async lookForPassenger() {
    this.setState({
      lookingForPassengers: true
    });
    const socket = socketIO.connect("http://192.168.1.11:3000");

    socket.on("connect", () => {
      socket.emit("lookForPassenger")
    })

    socket.on("taxiRequest", routeResponse => {
      console.log(routeResponse)
      this.getRouteDirections(routeResponse.geocoded_waypoints[0].place_id);
    })
  }

  render() {
    let marker = null;

    if(this.state.pointCoords.length > 1) {
      marker = (
        <Marker
        coordinate={this.state.pointCoords[this.state.pointCoords.length - 1]}
        />
      );
    }


    return (
      <View style={styles.container}>
        <MapView
          ref={map => {
            this.map = map;
          }}
          style={styles.map}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          }}
          showsUserLocation={true}
        >
          <Polyline
            coordinates={this.state.pointCoords}
            strokeWidth={4}
            strokeColor="red"
          />
          {marker}
        </MapView>
        <TouchableOpacity onPress={() => this.lookForPassenger()} style={styles.bottomButton}>
        <View>
        <Text style={styles.bottomButtonText}>FIND PASSENGER</Text>
        {this.state.lookingForPassengers === true ? (
        <ActivityIndicator
        animating={this.state.lookingForPassengers}
        size="large"
        />
      ) : null}
        </View>
        </TouchableOpacity>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  bottomButton: {
    backgroundColor: "black",
    marginTop: "auto",
    margin: 20,
    padding: 15,
    paddingLeft: 30,
    paddingRight: 30,
    alignSelf: "center"
  },
  bottomButtonText: {
    color: "white",
    fontSize: 20
  },
  suggestions: {
    backgroundColor: "white",
    padding: 5,
    fontSize: 18,
    borderWidth: 0.5,
    marginLeft: 5,
    marginRight: 5
  },
  destinationInput: {
    height: 40,
    borderWidth: 0.5,
    marginTop: 50,
    marginLeft: 5,
    marginRight: 5,
    padding: 5,
    backgroundColor: "white"
  },
  container: {
    ...StyleSheet.absoluteFillObject
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});
