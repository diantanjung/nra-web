function querystring(obj) {
  const qs = Object.keys(obj)
    .map(
      key => Array.isArray(obj[key]) ?
      obj[key].map(v => `${key}=${v}`).join('&') :
      `${key}=${obj[key]}`
    )
    .join('&');

  return qs;
}

export {
  querystring
}