/**
 * This module provides various hooks that use Tanstack Query (formerly React Query)
 * in conjunction with the transport API module for api requests. It sets up queries and mutations
 *  using Tanstack Query while referencing external configurations and API functions.
 *
 * For more information on Tanstack Query, visit the official documentation:
 * https://tanstack.com/
 *
 * Dependencies:
 * - axios: Used for making HTTP requests.
 * - react-query: The core library for managing data fetching and state in this application.
 * - config: Contains configuration details like NO_AUTH_URL and BASE_URL.
 * - transport: Contains API request functions like get, post, and put.
 *
 * Explaining some key terms you will see and what they do
 * queryKey
 * The queryKey in React Query serves as a unique identifier for a specific query or set of queries.
 * It helps React Query keep track of the data associated with a particular query, manage caching,
 * and determine when to refetch data.
 *
 * queryOptions
 * In React Query, the queryOptions object is used to configure the behavior of a query.
 * It allows you to customize various aspects of how a query should work, including its fetching behavior, caching behavior, and more.
 *
 *
 * Example usage:
 * const { data, isLoading, isError } = usePersonalBio();
 * const { mutate } = useVerifyCard();
 *
 * if (isLoading) {
 *   // Handle loading state
 * } else if (isError) {
 *   // Handle error state
 * } else {
 *   // Handle successful data retrieval
 * }
 */

import axios from "axios";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { NO_AUTH_URL } from "../../utils/config";
import { delete_request, get, post, put } from "../../utils/transport";

// const queryOptions = {
//   refetch0nWindowFocus: false,
//   refetchOnmount: false,
//   refetch0nReconnect: false,
//   retry: false,
//   staleTime: 86400000,
// };

export const axiosInstance = axios.create({
  timeout: 5000, // 5 seconds
});

//GET REQUESTS
//get active user
export const useGetActiveUser = () => {
  const queryKey = ["activeUser"];

  let url = `/active-user`;

  const queryFn = () => {
    return get(url);
  };

  const select = (response) => {
    return response?.data;
  };

  return useQuery({
    queryKey,
    queryFn,
    select,
    refetch0nWindowFocus: false,
    refetchOnmount: false,
    refetch0nReconnect: false,
    retry: false,
    staleTime: 0,
  });
};

export const useGetActiveUserDetails = (id) => {
  const queryKey = ["activeuserdetails", id];

  let url = `/user/${id}`;

  const queryFn = () => {
    return get(url);
  };

  const select = (response) => {
    return response?.data;
  };

  const enabled = Boolean(id);

  return useQuery({
    queryKey,
    queryFn,
    select,
    enabled,
    refetch0nWindowFocus: false,
    refetchOnmount: false,
    refetch0nReconnect: false,
    retry: false,
    staleTime: 0,
  });
};

//get all users

const fetchUsers = async ({ pageParam = null, queryKey }) => {
  const [firstName, lastName] = queryKey;
  const limit = 20; // Adjust the limit if necessary
  let url = `/paged-users?limit=${limit}`;

  if (pageParam) {
    url += `&cursor=${encodeURIComponent(pageParam)}`;
  }
  if (firstName) {
    url += `&firstName=${encodeURIComponent(firstName)}`;
  }
  if (lastName) {
    url += `&lastName=${encodeURIComponent(lastName)}`;
  }

  const response = await axios.get(url);
  return response.data;
};

export const useUserList = (firstName, lastName) => {
  const queryKey = ["userList", firstName, lastName];

  // Determine the next page param
  const getNextPageParam = (lastPage) =>
    lastPage.hasNextPage ? lastPage.lastCursor : undefined;

  // Configure options for the useInfiniteQuery hook
  const options = {
    getNextPageParam,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  };

  // Use the useInfiniteQuery hook to manage the paginated query
  return useInfiniteQuery({ queryKey, queryFn: fetchUsers, ...options });
};

export const useUserListPaged = (
  firstName,
  lastName,
  enabled,
  email,
  username,
  userId,
  sortBy,
  orderBy,
  page
) => {
  //queryKey based on the provided parameters.
  const queryKey = [
    "userListPaged",
    firstName,
    lastName,
    enabled,
    email,
    username,
    userId,
    sortBy,
    orderBy,
    page,
  ];

  const fetchUsers = ({ pageParam = page }) => {
    let url = `/paged-users?page=${encodeURIComponent(
      parseInt(pageParam)
    )}&limit=${encodeURIComponent(parseInt(10))}`;

    const queryParams = {
      firstName,
      lastName,
      enabled,
      email,
      username,
      userId,
      sortBy,
      orderBy,
    };

    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value != "") {
        url += `&${key}=${encodeURIComponent(value)}`;
      }
    });

    return get(`${url}`);
  };

  // flag to keep previous data when paginating.
  const keepPreviousData = true;

  // function getNextPageParam to determine the next page to fetch.
  const getNextPageParam = (_lastPage, pages) => {
    // Calculate the number of pages required to fetch all data.
    const numberOfPages = pages?.[0]?.data?.totalPages;

    // If there are more pages to fetch, return the next page number; otherwise, return undefined.
    if (pages.length < numberOfPages) return pages.length + 1;

    return undefined;
  };

  // flag to prevent refetching on window focus.
  const refetchOnWindowFocus = false;

  // Configure options for the useInfiniteQuery hook.
  const options = { getNextPageParam, keepPreviousData, refetchOnWindowFocus };

  // Use the useInfiniteQuery hook to manage the paginated query.
  return useInfiniteQuery({ queryKey, queryFn: fetchUsers, ...options });
};

/// Function to fetch paged restaurants
const fetchRestaurants = async ({ pageParam = null, queryKey }) => {
  const [, name, rating, distance, latitude, longitude, sortBy, orderBy] =
    queryKey;
  const limit = 20; // Adjust the limit if necessary
  let url = `/paged-restaurants?limit=${limit}`;

  const queryParams = {
    name,
    rating,
    distance,
    latitude,
    longitude,
    sortBy,
    orderBy,
    pageParam,
  };

  Object.entries(queryParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url += `&${key}=${encodeURIComponent(value)}`;
    }
  });
  // const queryFn = () => {
  //   return get(url);
  // };

  // if (pageParam) {
  //   url += `&cursor=${encodeURIComponent(pageParam)}`;
  // }

  // if (name) {
  //   url += `&name=${encodeURIComponent(name)}`;
  // }
  // if (rating) {
  //   url += `&rating=${encodeURIComponent(rating)}`;
  // }

  const axiosInstance = axios.create({
    timeout: 5000, // 5 seconds
  });

  const response = await axiosInstance.get(url);
  return response.data;
};

