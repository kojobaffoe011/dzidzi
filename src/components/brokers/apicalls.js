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
import { useInfiniteQuery, useQuery } from "react-query";
import { NO_AUTH_URL } from "../../utils/config";
import { get, post, put } from "../../utils/transport";

const queryOptions = {
  refetch0nWindowFocus: false,
  refetchOnmount: false,
  refetch0nReconnect: false,
  retry: false,
  staleTime: 86400000,
};

//GET REQUESTS

export const useMyShortStayRequests = (status) => {
  const queryKey = ["stayrequests", status];

  let url = `/stayrequests`;

  if (status) {
    url = `/stayrequests?status=${status}`;
  }

  const queryFn = () => {
    return get(url);
  };

  const select = (response) => response?.data?.data;

  // const enabled = Boolean(status);

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

export const useGetStayCounts = () => {
  const queryKey = ["staycounts"];

  let url = `/staycounts`;

  const queryFn = () => {
    return get(url);
  };

  const select = (response) => response?.data?.data;

  // const enabled = Boolean(status);

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

export const useSingleStayRequest = (id) => {
  const queryKey = ["stayrequests", id];

  const url = `/singlestayrequest?id=${id}`;

  const queryFn = () => {
    return get(url);
  };

  const select = (response) => response?.data?.data;

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

export const useSingleStayRequestForPayment = (id) => {
  const queryKey = ["stayrequestsforpayment", id];

  const url = `/singlestayrequestforpayment?id=${id}`;

  const queryFn = () => {
    return get(url);
  };

  const select = (response) => response?.data?.data;

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

export const useGetCampus = () => {
  const queryKey = ["campuses"];

  const queryFn = () => {
    return axios.get(`${NO_AUTH_URL}/auth/campuses`);
  };

  const select = (response) => response?.data?.data;

  return useQuery({
    queryKey,
    queryFn,
    select,
    ...queryOptions,
  });
};

export const useGetSingleCampus = (campus) => {
  const queryKey = ["campus", campus];

  const queryFn = () => {
    return axios.get(
      `${NO_AUTH_URL}/auth/campus/${encodeURIComponent(campus)}`
    );
  };

  const enabled = Boolean(campus);

  const select = (response) => {
    return response?.data?.data;
  };

  return useQuery({
    queryKey,
    queryFn,
    select,
    enabled,
    ...queryOptions,
  });
};

export const useGetMyRefunds = () => {
  const queryKey = ["refunds"];

  const queryFn = () => {
    return get(`/getmyrefunds`);
  };

  const select = (response) => response?.data?.data;

  return useQuery({
    queryKey,
    queryFn,
    select,
    ...queryOptions,
  });
};

export const useGetCancellationBalance = () => {
  const queryKey = ["balance-cancellation"];

  const queryFn = () => {
    return get(`/cancellationbalance`);
  };

  const select = (response) => response?.data?.data;

  return useQuery({
    queryKey,
    queryFn,
    select,
    ...queryOptions,
  });
};

export const useGetMySwaps = () => {
  const queryKey = ["swaps"];

  const queryFn = () => {
    return get(`/getmyswaps`);
  };

  const select = (response) => response?.data?.data;

  return useQuery({
    queryKey,
    queryFn,
    select,
    ...queryOptions,
  });
};

export const useGetMyCancellation = () => {
  const queryKey = ["cancellations"];

  const queryFn = () => {
    return get(`/getmycancellations`);
  };

  const select = (response) => response?.data?.data;

  return useQuery({
    queryKey,
    queryFn,
    select,
    ...queryOptions,
  });
};

export const useGetHostelBlocks = () => {
  const queryKey = ["hostelblocks"];

  const queryFn = () => {
    return get(`/gethostelblocks`);
  };

  const select = (response) => response?.data;

  return useQuery({
    queryKey,
    queryFn,
    select,
    ...queryOptions,
  });
};

export const useGetBlocks = (gender) => {
  const queryKey = ["hostelblocks", gender];

  const queryFn = () => {
    return get(`/blocks/${gender}`);
  };

  const enabled = Boolean(gender);

  const select = (response) => response?.data?.data;

  return useQuery({
    queryKey,
    queryFn,
    select,
    enabled,
    ...queryOptions,
  });
};

export const useGetRoomsByBlocks = (gender, block) => {
  const queryKey = ["roomblock", gender, block];

  const queryFn = () => {
    return get(`/rooms/${gender}/${block}`);
  };

  const enabled = Boolean(gender, block);

  const select = (response) => response?.data?.data;

  return useQuery({
    queryKey,
    queryFn,
    select,
    enabled,
    ...queryOptions,
  });
};

export const useGetRoomsByBlockAndRoomType = (gender, block, type, roomID) => {
  const queryKey = ["roomblocktype", gender, block, type, roomID];

  const queryFn = () => {
    return get(`/getroombyblocktype/${block}/${type}/${gender}/${roomID}`);
  };

  const enabled = Boolean(gender, block, type, roomID);

  const select = (response) => response?.data?.data;

  return useQuery({
    queryKey,
    queryFn,
    select,
    enabled,
    ...queryOptions,
  });
};

export const useGetStudentByRoom = (room, gender) => {
  const queryKey = ["studentbyroom", room, gender];

  const queryFn = () => {
    return get(`/getstudentbyroom/${room}/${gender}`);
  };

  const enabled = Boolean(room, gender);

  const select = (response) => response?.data?.data;

  return useQuery({
    queryKey,
    queryFn,
    select,
    enabled,
    ...queryOptions,
  });
};

export const useRoomTypes = () => {
  const queryKey = ["roomtype"];

  const queryFn = () => {
    return get(`/getroomtypes`);
  };

  const select = (response) => response?.data;

  return useQuery({
    queryKey,
    queryFn,
    select,
    ...queryOptions,
  });
};

export const useAvailableBeds = (id) => {
  const queryKey = ["beds", id];

  const queryFn = () => {
    return get(`/availablebeds/${id}`);
  };

  const enabled = Boolean(id);

  const select = (response) => response?.data?.data;

  return useQuery({
    queryKey,
    queryFn,
    select,
    enabled,
    refetch0nWindowFocus: false,
    refetchOnmount: false,
    refetch0nReconnect: false,
    retry: false,
    staleTime: 3000,
  });
};

export const useRoom = (id, nationality) => {
  const queryKey = ["roomData", nationality, id];

  const queryFn = () => {
    return get(`/room/${id}/${nationality}`);
  };

  const enabled = Boolean(id, nationality);

  const select = (response) => response?.data?.data;

  return useQuery({
    queryKey,
    queryFn,
    select,
    enabled,
    ...queryOptions,
  });
};

export const useGetExpiration = (phone) => {
  const queryKey = ["expiration", phone];

  const queryFn = () => {
    return axios.get(`${NO_AUTH_URL}/auth/getexpiration/${phone}`);
  };

  const enabled = Boolean(phone);

  const select = (response) => response?.data?.data;

  return useQuery({
    refetchInterval: 5000,
    queryKey,
    queryFn,
    select,
    enabled,
    ...queryOptions,
  });
};

export const useMyBookings = (nationality) => {
  const queryKey = ["bookings", nationality];

  const queryFn = () => {
    return get(`/mybookings/${nationality}`);
  };

  const select = (response) => response?.data?.data;

  const enabled = Boolean(nationality);

  return useQuery({
    queryKey,
    queryFn,
    select,
    enabled,
    refetch0nWindowFocus: false,
    refetchOnmount: false,
    refetch0nReconnect: false,
    retry: false,
    staleTime: 3000,
  });
};

export const useGetRoomsInfinite = (
  gender,
  roomType,
  rentAmount,
  block,
  nationality
) => {
  //queryKey based on the provided parameters.
  const queryKey = [
    "roomalt",
    gender,
    roomType,
    rentAmount,
    block,
    nationality,
  ];

  // function fetchRooms that retrieves room data based on the provided parameters.
  /**
   * Fetches room data in a paginated manner.
   *
   * @param {Object} pageParam - The page parameter for fetching the next page of data.
   * @returns {Promise} A promise that resolves to the fetched data or rejects with an error.
   */

  const fetchRooms = ({ pageParam = 1 }) =>
    get(
      `/getroomsalt/${gender}/${encodeURIComponent(
        roomType
      )}/${encodeURIComponent(rentAmount)}/${encodeURIComponent(
        block
      )}/${encodeURIComponent(nationality)}?page=${encodeURIComponent(
        parseInt(pageParam)
      )}&pageSize=${encodeURIComponent(parseInt(24))}`
    );

  // flag to keep previous data when paginating.
  const keepPreviousData = true;

  // function getNextPageParam to determine the next page to fetch.
  const getNextPageParam = (_lastPage, pages) => {
    // Calculate the total number of rooms and the room limit per page.
    const totalRooms = pages?.[0]?.data?.totalCount;

    const roomLimit = pages?.[0]?.data?.data?.length;

    // Calculate the number of pages required to fetch all data.
    const numberOfPages = Math.ceil(totalRooms / roomLimit);

    // If there are more pages to fetch, return the next page number; otherwise, return undefined.
    if (pages.length < numberOfPages) return pages.length + 1;

    return undefined;
  };

  // flag to prevent refetching on window focus.
  const refetchOnWindowFocus = false;

  // Configure options for the useInfiniteQuery hook.
  const options = { getNextPageParam, keepPreviousData, refetchOnWindowFocus };

  // Use the useInfiniteQuery hook to manage the paginated query.
  return useInfiniteQuery(queryKey, fetchRooms, options);
};

export const useGetInvoice = (id, nationality) => {
  const queryKey = ["invoice", nationality, id];

  const queryFn = () => {
    return get(`/invoice/${id}/${nationality}`);
  };

  const enabled = Boolean(id, nationality);

  const select = (response) => response?.data?.data;

  return useQuery({
    queryKey,
    queryFn,
    select,
    enabled,
    ...queryOptions,
  });
};

//POST REQUESTS
export const useVerifyCard = () => {
  const mutationFn = (data) => {
    return post(`/verifyghcard`, data);
  };

  return { mutationFn };
};

export const useSendShortStayRequest = () => {
  const mutationFn = (data) => {
    return post(`/shortstayrequest`, data);
  };

  return { mutationFn };
};

export const useOutBasicInfo = () => {
  const mutationFn = (data) => {
    return post(`/outstationbasicinfo`, data);
  };

  return { mutationFn };
};

export const useVerifyL100Card = () => {
  const mutationFn = (data) => {
    return post(`/verifyghcardL100`, data);
  };

  return { mutationFn };
};

export const useForgotPassword = () => {
  const mutationFn = (data) => {
    return axios.post(`${NO_AUTH_URL}/auth/forgotpassword`, data);
  };

  return { mutationFn };
};

export const useCheckStudent = () => {
  const mutationFn = (data) => {
    return post(`/checkstudent`, data);
  };

  return { mutationFn };
};

export const useUploadID = () => {
  const IDmutationFn = (formData) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    return axios.post(`${NO_AUTH_URL}/upload/id_card`, formData, config);
  };

  return { IDmutationFn };
};

export const useUploadOtherID = () => {
  const OtherMutationFn = (formData) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    return axios.post(`${NO_AUTH_URL}/upload/other_id`, formData, config);
  };

  return { OtherMutationFn };
};

export const useUploadPhoto = () => {
  const photoMutationFn = (formData) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    return axios.post(`${NO_AUTH_URL}/upload/profile_pic`, formData, config);
  };

  return { photoMutationFn };
};

export const useUploadLetter = () => {
  const letterMutationFn = (formData) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    return axios.post(
      `${NO_AUTH_URL}/upload/admission_letter`,
      formData,
      config
    );
  };

  return { letterMutationFn };
};

