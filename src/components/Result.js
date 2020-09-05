import React from "react";
import "../css/AppStyle.css";
import PropTypes from "prop-types";
import {SUCCESS_MSG, FAILED_MSG} from "../store/constants";
import Button from '@material-ui/core/Button';
import "../css/AppStyle.css";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";


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
      <Grid container spacing={3} justify="center" alignItems="center">
          <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card variant="outlined" className="resultDiv">
        {!isSuccess ? 
        (
          <CardContent>
          <Typography color="textSecondary">{failureMsg}</Typography>
          </CardContent>
        ) : 
        (
          <CardContent>
            <Typography color="textSecondary">{successMsg}</Typography>
            <br/>
            <Typography color="textSecondary" gutterBottom> Time Taken </Typography>
            <Typography variant="h5" component="h3"> {this.props.history.location.state.timetaken} </Typography>
            <Typography color="textSecondary" gutterBottom> Planet found </Typography>
            <Typography variant="h5" component="h3">
              {planet}
            </Typography>
          </CardContent>
        )}
        <CardActions>
            <Button variant="outlined" color="primary" className="button tryAgainButton" onClick={this.ontryAgainClick}>Start Again</Button>
        </CardActions>
      </Card>
      </Grid>
      </Grid>
    );
  }
}

export default Result;
