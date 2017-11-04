import React, { Component } from 'react';
import './App.css';

import {AsyncTypeahead} from 'react-bootstrap-typeahead';

class App extends Component {
  constructor() {
    super();
    
    this.state = {
      places: [],
      flights: [],
      origin: '',
      destination: '',
      dateFrom: '',
      returnTo: ''
    };
  }
  
  /** 
   * Checks status of a fetch request. Returns json if status code is between 200 and 300, otherwise throws an error.
   * 
   * @param {Object} response - The fetch request response.
   * @returns {Object} JSON Object.
   */
  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response.json();
    } else {
      let error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }
  
  /** 
   * Renders menu of an autocomplete input.
   * 
   * @param {Object} option - The menu item.
   * @returns {Object} HTML with data.
   */
  _renderMenuItemChildren(option) {
    return (
      <div>
        {option.value} {option.parentId}
        <div>
          <small>ID: {option.id}</small>
        </div>
      </div>
    );
  }

  /** 
   * Fetches places for an autocomplete input.
   * 
   * @param {string} query - The term to search for.
   */
  _handleSearch = query => {
    fetch(`https://api.skypicker.com/places?term=${query}&v=2&locale=en`)
      .then(this.checkStatus)
      .then(data => this.setState({places: data}));
  }
  
  /** 
   * Transforms UTC seconds to hours and minutes.
   * 
   * @param {number} utc - The number of miliseconds.
   * @returns {string} time in hours and minutes.
   */
  setTime(utc) {
    let newTime = new Date(0);
    newTime.setUTCSeconds(utc);
    return newTime.getUTCHours() + ':' + this.addZeroToTime(newTime.getUTCMinutes());
  }
  
  /** 
   * Transforms UTC seconds to days and months.
   * 
   * @param {number} utc - The number of miliseconds.
   * @returns {string} date in days and months.
   */
  setDate(utc) {
    let newDate = new Date(0);
    newDate.setUTCSeconds(utc);
    return newDate.getUTCDate() + '. ' + (newDate.getUTCMonth() + 1) + '.';
  }
  
  /** 
   * Adds a zero to a minute lower than 10.
   * 
   * @param {number} minute - minute.
   * @returns minute with appended zero.
   */
  addZeroToTime(minute) {
    if (minute < 10) {
        minute = "0" + minute;
    }
    return minute;
  }
  
  /** 
   * Fetches flight results.
   * 
   * @param {string} origin - Orgin place.
   * @param {string} destination - Destination place.
   * @param {string} dateFrom - Departure date.
   * @param {string} returnTo - Return date.
   */
  searchFlights(origin, destination, dateFrom, returnTo) {
    // check if all inputs were entered
    if (origin && destination && dateFrom && returnTo) {
  
      // turn dates to DD/MM/YYYY format
      dateFrom = new Date(dateFrom);
      dateFrom = dateFrom.toLocaleDateString("en-GB");
      returnTo = new Date(returnTo);
      returnTo = returnTo.toLocaleDateString("en-GB");
      
      // a range picker input should be implemented instead of choosing flights on a specific day (see dateTo=${dateFrom}, returnFrom=${returnTo})
      fetch(`https://api.skypicker.com/flights?v=2&locale=en&flyFrom=${origin}&to=${destination}&dateFrom=${dateFrom}&dateTo=${dateFrom}&typeFlight=return&returnFrom=${returnTo}&returnTo=${returnTo}`)
        .then(this.checkStatus)
        .then(data => { 
          let flightNodes = data.data.map(flight => {
            return (
              <li className="list-group-item" key={ flight.id }>
                <div className="d-flex flex-row justify-content-around">
                  <div className="d-flex flex-column">
                    <div className="p-2">
                      { flight.route[0].cityFrom + ' -> ' + flight.route[0].cityTo }
                    </div>
                    <div className="p-2 break-line">
                      { flight.fly_duration }
                    </div>
                    
                    <div className="p-2">
                      { flight.route[1].cityFrom + ' -> ' + flight.route[1].cityTo }
                    </div>
                    <div className="p-2">
                      { flight.return_duration }
                    </div>
                  </div>
                  
                  <div className="d-flex flex-column">
                    <div className="p-2">
                      { this.setTime(flight.route[0].dTimeUTC) + ' - ' + this.setTime(flight.route[0].aTimeUTC) }
                    </div>
                    <div className="p-2 break-line">
                      { this.setDate(flight.route[0].dTimeUTC) + ' - ' + this.setDate(flight.route[0].aTimeUTC) }
                    </div>

                    <div className="p-2">
                      { this.setTime(flight.route[1].dTimeUTC) + ' - ' + this.setTime(flight.route[1].aTimeUTC) }
                    </div>
                    <div className="p-2">
                      { this.setDate(flight.route[1].dTimeUTC) + ' - ' + this.setDate(flight.route[1].aTimeUTC) }
                    </div>
                  </div>
                  
                  <div className="d-flex flex-column align-self-center">
                    <div className="d-2 align-self-center">
                      { flight.price + ' ' + data.currency }
                    </div>
                    <div className="d-2 align-self-center">
                      <button className="btn btn-primary book-button" type="button" disabled>Book</button>
                    </div>
                  </div>
                </div>
              </li>
            );
          });

          this.setState({flights: flightNodes});
        });
    }
  }
  
  /** 
   * Renders the app.
   * 
   * @returns {Object} app UI.
   */
  render() {
    return (
      <div className="container">
        <form className="flight-search-form">
          <div className="form-row">
            <div className="form-group col-md-3">
              <label>Origin</label>
              <AsyncTypeahead
                isLoading
                options={this.state.places}
                labelKey="value"
                minLength={0}
                filterBy={["value", "id"]}
                onSearch={this._handleSearch}
                onChange={e => this.setState({origin: e[0].id})}
                placeholder="Enter Origin"
                renderMenuItemChildren={this._renderMenuItemChildren}
              />
            </div>
            <div className="form-group col-md-3">
              <label>Destination</label>
              <AsyncTypeahead
                isLoading
                options={this.state.places}
                labelKey="value"
                minLength={0}
                filterBy={["value", "id"]}
                onSearch={this._handleSearch}
                onChange={e => this.setState({destination: e[0].id})}
                placeholder="Enter Destination"
                renderMenuItemChildren={this._renderMenuItemChildren}
              />
            </div>
            <div className="form-group col-md-3">
              <label>Departure</label>
              <input type="date" className="form-control" onChange={e => this.setState({dateFrom: e.target.value})}/>
            </div>
            <div className="form-group col-md-3">
              <label>Return</label>
              <input type="date" className="form-control" onChange={e => this.setState({returnTo: e.target.value})}/>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group col-md-12 text-center">
              <input className="btn btn-primary col-md-3" type="button" value="Submit"
              onClick={this.searchFlights.bind(this, this.state.origin, this.state.destination, this.state.dateFrom, this.state.returnTo)} />
            </div>
          </div>
          
        </form>
        
        <h1>Flights</h1>
        
        { this.state.flights == false && <p className="flights-found">No flights found.</p> }
        
        <ul className="list-group flight-list">
          { this.state.flights }
        </ul>
      </div>
    );
  }
}

export default App;