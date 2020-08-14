import React from "react";
import "../css/AppStyle.css";
import Vehicle from "../components/Vehicle";

class Destinations extends React.Component {
  onDestinationChange = (event) => {
    this.props.destinationSelected(this.props.index, event.currentTarget.value);
  };
  vehicleSelected = (event) => {
    this.props.vehicleSelected(this.props.index,event.currentTarget.value);
  }
  render() {
    let planets = this.props.planets;
    let optionItems = planets.map((planet) => (
      <option key={planet.name}>{planet.name}</option>
    ));
    return (
      <div className="destination">
        <h6> {this.props.index.toUpperCase()} </h6>
        <select onChange={this.onDestinationChange}>
          <option defaultValue>Select Destination</option>
          {optionItems}
        </select>
          <Vehicle
                vehicles={this.props.vehicles}
                vehicleSelected={this.vehicleSelected}
              ></Vehicle>
      </div>
    );
  }
}
export default Destinations;