export const useRestaurantList = (
  name,
  rating,
  distance,
  latitude,
  longitude,
  sortBy,
  orderBy
) => {
  const queryKey = [
    "restaurantList",
    name,
    rating,
    distance,
    latitude,
    longitude,
    sortBy,
    orderBy,
  ];

  // Determine the next page param
  const getNextPageParam = (lastPage) =>
    lastPage.hasNextPage ? lastPage.lastCursor : undefined;

  // Pass everything as an object to useInfiniteQuery
  return useInfiniteQuery({
    queryKey, // Pass queryKey as part of the object
    queryFn: fetchRestaurants, // Use queryFn instead of fetch function as the second argument
    getNextPageParam, // getNextPageParam now part of the options object
    keepPreviousData: true, // Other options also as part of the object
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

export const useRestaurantListPaged = (
  name,
  email,
  username,
  rating,
  visible,
  parentRestaurantId,
  distance,
  latitude,
  longitude,
  restaurantId,
  sortBy,
  orderBy,
  page
) => {
  //queryKey based on the provided parameters.
  const queryKey = [
    "restaurantsPaged",
    name,
    email,
    username,
    rating,
    visible,
    parentRestaurantId,
    distance,
    latitude,
    longitude,
    restaurantId,
    sortBy,
    orderBy,
    page,
  ];

  const fetchRestaurants = ({ pageParam = page }) => {
    let url = `/paged-restaurants?page=${encodeURIComponent(
      parseInt(pageParam)
    )}&limit=${encodeURIComponent(parseInt(10))}`;

    const queryParams = {
      name,
      email,
      username,
      rating,
      visible,
      parentRestaurantId,
      distance,
      latitude,
      longitude,
      restaurantId,
      sortBy,
      orderBy,
    };

    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url += `&${key}=${encodeURIComponent(value)}`;
      }
    });

    return get(`${url}`);
  };

  // flag to keep previous data when paginating.
  const keepPreviousData = true;

  // function getNextPageParam to determine the next page to fetch.
  const getNextPageParam = (_lastPage, pages) => {
    // Calculate the number of pages required to fetch all data.
    const numberOfPages = pages?.[0]?.data?.totalPages;

    // If there are more pages to fetch, return the next page number; otherwise, return undefined.
    if (pages.length < numberOfPages) return pages.length + 1;

    return undefined;
  };

  // flag to prevent refetching on window focus.
  const refetchOnWindowFocus = false;

  // Configure options for the useInfiniteQuery hook.
  const options = { getNextPageParam, keepPreviousData, refetchOnWindowFocus };

  // Use the useInfiniteQuery hook to manage the paginated query.
  return useInfiniteQuery({ queryKey, queryFn: fetchRestaurants, ...options });
};

export const useGetSingleRestaurant = (id) => {
  const queryKey = ["restaurant", id];

  const url = `/restaurant/${id}`;

  const queryFn = () => {
    return get(url);
  };

  const select = (response) => {
    return response?.data;
  };

  const enabled = Boolean(id);

  return useQuery({
    queryKey,
    queryFn,
    select,
    enabled,
    refetch0nWindowFocus: false,
    refetchOnmount: false,
    refetch0nReconnect: false,
    retry: false,
    staleTime: 0,
  });
};
export const useGetSingleMenu = (id) => {
  const queryKey = ["singlemenu", id];

  const url = `/restaurant/menu/${id}`;

  const queryFn = () => {
    return get(url);
  };

  const select = (response) => {
    return response?.data;
  };

  const enabled = Boolean(id);

  return useQuery({
    queryKey,
    queryFn,
    select,
    enabled,
    refetch0nWindowFocus: false,
    refetchOnmount: false,
    refetch0nReconnect: false,
    retry: false,
    staleTime: 0,
  });
};

export const useGetSingleExtra = (id) => {
  const queryKey = ["singleextra", id];

  const url = `/restaurant/extra/${id}`;

  const queryFn = () => {
    return get(url);
  };

  const select = (response) => {
    return response?.data;
  };

  const enabled = Boolean(id);

  return useQuery({
    queryKey,
    queryFn,
    select,
    enabled,
    refetch0nWindowFocus: false,
    refetchOnmount: false,
    refetch0nReconnect: false,
    retry: false,
    staleTime: 0,
  });
};

export const useGetSingleUser = (id) => {
  const queryKey = ["singleuser", id];

  const url = `/user/${id}`;

  const queryFn = () => {
    return get(url);
  };

  const select = (response) => {
    return response?.data;
  };

  const enabled = Boolean(id);

  return useQuery({
    queryKey,
    queryFn,
    select,
    enabled,
    refetch0nWindowFocus: false,
    refetchOnmount: false,
    refetch0nReconnect: false,
    retry: false,
    staleTime: 0,
  });
};

export const useGetSingleService = (id) => {
  const queryKey = ["singleservice", id];

  const url = `/service/${id}`;

  const queryFn = () => {
    return get(url);
  };

  const select = (response) => {
    return response?.data;
  };

  const enabled = Boolean(id);

  return useQuery({
    queryKey,
    queryFn,
    select,
    enabled,
    refetch0nWindowFocus: false,
    refetchOnmount: false,
    refetch0nReconnect: false,
    retry: false,
    staleTime: 0,
  });
};

export const useGetSingleCourier = (id) => {
  const queryKey = ["singlecourier", id];

  const url = `/courier/${id}`;

  const queryFn = () => {
    return get(url);
  };

  const select = (response) => {
    return response?.data;
  };

  const enabled = Boolean(id);

  return useQuery({
    queryKey,
    queryFn,
    select,
    enabled,
    refetch0nWindowFocus: false,
    refetchOnmount: false,
    refetch0nReconnect: false,
    retry: false,
    staleTime: 0,
  });
};

