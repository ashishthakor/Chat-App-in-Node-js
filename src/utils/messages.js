const generateMessage = (text) => {
  return {
    text,
    createdAt: new Date().getTime(),
  };
};
const generateLocationMeaasage = (url) => {
  return {
    url,
    createdAt: new Date().getTime(),
  };
};
module.exports = {
  generateMessage,
  generateLocationMeaasage,
};
