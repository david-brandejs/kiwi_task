
export default class Status {

  /** 
   * Checks status of a fetch request. Returns json if status code is between 200 and 300, otherwise throws an error.
   * 
   * @param {Object} response - The fetch request response.
   * @returns {Object} JSON Object.
   */
  static checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response.json();
    } else {
      let error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }
}