const fetchMenus = async ({ queryKey, pageParam = {} }) => {
  const [_key, restaurantID, category, rating, minPrice, maxPrice, name] =
    queryKey;

  const cursor = pageParam.cursor || null;
  const direction = pageParam.direction || "FORWARD";
  const limit = 6; // Adjust the limit if necessary
  let url = `/paged-menus?limit=${limit}`;

  if (name) {
    url += `&name=${encodeURIComponent(name)}`;
  }
  if (rating) {
    url += `&rating=${encodeURIComponent(rating)}`;
  }
  if (category) {
    url += `&category=${encodeURIComponent(category)}`;
  }
  if (minPrice) {
    url += `&minimumPrice=${encodeURIComponent(minPrice)}`;
  }
  if (maxPrice) {
    url += `&maximumPrice=${encodeURIComponent(maxPrice)}`;
  }
  if (cursor) {
    url += `&cursor=${encodeURIComponent(cursor)}`;
  }
  if (direction) {
    url += `&direction=${encodeURIComponent(direction)}`;
  }
  if (restaurantID) {
    url += `&restaurantId=${encodeURIComponent(restaurantID)}`;
  }

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Fetching menus failed:", error);
    throw error;
  }
};

export const useMenuListAlt = (
  name,
  category,
  rating,
  minPrice,
  maxPrice,
  restaurantID,
  cursor,
  direction
) => {
  const queryKey = [
    "menualt",
    name,
    category,
    rating,
    minPrice,
    maxPrice,
    restaurantID,
    cursor,
    direction,
  ];

  const limit = 5; // Adjust the limit if necessary
  let url = `/paged-menus?limit=${limit}`;

  if (name) {
    url += `&name=${encodeURIComponent(name)}`;
  }
  if (rating) {
    url += `&rating=${encodeURIComponent(rating)}`;
  }
  if (category) {
    url += `&category=${encodeURIComponent(category)}`;
  }
  if (minPrice) {
    url += `&minimumPrice=${encodeURIComponent(minPrice)}`;
  }
  if (maxPrice) {
    url += `&maximumPrice=${encodeURIComponent(maxPrice)}`;
  }
  if (cursor) {
    url += `&cursor=${encodeURIComponent(cursor)}`;
  }
  if (direction) {
    url += `&direction=${encodeURIComponent(direction)}`;
  }
  if (restaurantID) {
    url += `&restaurantId=${encodeURIComponent(restaurantID)}`;
  }

  const queryFn = () => {
    return get(url);
  };

  const select = (response) => {
    return response?.data;
  };

  return useQuery({
    queryKey,
    queryFn,
    select,
    // enabled,
    refetch0nWindowFocus: false,
    refetchOnmount: false,
    refetch0nReconnect: false,
    retry: false,
    staleTime: 0,
    keepPreviousData: true,
  });
};

export const useMenuListPaged = (
  minimumPrice,
  maximumPrice,
  name,
  category,
  rating,
  visible,
  distance,
  latitude,
  longitude,
  restaurantId,
  sortBy,
  orderBy,
  page
) => {
  //queryKey based on the provided parameters.
  const queryKey = [
    "menuListPaged",
    minimumPrice,
    maximumPrice,
    name,
    category,
    rating,
    visible,
    distance,
    latitude,
    longitude,
    restaurantId,
    sortBy,
    orderBy,
    page,
  ];

  const fetchMenus = ({ pageParam = page }) => {
    let url = `/paged-menus?page=${encodeURIComponent(
      parseInt(pageParam)
    )}&limit=${encodeURIComponent(parseInt(10))}`;

    const queryParams = {
      minimumPrice,
      maximumPrice,
      name,
      category,
      rating,
      visible,
      distance,
      latitude,
      longitude,
      restaurantId,
      sortBy,
      orderBy,
    };

    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url += `&${key}=${encodeURIComponent(value)}`;
      }
    });

    return get(`${url}`);
  };

  // flag to keep previous data when paginating.
  const keepPreviousData = true;

  // function getNextPageParam to determine the next page to fetch.
  const getNextPageParam = (_lastPage, pages) => {
    // Calculate the number of pages required to fetch all data.
    const numberOfPages = pages?.[0]?.data?.totalPages;

    // If there are more pages to fetch, return the next page number; otherwise, return undefined.
    if (pages.length < numberOfPages) return pages.length + 1;

    return undefined;
  };

  // flag to prevent refetching on window focus.
  const refetchOnWindowFocus = false;

  // Configure options for the useInfiniteQuery hook.
  const options = { getNextPageParam, keepPreviousData, refetchOnWindowFocus };

  // Use the useInfiniteQuery hook to manage the paginated query.
  return useInfiniteQuery({ queryKey, queryFn: fetchMenus, ...options });
};

export const useMenuList = (
  name,
  category,
  rating,
  minPrice,
  maxPrice,
  restaurantID,
  cursor
) => {
  const queryKey = [
    "menuList",
    restaurantID,
    category,
    rating,
    minPrice,
    maxPrice,
    name,
    cursor,
  ];

  const getNextPageParam = (lastPage, allPages) => {
    return lastPage?.lastCursor
      ? { cursor: lastPage.lastCursor, direction: "FORWARD" }
      : undefined;
  };

  const getPreviousPageParam = (firstPage, allPages) => {
    return allPages?.[allPages.length - 1]?.lastCursor
      ? {
          cursor: allPages?.[allPages.length - 1]?.lastCursor,
          direction: "BACKWARDS",
        }
      : undefined;
  };

  const options = {
    getNextPageParam,
    getPreviousPageParam,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  };

  return useInfiniteQuery({ queryKey, queryFn: fetchMenus, ...options });
};