//Authentications Get token to authorize all requests

export const useLogin = () => {
  const mutationFn = (data) => {
    return axios.post(`${NO_AUTH_URL}/system/auth/login`, data, {
      headers: {
        Authorization: null,
      },
    });
  };

  return { mutationFn };
};

export const useLogout = () => {
  const mutationFn = (data) => {
    return axios.post(`${NO_AUTH_URL}/system/auth/logout`, data, {
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
    console.log(response);
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

export const useGetUsers = () => {
  const queryKey = ["getusers"];

  const queryFn = () => {
    return get(`/users`);
  };

  const select = (response) => {
    console.log(response);
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

export const useGetUsersByFilters = (
  firstname,
  lastname,
  activated,
  email,
  username
) => {
  const queryKey = [
    "findusers",
    firstname,
    lastname,
    activated,
    email,
    username,
  ];

  const queryFn = () => {
    return get(
      `/users/filter?firstname=${firstname}&lastname=${lastname}&activated=${lastname}&email=${email}&username=${username}`
    );
  };

  const select = (response) => {
    console.log(response);
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

// export const useGetUsersByID = (id) => {
//   const queryKey = ["findusers", id];

//   const queryFn = () => {
//     return get(`/users/${id}`);
//   };

//   const select = (response) => {
//     console.log(response);
//     response?.data?.data;
//   };

//   const enabled = Boolean(id);

//   return useQuery({
//     queryKey,
//     queryFn,
//     select,
//     enabled,
//     refetch0nWindowFocus: false,
//     refetchOnmount: false,
//     refetch0nReconnect: false,
//     retry: false,
//     staleTime: 0,
//   });
// };

export const useGetUsersByID = (id) => {
  const queryKey = ["findusers", id];

  const queryFn = () => {
    return get(`/users/${id}`);
  };

  const select = (response) => {
    console.log(response);
    response?.data?.data;
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

export const usePaylater = () => {
  const addPayLaterMutation = (data) => {
    return post(`/paylater`, data);
  };

  return { addPayLaterMutation };
};

export const useCheckStatus = () => {
  const checkStatusMutation = (data) => {
    return post(`/checkstatus`, data);
  };

  return { checkStatusMutation };
};

export const useRegister = () => {
  const registerMutation = (data) => {
    return post(`${NO_AUTH_URL}/auth/register`, data);
  };

  return { registerMutation };
};

export const useRegisterOrganization = () => {
  const registerMutation = (data) => {
    return post(`${NO_AUTH_URL}/auth/registerorg`, data);
  };

  return { registerMutation };
};

export const useCancelBooking = () => {
  const cancelMutationFn = (data) => {
    return post(`/cancelbooking`, data);
  };

  return { cancelMutationFn };
};

export const useRequestRefund = () => {
  const refundMutation = (data) => {
    return post(`/requestrefund`, data);
  };

  return { refundMutation };
};

export const useRequestSwap = () => {
  const swapMutation = (data) => {
    return post(`/swaprooms`, data);
  };

  return { swapMutation };
};

export const usePayToMaintain = () => {
  const payMutation = (data) => {
    return post(`/paytomaintain`, data);
  };

  return { payMutation };
};

//PUT REQUESTS
export const useUploadExtraDocuments = () => {
  const uploadMutation = (data) => {
    return put(`/uploaddocs`, data);
  };

  return { uploadMutation };
};

export const useChangeStudentDetails = () => {
  const mutationFn = (data) => {
    return put(`/editstudent`, data);
  };

  return { mutationFn };
};

export const useChangePass = () => {
  const changePassMut = (data) => {
    return put(`/changepass`, data);
  };

  return { changePassMut };
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
