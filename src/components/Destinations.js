import React from "react";
import "../css/AppStyle.css";
import Vehicle from "../components/Vehicle";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addDestination } from "../store/actions/destinations";
import { SELECT_DEST_MSG } from "../store/constants";

import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import RadioGroup from "@material-ui/core/RadioGroup";

export class Destinations extends React.Component {
  static propTypes = {
    planets: PropTypes.array,
    vehicles: PropTypes.array,
    index: PropTypes.string,
  };

  onDestinationChange = (event) => {
    this.props.addDestination({
      destination: this.props.index,
      value: event.currentTarget.value,
    });
  };

  showVehicle = () => {
    let destinations = this.props.state.destinations;
    let currentDest = destinations[this.props.index];
    return currentDest.selectedPlanet ? true : false;
  };

  getClassName = () => {
    let destinations = this.props.state.destinations;
    let currentDest = destinations[this.props.index];
    return currentDest.selectedVehicle ? "selected" : "unselected";
  };

  render() {
    let planets = this.props.planets;
    let optionItems = planets.map((planet) => (
      <option key={planet.name}>{planet.name}</option>
    ));
    let selectedValue =
      this.props.state.destinations[this.props.index].selectedPlanet ||
      SELECT_DEST_MSG;

    return (
      <div className="destination">
        <FormControl className="destinationSelect">
          <InputLabel className={this.getClassName()} htmlFor="outlined-age-native-simple">
            {SELECT_DEST_MSG}
          </InputLabel>
          <NativeSelect value={selectedValue} onChange={this.onDestinationChange} label="Destination">
            <option value={selectedValue}>{selectedValue}</option>
            {optionItems}
          </NativeSelect>
        </FormControl>

        {this.showVehicle() && (
          <RadioGroup name={this.props.index}>
            <Vehicle vehicles={this.props.vehicles} destinationGroup={this.props.index} ></Vehicle>
          </RadioGroup>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  state,
});
const mapDispatchToProps = (dispatch) => ({
  addDestination: (data) => {
    dispatch(addDestination(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Destinations);
