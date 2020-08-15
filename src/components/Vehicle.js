import React from "react";
import "../css/AppStyle.css";
class Vehicle extends React.Component {
  render() {
    const vehicles = this.props.vehicles;
    return (
      <div className="vehicleList">
        {vehicles.map((vehicle) => {
          const index = vehicles.indexOf(vehicle);
          return (
            <div key={index}>
              <input
                key={vehicles.indexOf(vehicle)}
                type="radio"
                value={vehicle.name}
                name="vehicle"
                onClick={this.props.vehicleSelected}
                disabled = {vehicle.total_no===0 ? true: false}
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
