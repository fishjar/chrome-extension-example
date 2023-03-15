/*global chrome*/

import { THEME_KEY, THEME_LIGHT, MSG_TYPE_FETCH } from "./consts";

chrome.runtime.onInstalled.addListener(() => {
  console.log("onInstalled");
  chrome.storage.sync.set({ [THEME_KEY]: THEME_LIGHT });
  console.log(`Default theme mode set to ${THEME_KEY}:${THEME_LIGHT}`);
});

chrome.runtime.onMessage.addListener(({ type, args }, sender, sendResponse) => {
  console.log("onMessage", type, args);
  switch (type) {
    case MSG_TYPE_FETCH:
      fetch(args.input, args.init)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          sendResponse({ error: `response status: ${response.status}` });
        })
        .then((data) => sendResponse({ data }))
        .catch((error) => sendResponse({ error: error.message }));
      break;
    default:
      sendResponse({ error: `message type is unavailable: ${type}` });
  }
  return true;
});
