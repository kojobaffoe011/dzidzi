import { showErrorToast } from "../toast/Toast";

// LOCAL
export const BASE_URL = "http://localhost:4400";
//export const BASE_URL = "https://dzidzi-repo.onrender.com";
export const NO_AUTH_URL = "http://localhost:4400";
//export const NO_AUTH_URL = "https://dzidzi-repo.onrender.com";

//tailwind classes for responsiveness of form inputs
export const resp =
  "lg:col-span-1 md:col-span-1 sm:col-span-2 xs:col-span-2 ss:col-span-2 xss:col-span-2";
export const otherresp =
  "sm:mt-[20rem] xs:mt-[20rem] ss:mt-[20rem] xss:mt-[20rem] lg:mt-32 md:mt-32";
export const otherrespalt =
  "sm:mt-[30rem] xs:mt-[30rem] ss:mt-[30rem] xss:mt-[30rem] lg:mt-52 md:mt-24";
export const otherrespaltalt =
  "sm:mt-[20rem] xs:mt-[20rem] ss:mt-[20rem] xss:mt-[20rem] md:mt-24";

export const humanDatetime = (value) => {
  //example 'Mar. 10, 2021, 4:13:32 p.m.'
  const date = new Date(value);
  if (isNaN(date)) {
    return value;
  }
  return new Intl.DateTimeFormat("default", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

export const convertDate = (date) => {
  const numberDate = new Date(date);
  let dateInWords = numberDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  if (isNaN(numberDate)) {
    return date;
  } else return dateInWords;
};

export const calculateNights = (start, end) => {
  // Convert both dates to UTC to ensure consistency across timezones
  const startUtc = Date.UTC(
    start.getFullYear(),
    start.getMonth(),
    start.getDate()
  );
  const endUtc = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());

  // Calculate the time difference in milliseconds
  const timeDifference = endUtc - startUtc;

  // Calculate the number of nights by dividing the time difference by the number of milliseconds in a day
  const nights = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return nights;
};

/**
 * Resizes an image to fit within specified dimensions and maximum size in kilobytes (KB).
 *
 * @param {File} imageFile - The input image file to be resized.
 * @param {Number} maxSizeKB - The maximum size in kilobytes (KB) for the resized image.
 * @param {Number} maxWidth - The maximum width for the resized image (default: 720 pixels).
 * @param {Number} maxHeight - The maximum height for the resized image (default: 640 pixels).
 * @returns {Promise} A promise that resolves to the resized image as a File object.
 */
export const resizeImageToMaxKB = (
  imageFile,
  maxSizeKB,
  maxWidth = 720,
  maxHeight = 640
) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    // Handle image load
    img.onload = () => {
      let width = img.width;
      let height = img.height;
      let ratio = 1.0;

      // Calculate the ratio to fit within the specified maxWidth and maxHeight
      if (width > maxWidth || height > maxHeight) {
        ratio = Math.min(maxWidth / width, maxHeight / height);
        width *= ratio;
        height *= ratio;
      }

      // Create a canvas to perform image resizing
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      // Convert maxSizeKB to bytes
      const MAX_SIZE = maxSizeKB * 1024;
      let quality = 1.0;

      // Adjust image quality to meet the maximum size requirement
      while (canvas.toDataURL("image/jpeg", quality).length > MAX_SIZE) {
        quality -= 0.1;
      }

      // Convert the resized image to a Blob and create a new File object
      canvas.toBlob(
        (blob) => {
          const resizedFile = new File([blob], imageFile.name, {
            type: "image/jpeg",
            lastModified: Date.now(),
          });
          resolve(resizedFile);
        },
        "image/jpeg",
        quality
      );
    };

    // Handle image load error
    img.onerror = () => {
      reject(new Error("Invalid image content."));
    };

    // Read the image file as a data URL and set it as the source of the image element
    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target.result;
    };
    reader.readAsDataURL(imageFile);
  });
};

export const toFixedDeciimal = (num, decimal) => Number(num).toFixed(decimal);

export function shuffle(array) {
  for (let i = array?.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const timeOutError = (error) => {
  if (error.message == "Network Error") {
    console.error(error);
    return showErrorToast("Network connection lost. Connect and try again");
  }

  if (error.message.includes("timeout")) {
    console.error(error);
    return showErrorToast("Connection Timed Out");
  }
};

const flipOrder = (order) => {
  if (order === null) {
    return "DESC";
  }
  return order === "ASC" ? "DESC" : "ASC";
};

export const sortByColumn = (sortKey, filters, setFilters) => {
  const value = filters.map((item) => {
    if (item.name === "sortBy") {
      return {
        ...item,
        value: sortKey,
        enabled: true,
      };
    }
    if (item.name === "orderBy") {
      return {
        ...item,
        value: flipOrder(item.value),
        enabled: true,
      };
    }

    return item;
  });

  setFilters(value);
};

export const handleFilterChange = (event, name, filters, setFilters) => {
  const value = filters.map((item) => {
    if (item.name === name) {
      return {
        ...item,
        value: event.target.value.trim(),
        enabled: false,
      };
    } else {
      return item;
    }
  });

  setFilters(value);
};

export const clearSingleFilter = (name, filters, setFilters) => {
  const value = filters.map((item) => {
    if (item.name === name) {
      return {
        ...item,
        value: null,
        enabled: false,
      };
    } else {
      return item;
    }
  });

  setFilters(value);
};

export const activeFilters = (filters, type) => {
  if (type === null || type === undefined) {
    return filters.filter(
      (item) =>
        item.enabled &&
        item.name !== "sortBy" &&
        item.name !== "orderBy" &&
        !item.name.toLowerCase().includes("id")
    );
  }

  return filters.filter(
    (item) =>
      item.enabled &&
      item.name !== "sortBy" &&
      item.name !== "orderBy" &&
      !item.name.toLowerCase().includes("id")
  );
};

export const position = {
  top: "top-[-465px]",
  right: "right-[-380px]",
};

export const setLoginTimestamp = () => {
  const loginTime = new Date().getTime(); // Current timestamp in milliseconds
  localStorage.setItem("loginTime", loginTime.toString());
};
