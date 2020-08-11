import React from "react";
import Planets from "./components/Planets";
import Destinations from "./components/Destinations";
class App extends React.Component {
  state = {
    planets: {},
    destinations: {
      destination1 : {},
      destination2 : {},
      destination3 : {},
      destination4 : {}
    },
    vehicles: {}
  };
  componentDidMount() {
    this.fetchPlanets();
    this.fetchVehicles();
  }

  fetchPlanets = () => {
    const planetUrl = "https://findfalcone.herokuapp.com/planets";
    fetch(planetUrl)
      .then((response) => response.json())
      .then((planets) => this.setState({ planets }));
  }

  fetchVehicles = () => {
    const vehicleUrl = "https://findfalcone.herokuapp.com/vehicles";
    fetch(vehicleUrl)
      .then((response) => response.json())
      .then((vehicles) => this.setState({ vehicles }));
  }

  planetSelected = (event) => {
    let selectedPlanet = event.currentTarget.value;
    console.log(selectedPlanet);
  }
  render() {
    return (
      <>
        <h1 className="header">Finding Falcone!</h1>
        {this.state.planets.length>0 ? <ul className="destinationList">
          
          {Object.keys(this.state.destinations).map((dest) => (
            <Destinations
              key={dest}
              index={dest}
              planets={this.state.planets}
              planetSelected={this.planetSelected}
            ></Destinations>
          ))}
        </ul> : <p></p>}
        
      </>
    );
  }
}

export default App;
