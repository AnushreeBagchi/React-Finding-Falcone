import React from "react";
import Destinations from "./Destinations";
import "../css/AppStyle.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {fetchPlanets, getAvailablePlanets } from "../store/planets";
import { fetchVehicles , getAvailableVehicles} from "../store/vehicles";
import { getInitialDestinations } from "../store/destinations";


class App extends React.Component {
  static propTypes = {
    history: PropTypes.object,
  };

  state = {
    vehicles: {},
    availableVehicles: [],
    timetaken: 0,
    selectedPlanets: [],
  };
  
  async componentDidMount() {
    await this.props.fetchPlanets();
    await this.props.fetchVehicles();
    this.props.getInitialDestinations();
  }
  
  calculateTimeTaken = () => {
    let timetaken = 0;
    Object.keys(this.props.state.destinations).forEach((key) => {
      if (this.props.state.destinations[key]) {
        let curr_time = this.props.state.destinations[key].timetaken;
        timetaken += curr_time;
      }
    });
    this.setState({ timetaken });
  };

  onReset = () => {
    let destinations = {
      destination1: "",
      destination2: "",
      destination3: "",
      destination4: "",
    };
    let availablePlanets = JSON.parse(JSON.stringify(this.state.planets)); //resetting available planets
    let availableVehicles = JSON.parse(JSON.stringify(this.state.vehicles)); //resetting available vehicles
    let timetaken = 0;
    this.setState({
      destinations,
      availablePlanets,
      availableVehicles,
      timetaken,
    });
  };

  findFalcone = async () => {
    let responseToken = await this.getToken();
    let requestBody = {
      planet_names: this.state.selectedPlanets,
      vehicle_names: this.state.selectedVehicles,
      token: responseToken.token,
    };

    const response = await fetch("https://findfalcone.herokuapp.com/find", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(requestBody),
    }).then((response) => response.json());
    this.goToResult(response);
  };

  getToken = async () => {
    const response = await fetch("https://findfalcone.herokuapp.com/token", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: {},
    }).then((response) => response.json());
    return response;
  };

  goToResult = (response) => {
    this.props.history.push({
      pathname: "/result/",
      state: {
        response: response,
        timetaken: this.state.timetaken,
      },
    });
  };

  render() {
    return (
      <div className="app">
        <h1 className="header">Finding Falcone!</h1>
        {this.props.state.planets.length > 0 && this.props.state.vehicles.length > 0 ? (
          <ul className="destinationList">
            {Object.keys(this.props.state.destinations).map((dest) => (
              <Destinations
                key={dest}
                index={dest}
                planets={getAvailablePlanets(this.props.state)}
                vehicles={getAvailableVehicles(this.props.state)}
                destinations={this.props.state.destinations}
                destinationSelected={this.destinationSelected}
                showVehicle={this.props.state.destinations[dest].showVehicle}
              ></Destinations>
            ))}
          </ul>
        ) : (
          <p></p>
        )}
        <div>Time Taken : {this.state.timetaken}</div>
        <button className="resetButton" onClick={this.onReset}>
          Reset
        </button>
        <button className="searchButton" onClick={this.findFalcone}>
          Find Falcone!
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  state
});
const mapDispatchToProps = dispatch => ({
  fetchPlanets : () => { dispatch(fetchPlanets()) },
  fetchVehicles : () => {dispatch(fetchVehicles())},
  getAvailablePlanets : () => {dispatch(getAvailablePlanets())},
  getInitialDestinations : () => {dispatch(getInitialDestinations())}
})

export default connect(mapStateToProps, mapDispatchToProps)(App);