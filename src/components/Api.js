import 'whatwg-fetch';

export default class Api {

  /** 
   * Fetches data.
   * 
   * @param {string} url - url of the fetch request.
   * @returns {Object} JSON Object.
   */
  static fetchData(url) {
    return fetch(url)
      .then(this.checkStatus)
      .then(response => response.json());
  }

  /** 
   * Checks status of a fetch request. Returns json if status code is between 200 and 300, otherwise throws an error.
   * 
   * @param {Object} response - The fetch request response.
   * @returns {Object} JSON Object.
   */
  static checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      let error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }
}
