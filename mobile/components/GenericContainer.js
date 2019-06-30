import React, { Component } from "react";


function genericContainer(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        latitude: null,
        longitude: null
      };
    }

    componentDidMount() {
      //Get current location and set initial region to this
      this.watchId = navigator.geolocation.watchPosition(
        position => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        error => console.log(error),
        { enableHighAccuracy: true, maximumAge: 2000, timeout: 20000 }
      );
    }

    componentWillUnmount() {
      navigator.geolocation.clearWatch(this.watchId);
    }

    render() {
      return <WrappedComponent
      latitude={this.state.latitude}
      longitude={this.state.longitude}
      />
    }
  };
}

export default genericContainer;
