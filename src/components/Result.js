import React from "react";

class Result extends React.Component {
    findFalcone = async () => {
        let requestBody = this.getFindFalconeRequestBody() || {};
        let responseToken = await this.getToken();
        requestBody.token = responseToken.token;
        console.log(requestBody);
  
        const response = await fetch("https://findfalcone.herokuapp.com/find", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "Accept" : "application/json"
          },
          body: JSON.stringify(requestBody) 
        }).then(response => response.json());
  
        if(response && response.status==="success"){
          console.log(`Congratulation!! Falcone is found in ${response.planet_name}`);
          this.goToResult();
        } else if (response.status==="false") {
          console.log("Sorry Falcone is not found. Try again");
        }
  
    }
  
    getToken = async () => {
      const response = await fetch("https://findfalcone.herokuapp.com/token", {
        method: 'POST', 
        headers: {
          "Accept" : "application/json"
        },
        body: {}
      }).then(response =>  response.json());
      return response;
    }
  
    getFindFalconeRequestBody = () => {
      let planet_names = [];
      let vehicle_names = [];
      Object.keys(this.state.destinations).forEach(key => {
        let dest = this.state.destinations[key];
        if (dest.selectedPlanet && dest.selectedVehicle) {
          planet_names.push(dest.selectedPlanet);
          vehicle_names.push(dest.selectedVehicle);
        }
      });
      let requestBody = {
        planet_names, vehicle_names 
      }
      return requestBody;
    }
    
  render() {
    return (
      <>
        <h2>
          Success! Congratulations on Finding Falcone. King Shan is mighty
          pleased.
        </h2>
        <h3>
          Time Taken : {this.props.history.location.state.timetaken}
        </h3>
      </>
    );
  }
}

export default Result;
