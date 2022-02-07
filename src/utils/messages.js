const generateMessage = (username, text) => {
  return {
    username,
    text,
    createdAt: new Date().getTime(),
  };
};
const generateLocationMeaasage = (username, url) => {
  return {
    username,
    url,
    createdAt: new Date().getTime(),
  };
};
module.exports = {
  generateMessage,
  generateLocationMeaasage,
};
