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

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000, // 5 seconds
});

// Function to notify about an error
export const notifyError = (msg) => {
  console.error(msg);
};

// Error handler for Axios requests
const errorhandler = (error) => {
  if (error.message === "Network Error") {
    notifyError("Network connection lost. Connect and try again");
    showErrorToast("Network connection lost. Connect and try again");

    return;
  }
  if (error.message.includes("timeout")) {
    notifyError("Connection timed out");

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
axiosInstance.interceptors.response.use(
  (response) => successHandler(response),
  (error) => errorhandler(error)
);

// Add Axios request interceptor to set the token
axiosInstance.interceptors.request.use(
  (config) => setToken(config),
  // (response) => successHandler(response),
  (error) => Promise.reject(error)
);

export const post = async (route, payload) => {
  try {
    const response = await axiosInstance.post(route, payload);
    return response; // Return response for success
  } catch (error) {
    // Optional: log or handle specific errors here
    console.error("Post Request Error:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};

export const put = async (route, payload) => {
  try {
    const response = await axiosInstance.put(route, payload);
    return response; // Return response for success
  } catch (error) {
    // Optional: log or handle specific errors here
    console.error("Post Request Error:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};

// Function to make a GET request
export const get = async (route) =>
  await new Promise((resolve, reject) => {
    axiosInstance
      .get(route)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
//    {
//   try {
//     const response = await axiosInstance.get(route);
//     return response; // Return response for success
//   } catch (error) {
//     // Optional: log or handle specific errors here
//     console.error("Post Request Error:", error);
//     throw error; // Re-throw the error for the caller to handle
//   }
// };

// Function to make a DELETE request
export const delete_request = async (route) => {
  try {
    const response = await axiosInstance.delete(route);
    return response; // Return response for success
  } catch (error) {
    // Optional: log or handle specific errors here
    console.error("Post Request Error:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};

// Function to make multiple Axios requests simultaneously
export const all = async (routes) =>
  await new Promise((resolve, reject) => {
    axiosInstance
      .all(routes)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
