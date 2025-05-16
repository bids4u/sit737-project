/**
 * Save authentication response to local storage.
 * @param {Object} response - The authentication response object.
 */
export const saveAuthResponse = (response) => {
    if (response && response.token) {
        // Save token to localStorage
        localStorage.setItem('authToken', response.token);
    }

    if (response.user) {
        // Save user data to localStorage
        localStorage.setItem('userData', JSON.stringify(response.user));
    }
};
