import React from "react";
import Destinations from "./components/Destinations";
import "./css/AppStyle.css"
class App extends React.Component {
  state = {
    planets: {},
    destinations: {
      destination1: "",
      destination2: "",
      destination3: "",
      destination4: "",
    },
    selectedPlanets: [],
    vehicles: {},
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
  };

  fetchVehicles = () => {
    const vehicleUrl = "https://findfalcone.herokuapp.com/vehicles";
    fetch(vehicleUrl)
      .then((response) => response.json())
      .then((vehicles) => this.setState({ vehicles }));
  };

  destinationSelected = (selectedDestination, selectedPlanet) => {
    if (selectedDestination){
      const destinations = {...this.state.destinations}
      destinations[selectedDestination] = {selectedPlanet};
      this.setState({ destinations });
      this.removeFromPlanetList();
    }
    
  };
  vehicleSelected = (selectedDestination, selectedVehicle) => {
    if (selectedVehicle){
    const destinations = {...this.state.destinations}
      destinations[selectedDestination]["selectedVehicle"] = selectedVehicle;
      this.setState({ destinations });
    }
  }

  removeFromPlanetList =() => {
    let planetList = this.state.planets;
    let unSelectedPlanets;
    let selectedPlanets = [];
    Object.keys(this.state.destinations).map(destination => {
      selectedPlanets.push(this.state.destinations[destination].selectedPlanet);
    });
    this.setState({selectedPlanets});
  }

  render() {
    return (
      <>
        <h1 className="header">Finding Falcone!</h1>
        {this.state.planets.length > 0 && this.state.vehicles.length > 0 ? (
          <ul className="destinationList">
            {Object.keys(this.state.destinations).map((dest) => (
              <Destinations
                key={dest}
                index={dest}
                planets={this.state.planets}
                vehicles={this.state.vehicles}
                destinationSelected={this.destinationSelected}
                vehicleSelected ={this.vehicleSelected}
              ></Destinations>
            ))}
          </ul>
        ) : (<p></p>)}
        
      </>
    );
  }
}

export default App;
