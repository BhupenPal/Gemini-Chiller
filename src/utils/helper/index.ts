// CONSTANTS
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PassRegEx = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?([^\w\s]|[_])).{8,16}$/;
const UserNameRegEx = /^(?=[a-z0-9._]{5,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

export const ValidateEmail = (email: string) => emailRegex.test(String(email).toLowerCase());

export const ValidatePassword = (password: string) => PassRegEx.test(String(password));

export const ValidateUserName = (userName: string) => UserNameRegEx.test(String(userName));

export const invalidPasswordMessage = (password: string) => {
  const special = /^(.*([^\w\s]|[_]).*)$/;
  const alphabet = /^(.*[a-z].*)$/;
  const uppercase = /^(.*[A-Z].*)$/;
  const number = /^(.*[0-9].*)$/;

  if (password.length < 8 || password.length > 16) {
    return 'Password must have at least 8 characters';
  }
  if (!special.test(password)) {
    return 'Password must have an special character';
  }
  if (!alphabet.test(password)) {
    return 'Password must have an lowercase letter';
  }
  if (!uppercase.test(password)) {
    return 'Password must have an uppercase letter';
  }
  if (!number.test(password)) {
    return 'Password must have an number (0-9)';
  }
  return '';
};

export const SetLSWithExpiry = (key: string, value: any, ttl: number) => {
  const now = new Date();

  // `item` is an object which contains the original value
  // as well as the time when it's supposed to expire
  // ttl is in milliseconds
  const item = {
    value,
    expiry: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

export const GetLSWithExpiry = (key: string) => {
  const itemStr = localStorage.getItem(key);

  // if the item doesn't exist, return null
  if (!itemStr) return false;

  const item = JSON.parse(itemStr);
  const now = new Date();
  // compare the expiry time of the item with the current time
  if (now.getTime() > item.expiry) {
    // If the item is expired, delete the item from storage
    // and return null
    localStorage.removeItem(key);
    return null;
  }
  // If item.value is equal to true (STRING) then return boolean
  // Otherwise return original value
  if (item.value === 'true') return true;
  return item.value;
};
