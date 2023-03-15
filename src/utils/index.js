/*global chrome*/

export const getLocalTime = () => new Date().toLocaleString();

export const sendMsg = (type, args) => {
  return new Promise((resolve, reject) => {
    try {
      chrome.runtime.sendMessage({ type, args }, (res) => {
        if (res.error) {
          reject(new Error(res.error));
        } else {
          resolve(res.data);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};
