import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import "../css/style.css";

import UI from "./config/ui.config";
import UI_AUTH from "./config/ui.auth.config";
import { validate } from "./helpers/validate";
import { showInputError, removeInputError } from "./views/form";
import {
  login,
  auth,
  getCountries,
  getCitiesByCountryCode,
} from "./services/auth.service";
import { notify } from "./views/notifications";
import { getNews } from "./services/news.service";
import { setCountriesToSelect, setCitiesToSelect } from "./views/auth.form";

/*
 * l: denis.m.pcspace@gmail.com
 * p: dmgame12345
 */
// login elements
const { form, inputEmail, inputPassword } = UI;
const inputs = [inputEmail, inputPassword];
// Auth elements
const {
  auth_form,
  emailEl,
  passwordEl,
  nicknameEl,
  first_nameEl,
  last_nameEl,
  phoneEl,
  genderEl_male,
  genderEl_female,
  cityEl,
  countryEl,
  birth_dayEl,
  birth_monthEl,
  birth_yearEl,
} = UI_AUTH;

const authInputs = [
  emailEl,
  passwordEl,
  nicknameEl,
  first_nameEl,
  last_nameEl,
  phoneEl,
  cityEl,
  countryEl,
  birth_dayEl,
  birth_monthEl,
  birth_yearEl,
];

const store = {
  countries: null,
  cities: null,
};

// Events
document.addEventListener("DOMContentLoaded", async () => {
  await getCountriesToStore();
  await setCountriesToSelect(countryEl, store);
});

countryEl.addEventListener('change', async (e) => {
  const country = Object.entries(store.countries).filter(([key, val]) => {
    return countryEl.value === val;
  });
  const country_id = Number(country[0][0]);

  if (!country_id || country_id === 0) return;
  const cities = await getCitiesByCountryCode(country_id);
  setCitiesToSelect(cities, cityEl);
});

form.addEventListener("submit", e => {
  e.preventDefault();
  console.log(
    auth_form,
    emailEl,
    passwordEl,
    nicknameEl,
    first_nameEl,
    last_nameEl,
    phoneEl,
    genderEl_male,
    genderEl_female,
    cityEl,
    countryEl,
    birth_dayEl,
    birth_monthEl,
    birth_yearEl
  );
  onSubmit();
});
inputs.forEach(el => el.addEventListener("focus", () => removeInputError(el)));

// Function getCountriesToStore
async function getCountriesToStore() {
  await getCountries()
    .then(data => {
      if (!Object.values(data).length) {
        throw new Error(`We didn't get any countries!`);
      }
      store.countries = data;
    })
    .catch(err => {
      // console.dir(err);
      notify({
        msg: `${err}`,
        className: "alert-danger",
      });
    });
}



// Auth submit event
auth_form.addEventListener("submit", e => {
  e.preventDefault();
  // console.log("store", store);
  onAuthSubmit();
});
authInputs.forEach(el =>
  el.addEventListener("focus", () => removeInputError(el))
);

// Handlers
// Auth handler
async function onAuthSubmit() {
  const isValidForm = authInputs.every(el => {
    const isValidInput = validate(el);
    if (!isValidInput && !el.classList.contains("is-invalid")) {
      showInputError(el);
    }
    return isValidInput;
  });

  if (!isValidForm) return;

  try {
    await auth(
      emailEl.value.trim(),
      passwordEl.value.trim(),
      nicknameEl.value.trim(),
      first_nameEl.value.trim(),
      last_nameEl.value.trim(),
      phoneEl.value.trim(),
      genderEl_male.checked ? genderEl_male.value : genderEl_female.value,
      cityEl.value.trim(),
      countryEl.value.trim(),
      Number(birth_dayEl.value.trim()),
      Number(birth_monthEl.value.trim()),
      Number(birth_yearEl.value.trim())
    ).then(res => {
      console.log(res);
      if (res.error) {
        notify({
          msg: `${res.message}`,
          className: "alert-danger",
        });
      }
    });
  } catch (error) {
    console.log(error);
    notify({
      msg: `${error}`,
      className: "alert-danger",
    });
  }
}

// Login Hendler
async function onSubmit() {
  const isValidForm = inputs.every(el => {
    const isValidInput = validate(el);
    if (!isValidInput && !el.classList.contains("is-invalid")) {
      showInputError(el);
    }
    return isValidInput;
  });

  if (!isValidForm) return;

  try {
    await login(inputEmail.value, inputPassword.value);
    await getNews();
    form.reset();
    notify({
      msg: `Login success!`,
      className: "alert-success",
    });
  } catch (error) {
    notify({
      msg: `${error.response.data.message}`,
      className: "alert-danger",
    });
  }
}
