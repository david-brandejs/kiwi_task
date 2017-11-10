import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FlightItem from './FlightItem.js';

class FlightsList extends Component {
  render() {
    return (
      <div key="flight-list">
        <h1>Flights</h1>

        { this.props.flights == false && <p className="flights-found">No flights found.</p> }

        <ul className="list-group flight-list">
          { this.props.flights.map(engine => <FlightItem {...engine} key={engine.id} />)}
        </ul>
      </div>
    )
  }
}

FlightsList.propTypes = {
  flights: PropTypes.array.isRequired
};

export default FlightsList;