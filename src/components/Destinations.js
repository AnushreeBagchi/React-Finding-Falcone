import React from "react";
import "../css/AppStyle.css";
import Vehicle from "../components/Vehicle";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addDestination } from "../store/destinations";

class Destinations extends React.Component {
  static propTypes = {
    planets: PropTypes.array,
    vehicles: PropTypes.array,
    destinationSelected: PropTypes.func,
    vehicleSelected: PropTypes.func,
    index: PropTypes.string,
    destinations: PropTypes.object,
    showVehicle: PropTypes.bool,
  };

  state = {
    selectedPlanet: {},
  };
  onDestinationChange = (event) => {
    let selectedPlanet = this.props.planets.filter(
      (planet) => planet.name === event.currentTarget.value
    );
    this.setState({ selectedPlanet });
    this.props.addDestination({destination : this.props.index, value: event.currentTarget.value})
  };

  render() {
    let planets = this.props.planets;
    let optionItems = planets.map((planet) => (
      <option key={planet.name}>{planet.name}</option>
    ));
    let selectedValue =
      this.props.destinations[this.props.index].selectedPlanet ||
      "Select Destination";

    return (
      <div className="destination">
        <h6> {this.props.index.toUpperCase()} </h6>
        <select onChange={this.onDestinationChange}>
          <option value={selectedValue}>{selectedValue}</option>
          {optionItems}
        </select>
        {this.props.showVehicle && (
          <Vehicle
            vehicles={this.props.vehicles}
            destinationGroup={this.props.index}
            selectedPlanet={this.state.selectedPlanet}
          ></Vehicle>
        )}
      </div>
    );
  }
}
// export default Destinations;

const mapStateToProps = state => ({
  state
});
const mapDispatchToProps = dispatch => ({
  addDestination : (data) => {dispatch(addDestination(data))}
})

export default connect(mapStateToProps, mapDispatchToProps)(Destinations);