const fetchExtras = async ({ queryKey, pageParam = {} }) => {
  const [_key, restaurantID, extraID, rating, minPrice, maxPrice, name] =
    queryKey;

  const cursor = pageParam.cursor || null;
  const direction = pageParam.direction || "FORWARD";
  const limit = 9; // Adjust the limit if necessary
  let url = `/paged-extras?limit=${limit}`;

  if (name) {
    url += `&name=${encodeURIComponent(name)}`;
  }
  if (rating) {
    url += `&rating=${encodeURIComponent(rating)}`;
  }
  if (minPrice) {
    url += `&minimumPrice=${encodeURIComponent(minPrice)}`;
  }
  if (maxPrice) {
    url += `&maximumPrice=${encodeURIComponent(maxPrice)}`;
  }
  if (cursor) {
    url += `&cursor=${encodeURIComponent(cursor)}`;
  }
  if (direction) {
    url += `&direction=${encodeURIComponent(direction)}`;
  }
  if (restaurantID) {
    url += `&restaurantId=${encodeURIComponent(restaurantID)}`;
  }
  if (extraID) {
    url += `&extraId=${encodeURIComponent(extraID)}`;
  }

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Fetching menus failed:", error);
    throw error;
  }
};

export const useExtrasList = (
  minPrice,
  maxPrice,
  name,
  rating,
  restaurantID,
  extraID,
  cursor
) => {
  const queryKey = [
    "extraList",
    restaurantID,
    extraID,
    rating,
    minPrice,
    maxPrice,
    name,
    cursor,
  ];

  const getNextPageParam = (lastPage, allPages) => {
    return lastPage?.lastCursor
      ? { cursor: lastPage.lastCursor, direction: "FORWARD" }
      : undefined;
  };

  const getPreviousPageParam = (firstPage, allPages) => {
    return allPages?.[allPages.length - 1]?.lastCursor
      ? {
          cursor: allPages?.[allPages.length - 1]?.lastCursor,
          direction: "BACKWARDS",
        }
      : undefined;
  };

  const options = {
    getNextPageParam,
    getPreviousPageParam,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  };

  return useInfiniteQuery({ queryKey, queryFn: fetchExtras, ...options });
};

export const useExtraListPaged = (
  minimumPrice,
  maximumPrice,
  name,
  category,
  rating,
  visible,
  distance,
  latitude,
  longitude,
  restaurantId,
  sortBy,
  orderBy,
  page
) => {
  //queryKey based on the provided parameters.
  const queryKey = [
    "extraListPaged",
    minimumPrice,
    maximumPrice,
    name,
    category,
    rating,
    visible,
    distance,
    latitude,
    longitude,
    restaurantId,
    sortBy,
    orderBy,
    page,
  ];

  const fetchExtras = ({ pageParam = page }) => {
    let url = `/paged-extras?page=${encodeURIComponent(
      parseInt(pageParam)
    )}&limit=${encodeURIComponent(parseInt(10))}`;

    const queryParams = {
      minimumPrice,
      maximumPrice,
      name,
      category,
      rating,
      visible,
      distance,
      latitude,
      longitude,
      restaurantId,
      sortBy,
      orderBy,
    };

    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url += `&${key}=${encodeURIComponent(value)}`;
      }
    });

    return get(`${url}`);
  };

  // flag to keep previous data when paginating.
  const keepPreviousData = true;

  // function getNextPageParam to determine the next page to fetch.
  const getNextPageParam = (_lastPage, pages) => {
    // Calculate the number of pages required to fetch all data.
    const numberOfPages = pages?.[0]?.data?.totalPages;

    // If there are more pages to fetch, return the next page number; otherwise, return undefined.
    if (pages.length < numberOfPages) return pages.length + 1;

    return undefined;
  };

  // flag to prevent refetching on window focus.
  const refetchOnWindowFocus = false;

  // Configure options for the useInfiniteQuery hook.
  const options = { getNextPageParam, keepPreviousData, refetchOnWindowFocus };

  // Use the useInfiniteQuery hook to manage the paginated query.
  return useInfiniteQuery({ queryKey, queryFn: fetchExtras, ...options });
};

//edit Restaurant
export const useEditRestaurant = () => {
  const mutationFn = (data) => {
    return put(`/restaurant`, data);
  };

  return { mutationFn };
};

//delte restaurant
export const useDeleteRestaurant = (restaurantId) => {
  const mutationFn = (data) => {
    return delete_request(
      `/credential/restaurant/remove/${restaurantId}`,
      data
    );
  };

  return { mutationFn };
};

//delte MENU
export const useDeleteMenu = (id) => {
  const mutationFn = (data) => {
    return delete_request(`/menu/${id}`, data);
  };

  return { mutationFn };
};

//delte extra
export const useDeleteExtra = (id) => {
  const mutationFn = (data) => {
    return delete_request(`/extra/${id}`, data);
  };

  return { mutationFn };
};

//get couriers
export const useGetCouriers = () => {
  const queryKey = ["couriers"];

  let url = `/couriers`;

  const queryFn = () => {
    return get(url);
  };

  const select = (response) => {
    return response?.data;
  };

  return useQuery({
    queryKey,
    queryFn,
    select,
    refetch0nWindowFocus: false,
    refetchOnmount: false,
    refetch0nReconnect: false,
    retry: false,
    staleTime: 0,
  });
};

//useGet Services
export const useGetServices = () => {
  const queryKey = ["services"];

  let url = `/services`;

  const queryFn = () => {
    return get(url);
  };

  const select = (response) => {
    return response?.data;
  };

  return useQuery({
    queryKey,
    queryFn,
    select,
    refetch0nWindowFocus: false,
    refetchOnmount: false,
    refetch0nReconnect: false,
    retry: false,
    staleTime: 0,
  });
};

//useGet Coupons
export const useGetCoupons = (id) => {
  const queryKey = ["coupons", id];

  let url = "/coupons";

  if (id) {
    url = `/coupons/${id}`;
  }

  const queryFn = () => {
    return get(url);
  };

  const select = (response) => {
    return response?.data;
  };

  return useQuery({
    queryKey,
    queryFn,
    select,
    // enabled,
    refetch0nWindowFocus: false,
    refetchOnmount: false,
    refetch0nReconnect: false,
    retry: false,
    staleTime: 0,
  });
};

