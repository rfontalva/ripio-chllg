const urlEncoding = (str) => {
  let replaced = str.replace(/\\/g, '\\\\');
  replaced = replaced.replace(/\+/g, '%2b');
  replaced = replaced.replace(/'/g, '%27');
  return replaced;
};

const goToUrl = (ext) => {
  window.location.href = `/${ext}`;
};

const goHome = () => {
  window.location.href = '/';
};

const utils = {
  urlEncoding,
  goToUrl,
  goHome,
};

export default utils;
