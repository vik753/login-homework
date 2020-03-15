import axios from "../plugins/axios";

/**
 * Function login. Make login request to API
 * @param {String} email
 * @param {String} password
 */
export async function login(email, password) {
  try {
    const response = await axios.post(
      `/auth/login`,
      JSON.stringify({ email, password })
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
}

/** Auth Post request '/auth/signup'
email: ["denis.m.pcspace@gmail.com](mailto:%22denis.m.pcspace@gmail.com)",
password: "dmgame12345",
nickname: "dmgame",
first_name: "Denis",
last_name: "Mescheryakov",
phone: "0631234567",
gender_orientation: "male", // or "female"
city: "Kharkiv",
country: "Ukrane",
date_of_birth_day: 01,
date_of_birth_month: 03,
date_of_birth_year: 1989,
*/
/**
 *
 * @param {String} email
 * @param {String} password
 * @param {String} nickname
 * @param {String} first_name
 * @param {String} last_name
 * @param {String} phone
 * @param {String} gender_orientation
 * @param {String} city
 * @param {String} country
 * @param {Number} date_of_birth_day
 * @param {Number} date_of_birth_month
 * @param {Number} date_of_birth_year
 */
export async function auth(
  email,
  password,
  nickname,
  first_name,
  last_name,
  phone,
  gender_orientation,
  city,
  country,
  date_of_birth_day,
  date_of_birth_month,
  date_of_birth_year
) {
  try {
    const response = await axios.post(
      `/auth/signup`,
      JSON.stringify({
        email,
        password,
        nickname,
        first_name,
        last_name,
        phone,
        gender_orientation,
        city,
        country,
        date_of_birth_day,
        date_of_birth_month,
        date_of_birth_year,
      })
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

/**
 * Function getCountries
 */
export async function getCountries() {
  try {
    const response = await axios.get(`/location/get-countries`);
    // console.log('E',response.request.status);
    return response;
  } catch (error) {
    // console.error("EEE", error);
    return Promise.reject(error);
  }
}

/**
 * Function to get cities by country id
 * @param {Number} country_id
 * @returns array of cities
 */
export async function getCitiesByCountryCode(id) {
  try {
    const response = await axios.get(`/location/get-cities/${id}`);
    // console.log(response)
    return response;
  } catch (error) {
    return Promise.reject(error)
  }
}
