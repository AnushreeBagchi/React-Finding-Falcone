import React from "react";
import Destinations from "./Destinations";
import "../css/AppStyle.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {fetchPlanets, getAvailablePlanets } from "../store/planets/planets";
import { fetchVehicles , getAvailableVehicles} from "../store/vehicles/vehicles";
import { getInitialDestinations } from "../store/destinations/destinations";
import { findFalcone } from "../store/findFalcone";


class App extends React.Component {
  static propTypes = {
    history: PropTypes.object,
  };
  
  async componentDidMount() {
    await this.props.fetchPlanets();
    await this.props.fetchVehicles();
    this.props.getInitialDestinations();
  }
  
  getTimeTaken = () => {
    let timetaken = 0;
    Object.keys(this.props.state.destinations).forEach((key) => {
      if (this.props.state.destinations[key]) {
        let curr_time = this.props.state.destinations[key].timetaken;
        if (curr_time) {
          timetaken += curr_time;
        }
      }
    });
    return timetaken;
  };

  onReset = () => {
    this.props.getInitialDestinations();
  };

  findFalcone = async () => {
    let selectedPlanets = [];
    let selectedVehicles = [];
    let destinations = this.props.state.destinations;
    Object.keys(destinations).forEach(key => {
      let dest = destinations[key];
      if (dest.selectedPlanet && dest.selectedVehicle ){
        selectedPlanets.push(dest.selectedPlanet);
        selectedVehicles.push(dest.selectedVehicle);
      }
    })

    let requestBody = {
      planet_names: selectedPlanets,
      vehicle_names: selectedVehicles,
    };
    this.props.findFalcone(requestBody).then(response => this.goToResult());
  };

  goToResult = () => {
    this.props.history.push({
      pathname: "/result/",
      state: {
        response: this.props.state.findFalcone,
        timetaken: this.getTimeTaken(),
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
              ></Destinations>
            ))}
          </ul>
        ) : (
          <p></p>
        )}
        <div>Time Taken : {this.getTimeTaken()}</div>
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
  getInitialDestinations : () => {dispatch(getInitialDestinations())},
  findFalcone : (data) => {return dispatch(findFalcone(data))}
})

export default connect(mapStateToProps, mapDispatchToProps)(App);