//useGet Coupons
export const useGetCouriersOnline = () => {
  const queryKey = ["online-couriers"];

  let url = "/couriers/availability";

  const queryFn = () => {
    return get(url);
  };

  const select = (response) => {
    return response?.data;
  };

  return useQuery({
    queryKey,
    queryFn,
    select,
    // enabled,
    refetch0nWindowFocus: false,
    refetchOnmount: false,
    refetch0nReconnect: false,
    retry: false,
    staleTime: 0,
  });
};

//delete coupon
export const useDeleteCoupon = (id) => {
  const mutationFn = (data) => {
    return delete_request(`/coupon/${id}`, data);
  };

  return { mutationFn };
};

//delete ticket
export const useDeleteTicket = (id) => {
  const mutationFn = (data) => {
    return delete_request(`/ticket/${id}`, data);
  };

  return { mutationFn };
};

//delete restaurant branchees
export const useDeleteBranches = () => {
  const mutationFn = (data) => {
    return post(`/restaurant/job/remove-restaurants`, data);
  };

  return { mutationFn };
};

//accept ticket
export const useAcceptTicket = (id) => {
  const mutationFn = (data) => {
    return post(`/ticket/${id}/accept`, data);
  };

  return { mutationFn };
};

//add ticket response
export const useAddServiceResponse = (id, response) => {
  const mutationFn = (data) => {
    return post(`/response/ticket/${id}?response=${response}`, data);
  };

  return { mutationFn };
};

