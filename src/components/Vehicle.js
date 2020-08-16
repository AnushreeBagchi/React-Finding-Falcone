import React from "react";
import "../css/AppStyle.css";
import PropTypes from "prop-types";

class Vehicle extends React.Component {
  static propTypes = {
    selectedPlanet: PropTypes.array,
    vehicles: PropTypes.array,
    onVehicleSelect: PropTypes.func,
    destinationGroup: PropTypes.string,
  };

  onVehicleSelect = (event) => {
    let distance = this.props.selectedPlanet[0].distance;
    let vehicleObj = this.props.vehicles.filter(
      (veh) => veh.name === event.target.value
    );
    let speed = vehicleObj[0].speed;
    let time = distance / speed;
    this.props.onVehicleSelect(event, time);
  };
  render() {
    const vehicles = this.props.vehicles;
    return (
      <div className="vehicleList">
        {vehicles.map((vehicle) => {
          let index = vehicles.indexOf(vehicle);
          let isRangeLess =
            this.props.selectedPlanet[0].distance > vehicle.max_distance;
          return (
            <div key={index}>
              <input
                key={vehicles.indexOf(vehicle)}
                type="radio"
                value={vehicle.name}
                name={this.props.destinationGroup}
                onClick={this.onVehicleSelect}
                speed={vehicle.speed}
                disabled={vehicle.total_no === 0 || isRangeLess ? true : false}
              />
              {`${vehicle.name} (${vehicle.total_no})`}
            </div>
          );
        })}
      </div>
    );
  }
}
export default Vehicle;
