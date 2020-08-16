import React from "react";
import "../css/AppStyle.css";

class Result extends React.Component {
  ontryAgainClick = () => {
    this.props.history.push({
      pathname: "/",
    });
  };

  render() {
    const isSuccess =
      this.props.history.location.state.response.status === "success"
        ? true
        : false;
    const successMsg =
      "Success! Congratulations on Finding Falcone. King Shan is mighty pleased.";
    const failureMsg = "Falcone is not found! Please try again.";
    const planet = this.props.history.location.state.response.planet_name;

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
