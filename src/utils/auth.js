import Cookies from 'js-cookie';

const TokenKey = 'isLogged';
const JwtKey = 'jwtKey';

export function isLogged() {
  return Cookies.get(TokenKey) === '1';
}

// after login success
export function setLogged(isLogged) {
  return Cookies.set(TokenKey, isLogged);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

export function getJwtToken() {
  return Cookies.get(JwtKey);
}

export function setJwtToken(jwtToken) {
  return Cookies.set(JwtKey, jwtToken);
}

export function removeJwtToken() {
  return Cookies.remove(JwtKey);
}

export function getOtherQuery(query) {
  return Object.keys(query).reduce((acc, cur) => {
    if (cur !== 'redirect') {
      acc[cur] = query[cur];
    }
    return acc;
  }, {});
}
