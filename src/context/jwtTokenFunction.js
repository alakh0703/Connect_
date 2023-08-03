function getValidJwtToken() {
    const jwtToken = localStorage.getItem('jwtToken');
  
    if (!jwtToken) {
      // Token not found in local storage
      return null;
    }
  
    if (isTokenExpired()) {
      // Token has expired, remove it from the local storage
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('jwtTokenExpiration');
      return null;
    }
  
    // Token is valid and has not expired
    return jwtToken;
  }
  function isTokenExpired() {
    const expirationTimestamp = localStorage.getItem('jwtTokenExpiration');
    if (!expirationTimestamp) {
      // If the expiration timestamp is not present, consider the token as expired
      return true;
    }
  
    const currentTime = new Date().getTime();
    return currentTime > parseInt(expirationTimestamp, 10);
  }
  
export default getValidJwtToken;  