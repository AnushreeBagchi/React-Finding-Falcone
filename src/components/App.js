import React from "react";
import Destinations from "./Destinations";
import "../css/AppStyle.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  fetchPlanets,
  getAvailablePlanets,
  getSelectedPlanets,
} from "../store/actions/planets";
import {
  fetchVehicles,
  getAvailableVehicles,
  getSelectedVehicles,
} from "../store/actions/vehicles";
import { getInitialDestinations, getTimeTaken } from "../store/actions/destinations";
import { findFalcone, getToken } from "../store/actions/findFalcone";
import Button from '@material-ui/core/Button';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Container from "@material-ui/core/Container";

class App extends React.Component {
  static propTypes = {
    history: PropTypes.object,
  };

  async componentDidMount() {
    await this.props.fetchPlanets();
    await this.props.fetchVehicles();
    this.props.getInitialDestinations();
  }

  componentDidUpdate() {
    if (this.props.state.error.error) {
      this.props.history.push({
        pathname: "/error/",
        state: {
          response: this.props.state
        },
      });
    }
  }

  onReset = () => {
    this.props.getInitialDestinations();
  };

  findFalcone = async () => {
    await this.props.getToken();
    if (this.props.state.findFalcone.token){
      let requestBody = {
        token: this.props.state.findFalcone.token.token,
        planet_names: getSelectedPlanets(this.props.state),
        vehicle_names: getSelectedVehicles(this.props.state),
      };
      await this.props.findFalcone(requestBody);
    }    
    
    if (!this.props.state.error.error) {
      this.goToResult();
    }
  };

  goToResult = () => {
    this.props.history.push({
      pathname: "/result/",
      state: {
        response: this.props.state.findFalcone,
        timetaken: getTimeTaken(this.props.state),
      },
    });
  };

  render() {
    return (
      <Container>
      <div className="app">
        
        <h1 className="header">Finding Falcone!</h1>
        {this.props.state.planets.length > 0 &&
        this.props.state.vehicles.length > 0 ? (
             <Grid container spacing={3}>
                {Object.keys(this.props.state.destinations).map((dest) => (
                  <Grid key={dest} item xs = {12} md={6} lg={3}>
                    <Paper className = "paper">
                        <Destinations
                          
                          index={dest}
                          planets={getAvailablePlanets(this.props.state)}
                          vehicles={getAvailableVehicles(this.props.state)}
                        ></Destinations>
                  </Paper>
                  </Grid>
                ))}
              </Grid>
        ) : (
          <p></p>
        )}
        <Grid container spacing={3}>
          <Grid item xs>
            <div>Time Taken : 
              <span className="time"> {getTimeTaken(this.props.state)} </span>
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={1} justify="center"
  alignItems="center">
          <Hidden only={['sm','md','lg','xl']}>
            <Grid item xs = {12}>
              <Button variant="contained" color="primary"  className="button searchButton" onClick={this.findFalcone}>
              Find Falcone!
              </Button>
              
            </Grid>
            <Grid item xs = {12}>
              <Button variant="contained" className="button resetButton" onClick={this.onReset}>
              Reset
              </Button>
            </Grid>
          </Hidden>
          <Hidden only={['xs']}>
            <Grid item xs = {12}>
              <Button variant="contained" className="button resetButton" onClick={this.onReset}>
                Reset
              </Button>
              <Button variant="contained" color="primary"  className="button searchButton" onClick={this.findFalcone}>
                Find Falcone!
              </Button>
            </Grid>
          </Hidden>
        </Grid>
        
        
      </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  state,
});
const mapDispatchToProps = (dispatch) => ({
  fetchPlanets: () => {
    dispatch(fetchPlanets());
  },
  fetchVehicles: () => {
    dispatch(fetchVehicles());
  },
  getInitialDestinations: () => {
    dispatch(getInitialDestinations());
  },
  getToken: () => {
    return dispatch(getToken());
  },
  findFalcone: (data) => {
    return dispatch(findFalcone(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
