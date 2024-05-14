/**
 * This JavaScript module provides a set of functions and configurations for making
 * HTTP requests using Axios. It includes functionality to set authorization tokens,
 * handle network errors, and perform common HTTP request methods such as GET, POST,
 * PUT, DELETE, and making multiple requests in parallel.
 *
 * It also integrates with external modules like Axios, a configuration file (BASE_URL),
 * and a custom 'cookie' module to manage user authentication tokens.
 *
 * @module transport
 */

// Import Axios for making HTTP requests
import axios from "axios";
// Import BASE_URL and showErrorToast from config and toast respectively
import { BASE_URL } from "./config";
import { showErrorToast } from "../toast/Toast";
// Import the cookie module
import cookie from "./cookie";

// Set the default base URL for Axios
axios.defaults.baseURL = BASE_URL;

// Initialize a default configuration object for Axios
const config = {
  headers: {},
};

// Function to notify about an error
const notifyError = (msg) => {
  console.error(msg);
};

// Error handler for Axios requests
const errorhandler = (error) => {
  if (error.message === "Network Error") {
    notifyError("Network connection lost. Connect and try again");
    showErrorToast("Server connection lost. Connect and try again");

    return;
  }
  // Reject the promise with the error
  return Promise.reject({ ...error });
};

// Success handler for Axios responses
const successHandler = (response) => {
  return response;
};

// Function to set the authorization token in the request headers
const setToken = (config = {}) => {
  config.headers["Accept"] = "application/json";

  // Get the authorization token from the cookie module
  let res = cookie.getCipher();

  if (res) {
    // Set the Authorization header with the token
    const authorizationHeader = `Bearer ${res}`;

    config.headers["Authorization"] = authorizationHeader;
  }

  return config;
};

// Add Axios response interceptor to handle success and error
axios.interceptors.response.use(
  (response) => successHandler(response),
  (error) => errorhandler(error)
);

// Add Axios request interceptor to set the token
axios.interceptors.request.use(
  (config) => setToken(config),
  (error) => Promise.reject(error)
);

// Function to make a POST request
export const post = (route, payload) => {
  new Promise((resolve, reject) => {
    axios
      .post(route, payload)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
  console.log("exceuting post");
};

// Function to make a PUT request
export const put = (route, payload) =>
  new Promise((resolve, reject) => {
    axios
      .put(route, payload)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });

// Function to make a GET request
export const get = (route) =>
  new Promise((resolve, reject) => {
    axios
      .get(route, config)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });

// Function to make a DELETE request
export const delete_request = (route) =>
  new Promise((resolve, reject) => {
    axios
      .delete(route)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });

// Function to make multiple Axios requests simultaneously
export const all = (routes) =>
  new Promise((resolve, reject) => {
    axios
      .all(routes)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
