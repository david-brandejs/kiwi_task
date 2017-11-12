import React, { Component } from 'react';

import SearchForm from './components/SearchForm/SearchForm.js';
import FlightsList from './components/FlightsList/FlightsList.js';

require("./App.less");

class App extends Component {
  constructor() {
    super();
    
    this.state = {
      flights: []
    };
  }
  
  handleFlightsUpdate = (flights) => {
    this.setState({
      flights: flights
    });
  }
  
  render() {
    return (
      <div className="container">
        
        <SearchForm updateFlights={this.handleFlightsUpdate}/>
        
        <FlightsList flights={this.state.flights}/>
        
      </div>
    );
  }
}

export default App;