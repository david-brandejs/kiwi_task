import React, { Component } from 'react';
import"./App.css";

import SearchForm from './components/SearchForm/SearchForm.js';
import FlightsList from './components/FlightsList/FlightsList.js';

class App extends Component {
  constructor(props) {
    super(props);
    
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