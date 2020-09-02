import React from "react";
import "../css/AppStyle.css";
import PropTypes from "prop-types";

class Result extends React.Component {
  static propTypes = {
    history: PropTypes.object,
  };

  ontryAgainClick = () => {
    this.props.history.push({
      pathname: "/",
    });
  };

  render() {
    const isSuccess =
      this.props.location.state.response.result.status === "success"
        ? true
        : false;
    const successMsg =
      "Success! Congratulations on Finding Falcone. King Shan is mighty pleased.";
    const failureMsg = "Falcone is not found! Please try again.";
    const planet = this.props.history.location.state.response.result.planet_name;

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
        <button onClick={this.ontryAgainClick}>Start Again</button>
      </div>

    );
  }
}

export default Result;
