import "@webcomponents/webcomponentsjs";
import React from "react";
import ReactDOM from "react-dom/client";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import ThemeProvider from "./theme";
import App from "./views/Content/App";

class XElement extends HTMLElement {
  connectedCallback() {
    const $shadowContainer = this.attachShadow({ mode: "open" });
    const $emotionRoot = document.createElement("style");
    const $shadowRoot = document.createElement("div");
    $shadowContainer.appendChild($emotionRoot);
    $shadowContainer.appendChild($shadowRoot);
    const cache = createCache({
      key: "css",
      prepend: true,
      container: $emotionRoot,
    });
    const themeOptions = {
      components: {
        MuiPopover: {
          defaultProps: {
            container: $shadowRoot,
          },
        },
        MuiPopper: {
          defaultProps: {
            container: $shadowRoot,
          },
        },
        MuiModal: {
          defaultProps: {
            container: $shadowRoot,
          },
        },
      },
    };
    ReactDOM.createRoot($shadowRoot).render(
      <React.StrictMode>
        <CacheProvider value={cache}>
          <ThemeProvider themeOptions={themeOptions}>
            <App />
          </ThemeProvider>
        </CacheProvider>
      </React.StrictMode>
    );
  }
}

window.customElements.define("x-content", XElement);
const $content = document.createElement("x-content");
document.body.parentElement.appendChild($content);
