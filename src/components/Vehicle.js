import React from "react";
import "../css/AppStyle.css";
import PropTypes from "prop-types";
import { vehicleSelected } from "../store/actions/destinations";
import { connect } from "react-redux";

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

class Vehicle extends React.Component {
  static propTypes = {
    vehicles: PropTypes.array,
    destinationGroup: PropTypes.string,
  };

  onVehicleSelect = (event) => {
    let selectedPlanet = this.getCurrentPlanet();
    let distance = selectedPlanet[0].distance;
    let vehicleObj = this.props.vehicles.filter(
      (veh) => veh.name === event.target.value
    );
    let speed = vehicleObj.length ? vehicleObj[0].speed : 1;
    let time = distance / speed;

    this.props.vehicleSelected({
      timetaken: time,
      selectedVehicle: event.target.value,
      destination: this.props.destinationGroup,
    });
  };
  getCurrentPlanet = () => {
    let state = this.props.state;
    let currentDest = this.props.destinationGroup;
    let currentPlanet = state.destinations[currentDest].selectedPlanet;
    return state.planets.filter((planet) => planet.name === currentPlanet);
  };
  getIsRangeLess = (vehicleMaxDistance) => {
    let planet = this.getCurrentPlanet();
    let distance = planet[0] ? planet[0].distance : 0;
    return distance > vehicleMaxDistance;
  };

  render() {
    const vehicles = this.props.vehicles;
    return (
      <div className="vehicleList">
        {vehicles.map((vehicle) => {
          let index = vehicles.indexOf(vehicle);
          let isRangeLess = this.getIsRangeLess(vehicle.max_distance);
          return (
            <div key={index}>
              <FormControlLabel
                  control={<Radio color="primary"/>}
                  label={`${vehicle.name} (${vehicle.total_no})`}
                  key={vehicles.indexOf(vehicle)}
                  type="radio"
                  value={vehicle.name}
                  onClick={this.onVehicleSelect}
                  speed={vehicle.speed}
                  disabled={vehicle.total_no === 0 || isRangeLess ? true : false}
                  />
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  state,
});
const mapDispatchToProps = (dispatch) => ({
  vehicleSelected: (data) => {
    dispatch(vehicleSelected(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Vehicle);
