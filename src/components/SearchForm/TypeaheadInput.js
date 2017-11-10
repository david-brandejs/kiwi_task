import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'whatwg-fetch';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';

import Status from '../Status.js';

class TypeaheadInput extends Component {
  constructor() {
    super();
    
    this.state = {
      places: []
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
    fetch(`https://api.skypicker.com/places?term=${query}&v=2&locale=en`)
      .then(Status.checkStatus)
      .then(data => this.setState({places: data}));
  }
  
  render() {
    return (
      <AsyncTypeahead
        isLoading
        options={this.state.places}
        labelKey="value"
        minLength={0}
        filterBy={["value", "id"]}
        onSearch={this._handleSearch}
        onChange={e => this.props.updateSearch(this.props.place, e[0].id)}
        placeholder={"Enter " + this.props.place}
        renderMenuItemChildren={this._renderMenuItemChildren}
      />
    )
  }
}

TypeaheadInput.propTypes = {
  place: PropTypes.string.isRequired,
  updateSearch: PropTypes.func.isRequired
};

export default TypeaheadInput;