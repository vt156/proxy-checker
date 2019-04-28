const request = require("request");

const OK = 0;
const PROXY_UNAVAILABLE = 1;

module.exports.OK = OK;
module.exports.PROXY_UNAVAILABLE = PROXY_UNAVAILABLE;

const req = options =>
  new Promise((resolve, reject) => {
    request(options, (err, res, body) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });

module.exports.checkProxy = async ({
  proxyHost,
  proxyPort,
  proxyUsername,
  proxyPassword
}) => {
  const reqOptions = {
    url: "https://www.google.com/",
    method: "GET",
    proxy:
      proxyUsername == null
        ? `http://${proxyHost}:${proxyPort}`
        : `http://${proxyUsername}:${proxyPassword}@${proxyHost}:${proxyPort}`
  };

  try {
    await req(reqOptions);
    return { code: OK, message: "OK" };
  } catch (e) {
    return { code: PROXY_UNAVAILABLE, message: "Proxy connection error" };
  }
};
