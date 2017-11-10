import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'whatwg-fetch';

import TypeaheadInput from './TypeaheadInput.js';
import Status from '../Status.js';

class SearchForm extends Component {
  constructor() {
    super();
    
    this.state = {
      origin: '',
      destination: '',
      dateFrom: '',
      returnTo: ''
    };
  }
  
  /** 
   * Handles the update from the search form inputs
   * 
   * @param {string} propertyName - name of the property (origin/destination).
   * @param {string} result - fetched result.
   */
  handleSearchUpdate = (propertyName, result) => {
    this.setState({[propertyName]: result});
  }
  
  /** 
   * Turns date to DD/MM/YYYY format
   * 
   * @param {string} date - date to be transformed.
   * @returns {string} transformed date.
   */
  formatDate(date) {
    date = new Date(date);
    return date.toLocaleDateString("en-GB");
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
    if (true) {
//    if (origin && destination && dateFrom && returnTo) {
  
      // turn dates to DD/MM/YYYY format
      dateFrom = this.formatDate(dateFrom);
      returnTo = this.formatDate(returnTo);
      
      // a range picker input should be implemented instead of choosing flights on a specific day (see dateTo=${dateFrom}, returnFrom=${returnTo})
      fetch(`https://api.skypicker.com/flights?v=2&locale=en&flyFrom=prague_cz&to=paris_fr&dateFrom=18%2F03%2F2018&dateTo=18%2F03%2F2018&typeFlight=return&returnFrom=18%2F03%2F2018&returnTo=18%2F03%2F2018`)
//      fetch(`https://api.skypicker.com/flights?v=2&locale=en&flyFrom=${origin}&to=${destination}&dateFrom=${dateFrom}&dateTo=${dateFrom}&typeFlight=return&returnFrom=${returnTo}&returnTo=${returnTo}`)
        .then(Status.checkStatus)
        .then(data => { 
          this.props.updateFlights(data.data);
        });
    }
  }
  
  render() {
    return (
      <form className="flight-search-form">
        <div className="form-row">
          <div className="form-group col-md-3">
            <label>Origin</label>
            <TypeaheadInput updateSearch={this.handleSearchUpdate} place="origin" />
          </div>
          <div className="form-group col-md-3">
            <label>Destination</label>
            <TypeaheadInput updateSearch={this.handleSearchUpdate} place="destination" />
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
    )
  }
}

SearchForm.propTypes = {
  updateFlights: PropTypes.func.isRequired
};

export default SearchForm;