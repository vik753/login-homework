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
  cityEl.innerHTML = '';
  let template = `<option selected>Choose your city...</option>`;
  cities.forEach(city => {
    template += `<option value="${city}">${city}</option>`;
  });
  cityEl.innerHTML = template;
  cityEl.removeAttribute("disabled");
}
