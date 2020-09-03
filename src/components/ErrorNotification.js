import React from "react";
import {resetError} from "../store/actions/errors";
import { connect } from "react-redux";

class ErrorNotification extends React.Component{
    
    ontryAgainClick = () => {
        this.props.history.push({
          pathname: "/"
        });
        this.props.resetError();
      };

    render() {
        const error = this.props.location.state.response.error.error;
        return (
            <>
              {error && (
                <div className="error">
                  <span>{error}</span>
                  <button onClick={this.ontryAgainClick}>Try Again</button>
                </div>
              )}
            </>
          );
    };
}
const mapStateToProps = (state) => ({
    state,
  });
  const mapDispatchToProps = (dispatch) => ({
    resetError: () => {
      dispatch(resetError());
    }
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(ErrorNotification);
  