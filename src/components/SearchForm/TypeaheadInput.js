import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';

import Api from '../Api.js';

class TypeaheadInput extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      places: [],
      warning: false
    };
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
    Api.fetchData(`https://api.skypicker.com/places?term=${query}&v=2&locale=en`)
      .then(data => this.setState({places: data}))
      .catch(error => this.setState({places: error}));
  }
  
  /** 
   * Updates the search form.
   * 
   * @param {Object} e - the place object.
   */
  _handleChange = e => {
    if(e.length !== 0) {
      this.props.updateSearch(this.props.place, e[0].id);
    }
  }
  
  /** 
   * Changes AsyncTypeahead's class based on input length.
   * 
   * @param {string} e - input event.
   */
  _handleInputChange = e => {
    if(e.length > 0) {
      this.setState({warning: false});
    } else {
      this.setState({warning: true});
    }
  }
  
  render() {
    return (
      <div className="form-group col-md-3">
        <label>{ this.props.label }</label>
        <AsyncTypeahead
          className={this.state.warning ? "warning" : ""} 
          isLoading
          options={this.state.places}
          labelKey="value"
          minLength={0}
          filterBy={["value", "id"]}
          onSearch={this._handleSearch}
          onChange={this._handleChange}
          onInputChange={this._handleInputChange}
          placeholder={"Enter " + this.props.place}
          renderMenuItemChildren={this._renderMenuItemChildren}
        />
      </div>
    )
  }
}

TypeaheadInput.propTypes = {
  place: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  updateSearch: PropTypes.func.isRequired
};

export default TypeaheadInput;