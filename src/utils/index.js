/*global chrome*/

export const getLocalTime = () => new Date().toLocaleString();

export const sendMsg = (type, args) => {
  return new Promise((resolve, reject) => {
    try {
      chrome.runtime.sendMessage({ type, args }, (res) => {
        resolve(res);
      });
    } catch (error) {
      reject(error);
    }
  });
};
