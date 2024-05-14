// LOCAL
export const BASE_URL = "https://dzidzi-repo.onrender.com";
export const NO_AUTH_URL = "https://dzidzi-repo.onrender.com";

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

export const universities = [
  "University of Ghana",
  "Kwame Nkrumah University of Science and Technology",
  "University of Cape Coast",
  "University of Education, Winneba",
  "University for Development Studies",
  "CK Tadem University for Technology and Applied Sciences",
  "Accra Institute of Technology",
  "Accra Technical University",
  "African University College of Communications",
  "All Nations University",
  "Anglican University College of Technology",
  "Ashesi University",
  "Bolgatanga Technical University",
  "Cape Coast Technical University",
  "Catholic University College of Ghana",
  "Central University",
  "Christian Service University College",
  "Ghana Communication Technology University",
  "Ghana School of Law",
  "Ghana Institute of Management and Public Administration",
  "Ghana Institute of Journalism",
  "Ho Technical University",
  "Knustford University College",
  "Koforidua Technical University",
  "Kumasi Technical University",
  "Lancaster University",
  "Methodist University College Ghana",
  "Pentecost University",
  "Presbyterian University College",
  "Radford University College",
  "Regional Maritime University",
  "Simon Diedong Dombo University for Business and Integrated Development Studies",
  "Sunyani Technical University",
  "Takoradi Technical University",
  "Tamale Technical University",
  "University of Energy And Natural Resources",
  "University of Environment and Sustainable Development",
  "University of Health and Allied Sciences",
  "University of Mines and Technology",
  "University of Professional Studies",
  "Valley View University",
  "Wa Technical University",
  "Wisconsin International University College",
];

export const nationalities = [
  "Afghan",
  "Albanian",
  "Algerian",
  "American",
  "Andorran",
  "Angolan",
  "Antiguans",
  "Argentinean",
  "Armenian",
  "Australian",
  "Austrian",
  "Azerbaijani",
  "Bahamian",
  "Bahraini",
  "Bangladeshi",
  "Barbadian",
  "Barbudans",
  "Batswana",
  "Belarusian",
  "Belgian",
  "Belizean",
  "Beninese",
  "Bhutanese",
  "Bolivian",
  "Bosnian",
  "Brazilian",
  "British",
  "Bruneian",
  "Bulgarian",
  "Burkinabe",
  "Burmese",
  "Burundian",
  "Cambodian",
  "Cameroonian",
  "Canadian",
  "Cape Verdean",
  "Central African",
  "Chadian",
  "Chilean",
  "Chinese",
  "Colombian",
  "Comoran",
  "Congolese",
  "Costa Rican",
  "Croatian",
  "Cuban",
  "Cypriot",
  "Czech",
  "Danish",
  "Djibouti",
  "Dominican",
  "Dutch",
  "East Timorese",
  "Ecuadorean",
  "Egyptian",
  "Emirian",
  "Equatorial Guinean",
  "Eritrean",
  "Estonian",
  "Ethiopian",
  "Fijian",
  "Filipino",
  "Finnish",
  "French",
  "Gabonese",
  "Gambian",
  "Georgian",
  "German",
  "Greek",
  "Grenadian",
  "Guatemalan",
  "Guinea-Bissauan",
  "Guinean",
  "Guyanese",
  "Haitian",
  "Herzegovinian",
  "Honduran",
  "Hungarian",
  "I-Kiribati",
  "Icelander",
  "Indian",
  "Indonesian",
  "Iranian",
  "Iraqi",
  "Irish",
  "Israeli",
  "Italian",
  "Ivorian",
  "Jamaican",
  "Japanese",
  "Jordanian",
  "Kazakhstani",
  "Kenyan",
  "Kittian and Nevisian",
  "Kuwaiti",
  "Kyrgyz",
  "Laotian",
  "Latvian",
  "Lebanese",
  "Liberian",
  "Libyan",
  "Liechtensteiner",
  "Lithuanian",
  "Luxembourger",
  "Macedonian",
  "Malagasy",
  "Malawian",
  "Malaysian",
  "Maldivan",
  "Malian",
  "Maltese",
  "Marshallese",
  "Mauritanian",
  "Mauritian",
  "Mexican",
  "Micronesian",
  "Moldovan",
  "Monacan",
  "Mongolian",
  "Moroccan",
  "Mosotho",
  "Motswana",
  "Mozambican",
  "Namibian",
  "Nauruan",
  "Nepalese",
  "New Zealander",
  "Nicaraguan",
  "Nigerian",
  "Nigerien",
  "North Korean",
  "Northern Irish",
  "Norwegian",
  "Omani",
  "Pakistani",
  "Palauan",
  "Panamanian",
  "Papua New Guinean",
  "Paraguayan",
  "Peruvian",
  "Polish",
  "Portuguese",
  "Qatari",
  "Romanian",
  "Russian",
  "Rwandan",
  "Saint Lucian",
  "Salvadoran",
  "Samoan",
  "San Marinese",
  "Sao Tomean",
  "Saudi",
  "Scottish",
  "Senegalese",
  "Serbian",
  "Seychellois",
  "Sierra Leonean",
  "Singaporean",
  "Slovakian",
  "Slovenian",
  "Solomon Islander",
  "Somali",
  "South African",
  "South Korean",
  "Spanish",
  "Sri Lankan",
  "Sudanese",
  "Surinamer",
  "Swazi",
  "Swedish",
  "Swiss",
  "Syrian",
  "Taiwanese",
  "Tajik",
  "Tanzanian",
  "Thai",
  "Togolese",
  "Tongan",
  "Trinidadian or Tobagonian",
  "Tunisian",
  "Turkish",
  "Tuvaluan",
  "Ugandan",
  "Ukrainian",
  "Uruguayan",
  "Uzbekistani",
  "Venezuelan",
  "Vietnamese",
  "Welsh",
  "Yemenite",
  "Zambian",
  "Zimbabwean",
];

