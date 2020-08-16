import React from "react";
import Destinations from "./Destinations";
import "../css/AppStyle.css";
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
    timetaken: 0,
    selectedPlanets: [],
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
      Object.keys(destinations).forEach((destination) => {
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

      this.setState({ destinations, availablePlanets, selectedPlanets });
    }
  };

  vehicleSelected = (selectedDestination, selectedVehicle, timetaken) => {
    if (selectedVehicle) {
      let destinations = { ...this.state.destinations };
      destinations[selectedDestination].selectedVehicle = selectedVehicle;
      destinations[selectedDestination].timetaken = timetaken;

      let selectedVehiclesList = {};
      let selectedVehicles = [];
      Object.keys(destinations).forEach((key) => {
        let destination = destinations[key];
        let veh = destination.selectedVehicle;
        selectedVehicles.push(veh);
        if (veh) {
          selectedVehiclesList[veh] = selectedVehiclesList[veh]
            ? selectedVehiclesList[veh] + 1
            : 1;
        }
      });

      let availableVehicles = JSON.parse(JSON.stringify(this.state.vehicles));
      availableVehicles.forEach((vehicle) => {
        let selectedCount = 0;
        if (vehicle.name in selectedVehiclesList) {
          selectedCount = selectedVehiclesList[vehicle.name];
          vehicle.total_no = vehicle.total_no - selectedCount;
        }
      });
      this.setState({ destinations, availableVehicles , selectedVehicles});
      this.calculateTimeTaken();
    }
  };

  calculateTimeTaken = () => {
    let timetaken = 0;
    Object.keys(this.state.destinations).forEach((key) => {
      if (this.state.destinations[key]) {
        let curr_time = this.state.destinations[key].timetaken;
        timetaken += curr_time;
      }
    });
    this.setState({ timetaken });
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
    let timetaken = 0;
    this.setState({
      destinations,
      availablePlanets,
      availableVehicles,
      timetaken,
    });
  };

  findFalcone = async () => {
    let responseToken = await this.getToken();
    let requestBody = {
      planet_names : this.state.selectedPlanets,
      vehicle_names : this.state.selectedVehicles,
      token : responseToken.token
    };

    const response = await fetch("https://findfalcone.herokuapp.com/find", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(requestBody),
    }).then((response) => response.json());
    this.goToResult(response);
  };

  getToken = async () => {
    const response = await fetch("https://findfalcone.herokuapp.com/token", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: {},
    }).then((response) => response.json());
    return response;
  };

  goToResult = (response) => {
    this.props.history.push({
      pathname: "/result/",
      state: {
        response: response,
        timetaken: this.state.timetaken,
      },
    });
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
        <div>Time Taken : {this.state.timetaken}</div>
        <button className="resetButton" onClick={this.onReset}>
          Reset
        </button>

        <button className="searchButton" onClick={this.findFalcone}>
          Find Falcone!
        </button>
      </div>
    );
  }
}

export default App;
