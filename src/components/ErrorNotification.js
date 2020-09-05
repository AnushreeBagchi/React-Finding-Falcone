import React from "react";
import {resetError} from "../store/actions/errors";
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';
import "../css/AppStyle.css";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

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
                <div className="errorDiv">
                  <Grid item xs={3}>
                  <Paper className="error">
                  <h2>{error}</h2>
                  <Button variant="contained" className="button" color="primary" onClick={this.ontryAgainClick}>Try Again</Button>
                  </Paper>
                  </Grid>
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
  