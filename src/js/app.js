import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import "../css/style.css";

import UI from "./config/ui.config";
import { validate } from "./helpers/validate";
import { showInputError, removeInputError } from "./views/form";
import { login } from "./services/auth.service";
import { notify } from "./views/notifications";
import { getNews } from "./services/news.service";

/*
 * l: denis.m.pcspace@gmail.com
 * p: dmgame12345
 */

//  (^\d{2})?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s-.]?\d{4}

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

const { form, inputEmail, inputPassword } = UI;
const inputs = [inputEmail, inputPassword];

// Events
form.addEventListener("submit", e => {
  e.preventDefault();
  onSubmit();
});
inputs.forEach(el => el.addEventListener("focus", () => removeInputError(el)));

// Handlers
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
