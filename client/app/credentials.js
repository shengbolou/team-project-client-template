/**
 * Stores authentication credentials.
 */
 var user = null;
 // var debug = require('react-debug');

/**
 * Get the token of the currently authenticated user.
 */
export function getToken() {
  if (isUserLoggedIn()) {
    return localStorage.getItem('token');
  }
  return null;
}

/**
 * Get the user ID of the currently authenticated user.
 */
export function getUserId() {
  if (isUserLoggedIn()) {
    return user._id;
  }
  return null;
}

/**
 * Get the full name of the currently authenticated user.
 */
export function getUserFullName() {
  if (isUserLoggedIn()) {
    return user.fullName;
  }
  return null;
}

/**
 * Update the token and user document of the currently authenticated user.
 */
export function updateCredentials(newUser, newToken) {
  localStorage.setItem('token', newToken);
  localStorage.setItem('user', JSON.stringify(newUser));
}

/**
 * Returns true if the user is logged in.
 * You will implement this during the workshop.
 */
export function isUserLoggedIn() {
  // Replace later.
  user = JSON.parse(localStorage.getItem('user'));
  return user!==null && user!==undefined;
}
/**
 * Logs the user out.
 * You will implement this during the workshop.
 */
 export function logout() {
   localStorage.clear();
 }