export const nationalitiesALT = [
  "Ghanaian",
  "Afghan",
  "Albanian",
  "Algerian",
  "American",
  "Andorran",
  "Angolan",
  "Antiguans",
  "Argentinean",
  "Armenian",
  "Australian",
  "Austrian",
  "Azerbaijani",
  "Bahamian",
  "Bahraini",
  "Bangladeshi",
  "Barbadian",
  "Barbudans",
  "Batswana",
  "Belarusian",
  "Belgian",
  "Belizean",
  "Beninese",
  "Bhutanese",
  "Bolivian",
  "Bosnian",
  "Brazilian",
  "British",
  "Bruneian",
  "Bulgarian",
  "Burkinabe",
  "Burmese",
  "Burundian",
  "Cambodian",
  "Cameroonian",
  "Canadian",
  "Cape Verdean",
  "Central African",
  "Chadian",
  "Chilean",
  "Chinese",
  "Colombian",
  "Comoran",
  "Congolese",
  "Costa Rican",
  "Croatian",
  "Cuban",
  "Cypriot",
  "Czech",
  "Danish",
  "Djibouti",
  "Dominican",
  "Dutch",
  "East Timorese",
  "Ecuadorean",
  "Egyptian",
  "Emirian",
  "Equatorial Guinean",
  "Eritrean",
  "Estonian",
  "Ethiopian",
  "Fijian",
  "Filipino",
  "Finnish",
  "French",
  "Gabonese",
  "Gambian",
  "Georgian",
  "German",
  "Greek",
  "Grenadian",
  "Guatemalan",
  "Guinea-Bissauan",
  "Guinean",
  "Guyanese",
  "Haitian",
  "Herzegovinian",
  "Honduran",
  "Hungarian",
  "I-Kiribati",
  "Icelander",
  "Indian",
  "Indonesian",
  "Iranian",
  "Iraqi",
  "Irish",
  "Israeli",
  "Italian",
  "Ivorian",
  "Jamaican",
  "Japanese",
  "Jordanian",
  "Kazakhstani",
  "Kenyan",
  "Kittian and Nevisian",
  "Kuwaiti",
  "Kyrgyz",
  "Laotian",
  "Latvian",
  "Lebanese",
  "Liberian",
  "Libyan",
  "Liechtensteiner",
  "Lithuanian",
  "Luxembourger",
  "Macedonian",
  "Malagasy",
  "Malawian",
  "Malaysian",
  "Maldivan",
  "Malian",
  "Maltese",
  "Marshallese",
  "Mauritanian",
  "Mauritian",
  "Mexican",
  "Micronesian",
  "Moldovan",
  "Monacan",
  "Mongolian",
  "Moroccan",
  "Mosotho",
  "Motswana",
  "Mozambican",
  "Namibian",
  "Nauruan",
  "Nepalese",
  "New Zealander",
  "Nicaraguan",
  "Nigerian",
  "Nigerien",
  "North Korean",
  "Northern Irish",
  "Norwegian",
  "Omani",
  "Pakistani",
  "Palauan",
  "Panamanian",
  "Papua New Guinean",
  "Paraguayan",
  "Peruvian",
  "Polish",
  "Portuguese",
  "Qatari",
  "Romanian",
  "Russian",
  "Rwandan",
  "Saint Lucian",
  "Salvadoran",
  "Samoan",
  "San Marinese",
  "Sao Tomean",
  "Saudi",
  "Scottish",
  "Senegalese",
  "Serbian",
  "Seychellois",
  "Sierra Leonean",
  "Singaporean",
  "Slovakian",
  "Slovenian",
  "Solomon Islander",
  "Somali",
  "South African",
  "South Korean",
  "Spanish",
  "Sri Lankan",
  "Sudanese",
  "Surinamer",
  "Swazi",
  "Swedish",
  "Swiss",
  "Syrian",
  "Taiwanese",
  "Tajik",
  "Tanzanian",
  "Thai",
  "Togolese",
  "Tongan",
  "Trinidadian or Tobagonian",
  "Tunisian",
  "Turkish",
  "Tuvaluan",
  "Ugandan",
  "Ukrainian",
  "Uruguayan",
  "Uzbekistani",
  "Venezuelan",
  "Vietnamese",
  "Welsh",
  "Yemenite",
  "Zambian",
  "Zimbabwean",
];
