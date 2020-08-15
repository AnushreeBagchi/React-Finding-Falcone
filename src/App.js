import React from "react";
import Destinations from "./components/Destinations";
import "./css/AppStyle.css";
class App extends React.Component {
  state = {
    planets: {},
    destinations: {
      destination1: "",
      destination2: "",
      destination3: "",
      destination4: "",
    },
    availablePlanets: {},
    vehicles: {},
    availableVehicles: {},
  };
  componentDidMount() {
    this.fetchPlanets();
    this.fetchVehicles();
  }

  fetchPlanets = () => {
    const planetUrl = "https://findfalcone.herokuapp.com/planets";
    fetch(planetUrl)
      .then((response) => response.json())
      .then((planets) =>
        this.setState({ planets: planets, availablePlanets: planets })
      );
  };

  fetchVehicles = () => {
    const vehicleUrl = "https://findfalcone.herokuapp.com/vehicles";
    fetch(vehicleUrl)
      .then((response) => response.json())
      .then((vehicles) =>
        this.setState({ vehicles: vehicles, availableVehicles: vehicles })
      );
  };

  destinationSelected = (selectedDestination, selectedPlanet) => {
    if (selectedDestination) {
      let destinations = { ...this.state.destinations };
      destinations[selectedDestination] = { selectedPlanet, showVehicle: true };

      // updating selected planet array
      let selectedPlanets = [];
      Object.keys(destinations).map((destination) => {
        let planet = destinations[destination].selectedPlanet;
        if (planet) {
          selectedPlanets.push(planet);
        }
      });

      //getting the unselected planets
      let availablePlanets = [];
      Object.keys(this.state.planets).forEach((planet) => {
        if (!selectedPlanets.includes(this.state.planets[planet].name)) {
          availablePlanets.push(this.state.planets[planet]);
        }
      });

      this.setState({ destinations, availablePlanets });
    }
  };

  vehicleSelected = (selectedDestination, selectedVehicle) => {
    if (selectedVehicle) {
      let destinations = { ...this.state.destinations };
      destinations[selectedDestination].selectedVehicle = selectedVehicle;

      let selectedVehiclesList = {};
      Object.keys(destinations).forEach(key => {
        let destination = destinations[key];
        let veh = destination.selectedVehicle;
        if (veh) {
          selectedVehiclesList[veh] = selectedVehiclesList[veh]
            ? selectedVehiclesList[veh] + 1
            : 1;
        }
      });

      let availableVehicles = JSON.parse(JSON.stringify(this.state.availableVehicles));
      availableVehicles.forEach(vehicle => {
        let selectedCount = 0;
        if (vehicle.name in selectedVehiclesList) {
          selectedCount = selectedVehiclesList[vehicle.name];
          vehicle.total_no =  vehicle.total_no-selectedCount > 0 ? vehicle.total_no-selectedCount : 0;
        }
      })


      this.setState({ destinations , availableVehicles});
    }
  };
  onReset = () => {
    let destinations = {
      destination1: "",
      destination2: "",
      destination3: "",
      destination4: "",
    };
    let availablePlanets = JSON.parse(JSON.stringify(this.state.planets)); //resetting available planets
    let availableVehicles = JSON.parse(JSON.stringify(this.state.vehicles)); //resetting available vehicles

    this.setState({ destinations, availablePlanets ,availableVehicles});
  };

  render() {
    return (
      <div className="app">
        <h1 className="header">Finding Falcone!</h1>
        {this.state.planets.length > 0 && this.state.vehicles.length > 0 ? (
          <ul className="destinationList">
            {Object.keys(this.state.destinations).map((dest) => (
              <Destinations
                key={dest}
                index={dest}
                planets={this.state.availablePlanets}
                vehicles={this.state.availableVehicles}
                destinations={this.state.destinations}
                destinationSelected={this.destinationSelected}
                vehicleSelected={this.vehicleSelected}
                showVehicle={this.state.destinations[dest].showVehicle}
              ></Destinations>
            ))}
          </ul>
        ) : (
          <p></p>
        )}
        <button className="resetButton" onClick={this.onReset}>
          Reset
        </button>

        <button className="searchButton">Find Falcone!</button>
      </div>
    );
  }
}

export default App;
