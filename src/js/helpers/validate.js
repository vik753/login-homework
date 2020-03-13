const regExpDic = {
  email: /^([-!#$%&'*+/=?^_`{}|~0-9a-zA-Z]+(\.[-!#$%&'*+/=?^_`{}|~0-9a-zA-Z]+)*|^"([\001-\010\013\014\016-\037!#-\[\]-\177]|\\[\001-011\013\014\016-\177])*")@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}\.?$/,
  password: /^[0-9a-zA-Z]{4,30}$/,
  nickname: /^[0-9a-zA-Z]{4,15}$/,
  first_name: /^[a-zA-Z]{4,}$/,
  last_name: /^[a-zA-Z]{4,}$/,
  phone: /^(\d{3})?[\s-]?(\d{3})?[\s-]?(\d{2})?[\s-]?(\d{2})$/, //050-123-11-12
  gender_orientation: /^(male|female)$/,
  city: /^(([a-zA-Z]{1,})+[\s-]?([a-zA-Z]{1,}))+$/,
  country: /^(([a-zA-Z]{1,})+[\s-]?([a-zA-Z]{1,}))+$/,
  date_of_birth_day: /^[1-9]{1}[0-9]?$/, //min 1, max 39
  date_of_birth_month: /^[0-9]{1}[0-1]?$/, //min 0, max 11
  date_of_birth_year: /^[0-9]{4}$/, //min 4 numbers
};

/**
 *
 * Function validate. Check Input on RegExp provided in regExpDic by data-required type
 * @param {HTMLInputElement} el
 * @returns {Boolean} - Return true if input valid and input has data-required attribute
 */
export function validate(el) {
  const regExpName = el.dataset.required;
  if (!regExpDic[regExpName]) return true;
  return regExpDic[regExpName].test(el.value);
}