//add menu
export const useAddMenu = () => {
  const mutationFn = (data) => {
    const { name, description, price, category, image } = data;

    // Create a FormData object
    const formData = new FormData();
    // formData.append("name", name);
    // formData.append("description", description);
    // formData.append("price", price);
    // formData.append("category", category);

    if (image) {
      formData.append("image", image); // Append the image file
    }

    // Send the FormData as the request body
    return post(
      `/menu?name=${encodeURIComponent(name)}&description=${encodeURIComponent(
        description
      )}&price=${encodeURIComponent(price)}&category=${encodeURIComponent(
        category
      )}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  };

  return { mutationFn };
};
export const useAddExtra = () => {
  const mutationFn = (data) => {
    const { name, price, image } = data;

    // Create a FormData object
    const formData = new FormData();
    // formData.append("name", name);
    // formData.append("category", category);

    if (image) {
      formData.append("image", image); // Append the image file
    }

    // Send the FormData as the request body
    return post(
      `/extra?name=${encodeURIComponent(name)}&price=${encodeURIComponent(
        price
      )}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  };

  return { mutationFn };
};

//restaurant complete account
export const useRestaurantCompleteAccount = () => {
  const mutationFn = (data) => {
    const {
      verificationcode,
      name,
      bio,
      password,
      contact,
      username,
      address,
    } = data;

    console.log(data);

    // Create a FormData object
    const formData = new FormData();
    formData.append("name", name);
    formData.append("contact", contact);
    formData.append("contact1", contact);
    formData.append("bio", bio);
    formData.append("newPassword", password);
    formData.append("repeatPass", password);
    formData.append("username", username);
    formData.append("address", address);

    // Send the FormData as the request body
    return axiosInstance.post(
      `${NO_AUTH_URL}/restaurant/complete-account?verificationCode=${encodeURIComponent(
        verificationcode
      )}`,
      formData
    );
  };

  return { mutationFn };
};

//restaurant complete courier
export const useCourierCompleteAccount = (user_type) => {
  const mutationFn = (data) => {
    const {
      verificationcode,
      firstName,
      lastName,
      password,
      contact,
      username,
      address,
    } = data;

    // Create a FormData object
    const formData = new FormData();
    formData.append("lastName", lastName);
    formData.append("contact", contact);
    // formData.append("contact1", contact);
    formData.append("firstName", firstName);
    formData.append("newPassword", password);
    formData.append("repeatPass", password);
    formData.append("username", username);
    formData.append("address", address);

    // Send the FormData as the request body
    return user_type == "courier"
      ? axiosInstance.put(
          `${NO_AUTH_URL}/${user_type}/complete-account?verificationCode=${encodeURIComponent(
            verificationcode
          )}`,
          formData
        )
      : axiosInstance.post(
          `${NO_AUTH_URL}/${user_type}/complete-account?verificationCode=${encodeURIComponent(
            verificationcode
          )}`,
          formData
        );
  };

  return { mutationFn };
};

export const useGetCouponsByRestaurantID = (id) => {
  const queryKey = ["coupons"];

  let url = `/coupons`;

  const queryFn = () => {
    return get(url);
  };

  const select = (response) => {
    return response?.data;
  };

  const enabled = Boolean(id);

  return useQuery({
    queryKey,
    queryFn,
    select,
    enabled,
    refetch0nWindowFocus: false,
    refetchOnmount: false,
    refetch0nReconnect: false,
    retry: false,
    staleTime: 0,
  });
};

export const useGetCouponsByCouponNumber = (id) => {
  const queryKey = ["coupons", id];

  let url = `/coupon?coupon-number=${id}`;

  const queryFn = () => {
    return get(url);
  };

  const select = (response) => {
    return response?.data;
  };

  const enabled = Boolean(id);

  return useQuery({
    queryKey,
    queryFn,
    select,
    enabled,
    refetch0nWindowFocus: false,
    refetchOnmount: false,
    refetch0nReconnect: false,
    retry: false,
    staleTime: 0,
  });
};

export const useRestaurantBranches = (id) => {
  const queryKey = ["branches", id];

  const url = `/restaurant/${id}/branches`;

  const queryFn = () => {
    return get(url);
  };

  const select = (response) => {
    return response?.data;
  };

  const enabled = Boolean(id);

  return useQuery({
    queryKey,
    queryFn,
    select,
    enabled,
    refetch0nWindowFocus: false,
    refetchOnmount: false,
    refetch0nReconnect: false,
    retry: false,
    staleTime: 0,
  });
};

export const useGetExtras = () => {
  const queryKey = ["coupons"];

  let url = `/coupons`;

  const queryFn = () => {
    return get(url);
  };

  const select = (response) => {
    return response?.data;
  };

  return useQuery({
    queryKey,
    queryFn,
    select,
    refetch0nWindowFocus: false,
    refetchOnmount: false,
    refetch0nReconnect: false,
    retry: false,
    staleTime: 0,
  });
};

export const useAddCredentials = () => {
  const mutationFn = (data) => {
    return post(`/credential`, data);
  };

  return { mutationFn };
};

export const useAddCoupon = () => {
  const mutationFn = (data) => {
    return post(`/coupon`, data);
  };

  return { mutationFn };
};

//Authentications Get token to authorize all requests

export const useLogin = () => {
  const mutationFn = (data) => {
    return axiosInstance.post(`${NO_AUTH_URL}/system/auth/login`, data, {
      headers: {
        Authorization: null,
      },
    });
  };

  return { mutationFn };
};

export const useRegisterUser = () => {
  const mutationFn = (data) => {
    return axiosInstance.post(`${NO_AUTH_URL}/user/sign-up`, data, {
      headers: {
        Authorization: null,
      },
    });
  };

  return { mutationFn };
};

export const useLogout = () => {
  const mutationFn = (data) => {
    return axiosInstance.post(`${NO_AUTH_URL}/system/auth/logout`, data, {
      headers: null,
    });
  };

  return { mutationFn };
};

export const useAltLogin = () => {
  const mutationFn = (data) => {
    return axios.post(`${NO_AUTH_URL}/auth/login`, data, {
      headers: {
        Authorization: null,
      },
    });
  };

  return { mutationFn };
};

export const useSecured = () => {
  const queryKey = ["usesecured"];

  const queryFn = () => {
    return get(`/secured`);
  };

  const select = (response) => {
    response?.data?.data;
  };

  return useQuery({
    queryKey,
    queryFn,
    select,
    refetch0nWindowFocus: false,
    refetchOnmount: false,
    refetch0nReconnect: false,
    retry: false,
    staleTime: 0,
  });
};

//users requests

//PUT REQUESTS

export const useChangeDetails = () => {
  const changeRestMut = (data) => {
    return put(`/restaurant`, data);
  };
  const changeUserMut = (data) => {
    return put(`/user`, data);
  };
  const changeServiceMut = (data) => {
    return put(`/service`, data);
  };

  return { changeRestMut, changeUserMut, changeServiceMut };
};

export const useResetPassword = () => {
  const mutationFn = (data) => {
    return axios.put(`${NO_AUTH_URL}/auth/resetpassword`, data);
  };

  return { mutationFn };
};

export const useSignup = () => {
  const addDocMutation = (data) => {
    return put(`/signup`, data);
  };

  return { addDocMutation };
};

///ORDERS

//Add order items
export const useAddOrderItem = () => {
  const mutationFn = (data) => {
    const response = post(`/item`, data);
    return response?.data;
  };

  return { mutationFn };
};

//Add restaurant branch
export const useAddRestaurantBranch = () => {
  const mutationFn = (data) => {
    const response = post(`/restaurant/add-branch`, data);
    return response?.data;
  };

  return { mutationFn };
};

//get order item
export const useGetOrderItemByID = (id) => {
  const queryKey = ["orderitem", id];

  let url = `/item/${id}`;

  const queryFn = () => {
    return get(url);
  };

  const select = (response) => {
    return response?.data;
  };

  const enabled = Boolean(id);

  return useQuery({
    queryKey,
    queryFn,
    select,
    enabled,
    refetch0nWindowFocus: false,
    refetchOnmount: false,
    refetch0nReconnect: false,
    retry: false,
    staleTime: 0,
  });
};

//get ticket
export const useGetTicketByID = (id) => {
  const queryKey = ["ticket", id];

  let url = `/ticket/${id}`;

  const queryFn = () => {
    return get(url);
  };

  const select = (response) => {
    return response?.data;
  };

  const enabled = Boolean(id);

  return useQuery({
    queryKey,
    queryFn,
    select,
    enabled,
    refetch0nWindowFocus: false,
    refetchOnmount: false,
    refetch0nReconnect: false,
    retry: false,
    staleTime: 0,
  });
};

//get response by ticket id
export const useGetResponsesByTicketID = (ticketID, page) => {
  //queryKey based on the provided parameters.
  const queryKey = ["ticketresponse", ticketID, page];

  const fetchTicketResponses = ({ pageParam = page }) => {
    let url = `/paged-response?page=${encodeURIComponent(
      parseInt(pageParam)
    )}&limit=${encodeURIComponent(parseInt(10))}&ticketId=${encodeURIComponent(
      ticketID
    )}`;

    return get(`${url}`);
  };

  // flag to keep previous data when paginating.
  const keepPreviousData = true;

  // function getNextPageParam to determine the next page to fetch.
  const getNextPageParam = (_lastPage, pages) => {
    // Calculate the number of pages required to fetch all data.
    const numberOfPages = pages?.[0]?.data?.totalPages;

    // If there are more pages to fetch, return the next page number; otherwise, return undefined.
    if (pages.length < numberOfPages) return pages.length + 1;

    return undefined;
  };

  // flag to prevent refetching on window focus.
  const refetchOnWindowFocus = false;

  // Configure options for the useInfiniteQuery hook.
  const options = { getNextPageParam, keepPreviousData, refetchOnWindowFocus };
  const enabled = Boolean(ticketID);

  // Use the useInfiniteQuery hook to manage the paginated query.
  return useInfiniteQuery({
    queryKey,
    queryFn: fetchTicketResponses,
    enabled,
    ...options,
  });
};

///get image
export const useGetImage = (id) => {
  const queryKey = ["getimage", id];

  const url = `/load/image/${id}`;

  const get = (url) => axios.get(url, { responseType: "blob" }); // This forces Axios to handle the data as a binary Blob

  const queryFn = async () => {
    const response = await get(url, { responseType: "blob" }); // Specify 'blob' to handle binary data
    return response;
  };

  const select = (response) => {
    return response?.data;
  };

  const enabled = Boolean(id);

  return useQuery({
    queryKey,
    queryFn,
    select,
    enabled,
    refetch0nWindowFocus: false,
    refetchOnmount: false,
    refetch0nReconnect: false,
    retry: false,
    staleTime: 0,
  });
};

//update get orders
export const useOrderList = (
  restaurantId,
  courierId,
  userId,
  orderId,
  sortBy,
  orderBy,
  cursor,
  direction
) => {
  const queryKey = [
    "orderlist",
    restaurantId,
    courierId,
    userId,
    orderId,
    sortBy,
    orderBy,
    cursor,
    direction,
  ];

  const limit = 10; // Adjust the limit if necessary
  let url = `/paged-orders?limit=${limit}`;

  const queryParams = {
    restaurantId,
    courierId,
    userId,
    orderId,
    sortBy,
    orderBy,
    cursor,
    direction,
  };

  Object.entries(queryParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url += `&${key}=${encodeURIComponent(value)}`;
    }
  });
  const queryFn = () => {
    return get(url);
  };

  const select = (response) => {
    return response?.data;
  };

  return useQuery({
    queryKey,
    queryFn,
    select,
    refetch0nWindowFocus: false,
    refetchOnmount: false,
    refetch0nReconnect: false,
    retry: false,
    staleTime: 0,
    keepPreviousData: true,
  });
};

