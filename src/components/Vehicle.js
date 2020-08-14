import React from "react";
import "../css/AppStyle.css";
class Vehicle extends React.Component {
   
  render() {
    const vehicles = this.props.vehicles;
    return (
      <div>
        {vehicles.map((vehicle) => {
            const index = vehicles.indexOf(vehicle);
          return <div key={index}>
            <input key={vehicles.indexOf(vehicle)} 
            type="radio" value={vehicle.name} onClick={this.props.vehicleSelected}/> {vehicle.name}
          </div>
        })}
      </div>
    );
  }
}
export default Vehicle;
