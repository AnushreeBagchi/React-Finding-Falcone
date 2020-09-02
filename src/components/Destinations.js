import React from "react";
import "../css/AppStyle.css";
import Vehicle from "../components/Vehicle";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addDestination } from "../store/destinations/destinations";

class Destinations extends React.Component {
  static propTypes = {
    planets: PropTypes.array,
    vehicles: PropTypes.array,
    index: PropTypes.string,
  };

  onDestinationChange = (event) => {
    this.props.addDestination({
      destination: this.props.index,
      value: event.currentTarget.value,
    });
  };

  showVehicle = () => {
    let destinations = this.props.state.destinations;
    let currentDest = destinations[this.props.index];
    return currentDest.selectedPlanet ? true : false;
  };

  render() {
    let planets = this.props.planets;
    let optionItems = planets.map((planet) => (
      <option key={planet.name}>{planet.name}</option>
    ));
    let selectedValue =
      this.props.state.destinations[this.props.index].selectedPlanet ||
      "Select Destination";

    return (
      <div className="destination">
        <h6> {this.props.index.toUpperCase()} </h6>
        <select onChange={this.onDestinationChange}>
          <option value={selectedValue}>{selectedValue}</option>
          {optionItems}
        </select>
        {this.showVehicle() && (
          <Vehicle
            vehicles={this.props.vehicles}
            destinationGroup={this.props.index}
          ></Vehicle>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  state,
});
const mapDispatchToProps = (dispatch) => ({
  addDestination: (data) => {
    dispatch(addDestination(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Destinations);
