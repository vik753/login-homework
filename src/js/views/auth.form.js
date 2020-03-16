// Function set countries to select
export function setCountriesToSelect(countryEl, store) {
  countryEl.innerHTML = "";
  let template = `<option selected>Choose your country...</option>`;
  Object.entries(store.countries).forEach(([key, val]) => {
    template += `<option value="${val}">${val}</option>`;
  });
  countryEl.innerHTML += template;
}

/**
 * Function fill select of cities data
 * @param {Array} array of cities
 * @param {Element} DOMElement cities
 */
export function setCitiesToSelect(cities, cityEl) {
  cityEl.innerHTML = "";
  let template = `<option selected>Choose your city...</option>`;
  cities.forEach(city => {
    template += `<option value="${city}">${city}</option>`;
  });
  cityEl.innerHTML = template;
  cityEl.removeAttribute("disabled");
}

/**
 * Function set a spinner into the parent element
 * @param {DOMElement} DOMElement cities
 */
export function setSpinner(parentEl) {
  const template = `
    <span
      class="spinner-border spinner-border-sm mr-1"
      role="status"
      aria-hidden="true"
    >
    </span>
  `;
  parentEl.insertAdjacentHTML("afterbegin", template);
}

/**
 * Function remove a spinner from parent element
 * @param {DOMElement} DOMElement cities
 */
export function removeSpinner(parentEl) {
  const spinner = parentEl.querySelector("span.spinner-border");
  parentEl.removeChild(spinner);
}