export const useOrderListPaged = (
  restaurantId,
  courierId,
  userId,
  orderId,
  // date,
  sortBy,
  orderBy,
  page
) => {
  //queryKey based on the provided parameters.
  const queryKey = [
    "orderListPaged",
    restaurantId,
    courierId,
    userId,
    orderId,
    // date,
    sortBy,
    orderBy,
    page,
  ];

  const fetchOrders = ({ pageParam = page }) => {
    let url = `/paged-orders?page=${encodeURIComponent(
      parseInt(pageParam)
    )}&limit=${encodeURIComponent(parseInt(10))}`;

    const queryParams = {
      restaurantId,
      courierId,
      userId,
      orderId,
      // date,
      sortBy,
      orderBy,
    };

    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url += `&${key}=${encodeURIComponent(value)}`;
      }
    });

    return get(`${url}`);
  };

  // flag to keep previous data when paginating.
  const keepPreviousData = true;

  // function getNextPageParam to determine the next page to fetch.
  const getNextPageParam = (_lastPage, pages) => {
    // Calculate the number of pages required to fetch all data.
    const numberOfPages = pages?.[0]?.data?.totalPages;

    // If there are more pages to fetch, return the next page number; otherwise, return undefined.
    if (pages.length < numberOfPages) return pages.length + 1;

    return undefined;
  };

  // flag to prevent refetching on window focus.
  const refetchOnWindowFocus = false;

  // Configure options for the useInfiniteQuery hook.
  const options = { getNextPageParam, keepPreviousData, refetchOnWindowFocus };

  // Use the useInfiniteQuery hook to manage the paginated query.
  return useInfiniteQuery({ queryKey, queryFn: fetchOrders, ...options });
};

export const useCourierListPaged = (
  firstName,
  lastName,
  email,
  username,
  averageRating,
  status,
  courierId,
  sortBy,
  orderBy,
  page
) => {
  //queryKey based on the provided parameters.
  const queryKey = [
    "couriersPaged",
    firstName,
    lastName,
    email,
    username,
    averageRating,
    status,
    courierId,
    sortBy,
    orderBy,
    page,
  ];

  const fetchCouriers = ({ pageParam = page }) => {
    let url = `/paged-courier?page=${encodeURIComponent(
      parseInt(pageParam)
    )}&limit=${encodeURIComponent(parseInt(10))}`;

    const queryParams = {
      firstName,
      lastName,
      email,
      username,
      averageRating,
      status,
      courierId,
      sortBy,
      orderBy,
    };

    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url += `&${key}=${encodeURIComponent(value)}`;
      }
    });

    return get(`${url}`);
  };

  // flag to keep previous data when paginating.
  const keepPreviousData = true;

  // function getNextPageParam to determine the next page to fetch.
  const getNextPageParam = (_lastPage, pages) => {
    // Calculate the number of pages required to fetch all data.
    const numberOfPages = pages?.[0]?.data?.totalPages;

    // If there are more pages to fetch, return the next page number; otherwise, return undefined.
    if (pages.length < numberOfPages) return pages.length + 1;

    return undefined;
  };

  // flag to prevent refetching on window focus.
  const refetchOnWindowFocus = false;

  // Configure options for the useInfiniteQuery hook.
  const options = { getNextPageParam, keepPreviousData, refetchOnWindowFocus };

  // Use the useInfiniteQuery hook to manage the paginated query.
  return useInfiniteQuery({ queryKey, queryFn: fetchCouriers, ...options });
};

export const useTicketListPaged = (
  userId,
  restaurantId,
  courierId,
  serviceId,
  from,
  to,
  status,
  page
) => {
  //queryKey based on the provided parameters.
  const queryKey = [
    "ticketlist",
    userId,
    restaurantId,
    courierId,
    serviceId,
    from,
    to,
    status,
    page,
  ];

  const fetchTickets = ({ pageParam = page }) => {
    let url = `/paged-ticket?page=${encodeURIComponent(
      parseInt(pageParam)
    )}&limit=${encodeURIComponent(parseInt(10))}`;

    const queryParams = {
      userId,
      restaurantId,
      courierId,
      serviceId,
      from,
      to,
      status,
    };

    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url += `&${key}=${encodeURIComponent(value)}`;
      }
    });

    return get(`${url}`);
  };

  // flag to keep previous data when paginating.
  const keepPreviousData = true;

  // function getNextPageParam to determine the next page to fetch.
  const getNextPageParam = (_lastPage, pages) => {
    // Calculate the number of pages required to fetch all data.
    const numberOfPages = pages?.[0]?.data?.totalPages;

    // If there are more pages to fetch, return the next page number; otherwise, return undefined.
    if (pages.length < numberOfPages) return pages.length + 1;

    return undefined;
  };

  // flag to prevent refetching on window focus.
  const refetchOnWindowFocus = false;

  // Configure options for the useInfiniteQuery hook.
  const options = { getNextPageParam, keepPreviousData, refetchOnWindowFocus };

  // Use the useInfiniteQuery hook to manage the paginated query.
  return useInfiniteQuery({ queryKey, queryFn: fetchTickets, ...options });
};

