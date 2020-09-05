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
import {
  getInitialDestinations,
  getTimeTaken,
} from "../store/actions/destinations";
import { findFalcone, getToken } from "../store/actions/findFalcone";
import { NUMBER_OF_DESTINATIONS } from "../store/constants";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

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
          response: this.props.state,
        },
      });
    }
  }

  onReset = () => {
    this.props.getInitialDestinations();
  };

  isAllSelected = () => {
    let planet_names = getSelectedPlanets(this.props.state);
    let vehicle_names = getSelectedVehicles(this.props.state);
    return planet_names.length === NUMBER_OF_DESTINATIONS &&
      vehicle_names.length === NUMBER_OF_DESTINATIONS 
  };

  findFalcone = async () => {
    await this.props.getToken();
    if (this.props.state.findFalcone.token) {
      let requestBody = {
        token: this.props.state.findFalcone.token.token,
        planet_names: getSelectedPlanets(this.props.state),
        vehicle_names: getSelectedVehicles(this.props.state),
      };
      await this.props.findFalcone(requestBody);
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
          <header className="header">Finding Falcone!</header>
          {this.props.state.planets.length > 0 &&
          this.props.state.vehicles.length > 0 ? (
            <Grid container spacing={3}>
              {Object.keys(this.props.state.destinations).map((dest) => (
                <Grid key={dest} item xs={12} md={6} lg={3}>
                  <Paper className="paper">
                    <Destinations
                      index={dest}
                      planets={getAvailablePlanets(this.props.state)}
                      vehicles={getAvailableVehicles(this.props.state)}
                    ></Destinations>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          ) : <CircularProgress />
          }
          <Grid container spacing={3} justify="center" alignItems="center">
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Card variant="outlined">
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Time Taken
                  </Typography>
                  <Typography variant="h5" component="h2">
                    {getTimeTaken(this.props.state)}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    disabled ={!this.isAllSelected()}
                    variant="outlined"
                    size="medium"
                    color="primary"
                    onClick={this.findFalcone}
                  >
                    Find Falcone
                  </Button>
                  <Button size="medium" onClick={this.onReset}>
                    Reset
                  </Button>
                </CardActions>
              </Card>
            </Grid>
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
