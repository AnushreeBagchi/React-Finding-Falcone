import React from "react";

class Destinations extends React.Component {
  render() {
    let planets = this.props.planets;
    let optionItems = planets.map((planet) => (
      <option key={planet.name}>{planet.name}</option>
    ));
    return (
      <>
        <h6> {this.props.index.toUpperCase()} </h6>
        <select onChange={this.props.planetSelected}>
          <option defaultValue>Select Destination</option>
          {optionItems}
        </select>
      </>
    );
  }
}
export default Destinations;
