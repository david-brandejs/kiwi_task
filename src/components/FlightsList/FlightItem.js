import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FlightItem extends Component {
  
  /** 
   * Transforms UTC seconds to hours and minutes.
   * 
   * @param {number} utc - The number of miliseconds.
   * @returns {string} time in hours and minutes.
   */
  setTime(utc) {
    let newTime = new Date(0);
    newTime.setUTCSeconds(utc);
    
    let minutes = newTime.getUTCMinutes();
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    
    return newTime.getUTCHours() + ':' + minutes;
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
  
  render() {
    return (
      <li className="list-group-item">
        <div className="d-flex flex-row justify-content-around">
          <div className="d-flex flex-column">
            <div className="p-2">
              { this.props.route[0].cityFrom + ' -> ' + this.props.route[0].cityTo }
            </div>
            <div className="p-2 break-line">
              { this.props.fly_duration }
            </div>

            <div className="p-2">
              { this.props.route[1].cityFrom + ' -> ' + this.props.route[1].cityTo }
            </div>
            <div className="p-2">
              { this.props.return_duration }
            </div>
          </div>

          <div className="d-flex flex-column">
            <div className="p-2">
              { this.setTime(this.props.route[0].dTimeUTC) + ' - ' + this.setTime(this.props.route[0].aTimeUTC) }
            </div>
            <div className="p-2 break-line">
              { this.setDate(this.props.route[0].dTimeUTC) + ' - ' + this.setDate(this.props.route[0].aTimeUTC) }
            </div>

            <div className="p-2">
              { this.setTime(this.props.route[1].dTimeUTC) + ' - ' + this.setTime(this.props.route[1].aTimeUTC) }
            </div>
            <div className="p-2">
              { this.setDate(this.props.route[1].dTimeUTC) + ' - ' + this.setDate(this.props.route[1].aTimeUTC) }
            </div>
          </div>

          <div className="d-flex flex-column align-self-center">
            <div className="d-2 align-self-center">
              { this.props.price + ' EUR' }
            </div>
            <div className="d-2 align-self-center">
              <button className="btn btn-primary book-button" type="button" disabled>Book</button>
            </div>
          </div>
        </div>
      </li>
    )
  }
}

FlightItem.propTypes = {
  route: PropTypes.arrayOf(PropTypes.shape({
    cityFrom: PropTypes.string.isRequired,
    cityTo: PropTypes.string.isRequired,
    aTimeUTC: PropTypes.number.isRequired,
    dTimeUTC: PropTypes.number.isRequired
  })).isRequired,
  fly_duration: PropTypes.string.isRequired,
  return_duration: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
};

export default FlightItem;