import Cookies from "js-cookie";

// Define the cookie name used for the project cipher
const projectCipher = "dzidzi-chipher";

class Auth {
  /**
   * Get the project cipher (authentication token) stored in a cookie.
   *
   * @returns {String} The project cipher (token) if it exists, or undefined.
   */
  getCipher() {
    return Cookies.get(projectCipher);
  }

  /**
   * Set the project cipher (authentication token) in a cookie with a specified expiration time.
   *
   * @param {String} token - The project cipher (token) to be stored.
   */
  setCipher(token) {
    // Set the project cipher (token) in a cookie with a 1-hour expiry (expires: 0.041 days)
    Cookies.set(projectCipher, token, { expires: 0.041 * 24 });
  }

  /**
   * Clear (remove) the project cipher (authentication token) stored in the cookie.
   */
  clearCipher() {
    Cookies.remove(projectCipher);
  }
}

// Export an instance of the Auth class to provide a singleton-like pattern.
export default new Auth();
