import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DateInput extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      warning: false
    };
  }

  /** 
   * Updates the search form and changes AsyncTypeahead's class based on input length.
   * 
   * @param {string} e - input event.
   */
  _handleChange = e => {
    this.props.updateSearch(this.props.date, e.target.value)
    
    if(e.target.value.length > 0) {
      this.setState({warning: false});
    } else {
      this.setState({warning: true});
    }
  }
  
  render() {
    return (
      <div className="form-group col-md-3">
        <label>{ this.props.label }</label>
        <input type="date" className={this.state.warning ? "form-control is-invalid" : "form-control" } onChange={this._handleChange} />
      </div>
    )
  }
}

DateInput.propTypes = {
  date: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  updateSearch: PropTypes.func.isRequired
};

export default DateInput;