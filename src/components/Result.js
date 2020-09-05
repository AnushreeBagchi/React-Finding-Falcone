import React from "react";
import "../css/AppStyle.css";
import PropTypes from "prop-types";
import {SUCCESS_MSG, FAILED_MSG} from "../store/constants";
import Button from '@material-ui/core/Button';
import "../css/AppStyle.css";


class Result extends React.Component {
  static propTypes = {
    history: PropTypes.object,
  };

  ontryAgainClick = () => {
    this.props.history.push({
      pathname: "/"
    });
  };

  render() {
    const result = this.props.location.state.response.result;
    const isSuccess =
      result && result.status === "success"
        ? true
        : false;
    const successMsg = SUCCESS_MSG;
    const failureMsg = FAILED_MSG;
    const planet = result && result.planet_name;

    return (
      <div className="resultDiv">
        {!isSuccess ? (
          <h2>{failureMsg}</h2>
        ) : (
          <>
            <h2>{successMsg}</h2>
            <h3>Time Taken :{this.props.history.location.state.timetaken}</h3>
            <h3>Planet found: {planet}</h3>
          </>
        )}
        <Button variant="contained" color="primary" className="button" onClick={this.ontryAgainClick}>Start Again</Button>
      </div>

    );
  }
}

export default Result;
