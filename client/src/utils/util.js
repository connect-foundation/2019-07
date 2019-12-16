function parseCookie(cookieString) {
  return cookieString
    .split(';')
    .map(cookie => cookie.split('='))
    .reduce((acc, cookie) => {
      acc[decodeURIComponent(cookie[0].trim())] = decodeURIComponent(
        cookie[1].trim(),
      );
      return acc;
    }, {});
}

export { parseCookie };