const fetchOrders = async ({ queryKey, pageParam = {} }) => {
  const [, restaurantId, courierId, userId, orderId, sortBy, orderBy] =
    queryKey;

  const cursor = pageParam.cursor || null;
  const direction = pageParam.direction || "FORWARD";
  const limit = 5; // Adjust the limit if necessary
  let url = `/paged-orders?limit=${limit}`;

  const queryParams = {
    restaurantId,
    courierId,
    userId,
    orderId,
    sortBy,
    orderBy,
    cursor,
    direction,
  };

  Object.entries(queryParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url += `&${key}=${encodeURIComponent(value)}`;
    }
  });
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Fetching menus failed:", error);
    throw error;
  }
};

export const useOrderListInfinite = (
  restaurantId,
  courierId,
  userId,
  orderId,
  sortBy,
  orderBy,
  cursor,
  direction
) => {
  const queryKey = [
    "orderListInfinite",
    restaurantId,
    courierId,
    userId,
    orderId,
    sortBy,
    orderBy,
    cursor,
    direction,
  ];

  const getNextPageParam = (lastPage, allPages) => {
    return lastPage?.lastCursor
      ? { cursor: lastPage.lastCursor, direction: "FORWARD" }
      : undefined;
  };

  const getPreviousPageParam = (firstPage, allPages) => {
    return allPages?.[allPages.length - 1]?.lastCursor
      ? {
          cursor: allPages?.[allPages.length - 1]?.lastCursor,
          direction: "BACKWARDS",
        }
      : undefined;
  };

  const options = {
    getNextPageParam,
    getPreviousPageParam,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  };

  return useInfiniteQuery({ queryKey, queryFn: fetchOrders, ...options });
};

export const useGetSingleOrder = (id) => {
  const queryKey = ["singleorder", id];

  let url = `/order/${id}`;

  const queryFn = () => {
    return get(url);
  };

  const select = (response) => {
    return response?.data;
  };

  const enabled = Boolean(id);

  return useQuery({
    queryKey,
    queryFn,
    select,
    enabled,
    refetch0nWindowFocus: false,
    refetchOnmount: false,
    refetch0nReconnect: false,
    retry: false,
    staleTime: 0,
  });
};

export const useGetOrderItemsByOrderID = (id) => {
  const queryKey = ["orderitemsbyorderID", id];

  let url = `item/order/${id}`;

  const queryFn = () => {
    return get(url);
  };

  const select = (response) => {
    return response?.data;
  };

  const enabled = Boolean(id);

  return useQuery({
    queryKey,
    queryFn,
    select,
    enabled,
    refetch0nWindowFocus: false,
    refetchOnmount: false,
    refetch0nReconnect: false,
    retry: false,
    staleTime: 0,
  });
};

export const useUpdateOrderStaus = (orderId, status, usertype) => {
  let url = "";
  if (usertype == "RESTAURANT_ADMIN") {
    url = `/restaurant/order/${orderId}?status=${status}`;
  } else {
    url = `/courier/order/${orderId}?status=${status}`;
  }

  const mutationFn = (data) => {
    return put(url, data);
  };

  return { mutationFn };
};

export const useUpdateTicketStaus = (ticketID, status) => {
  const url = `/service-ticket/${ticketID}?status=${status}`;

  const mutationFn = (data) => {
    return post(url, data);
  };

  return { mutationFn };
};

export const useAddTicket = () => {
  let url = `/ticket`;

  const mutationFn = (data) => {
    return post(url, data);
  };

  return { mutationFn };
};

export const useDeleteUser = () => {
  const mutationFn = (data) => {
    return delete_request(`/user/remove`, data);
  };

  return { mutationFn };
};

//USE VERIFY USER
export const useVerifyUser = (id) => {
  const queryKey = ["verifyuser", id];

  let url = `/user/verify?verificationCode=${encodeURIComponent(id)}`;
  const queryFn = () => {
    return get(url);
  };

  const select = (response) => {
    return response?.data;
  };

  const enabled = Boolean(id);

  return useQuery({
    queryKey,
    queryFn,
    select,
    enabled,
    refetch0nWindowFocus: false,
    refetchOnmount: false,
    refetch0nReconnect: false,
    retry: false,
    staleTime: 0,
  });
};

//update 2fa
export const useChange2FAStaus = () => {
  const mutationFn = (data) => {
    const { status, username } = data;

    let url = "";
    if (status) {
      url = `/2fa/disable?username=${username}`;
    } else url = `/2fa/enable?username=${username}`;
    return post(url, data);
  };

  return { mutationFn };
};

export const useVerify2FACode = () => {
  const mutationFn = (data) => {
    const { code, username } = data;
    return axiosInstance.post(
      `${NO_AUTH_URL}/2fa/verification?username=${username}&code=${code}`,
      data,
      {
        headers: {
          Authorization: null,
        },
      }
    );
  };

  return { mutationFn };
};

//update menu visibility
export const useUpdateMenuVisibility = (id) => {
  const mutationFn = (data) => {
    const { visible } = data;

    let url = "";
    if (visible) {
      url = `/menu/${id}/disable-visibility`;
    } else url = `/menu/${id}/enable-visibility`;
    return post(url, data);
  };

  return { mutationFn };
};

//update menu visibility
export const useUpdateExtraVisibility = (id) => {
  const mutationFn = (data) => {
    const { visible } = data;

    let url = "";
    if (visible) {
      url = `/extra/${id}/disable-visibility`;
    } else url = `/extra/${id}/enable-visibility`;
    return post(url, data);
  };

  return { mutationFn };
};

export const useUpdateCourierAvailability = () => {
  const mutationFn = (data) => {
    const { availability } = data;

    return put(`/courier/update?availability=${availability}`, data);
  };

  return { mutationFn };
};

//update address
export const useUpdateAddress = () => {
  const mutationFn = (data) => {
    return put(`/address`, data);
  };

  return { mutationFn };
};

//update password
export const useUpdatePassword = () => {
  const mutationFn = (data) => {
    const { username, password } = data;

    return post(
      `/forgotten-password?username=${username}&password=${password}&repeatedPassword=${password}`,
      data
    );
  };

  return { mutationFn };
};
