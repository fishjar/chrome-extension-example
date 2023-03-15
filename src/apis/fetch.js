import { useState, useEffect, useReducer, useRef } from "react";
import queryString from "query-string";
import { sendMsg } from "../utils";
import { MSG_TYPE_FETCH } from "../consts";

const FETCH_STATUS_IDLE = "idle";
const FETCH_STATUS_LOADING = "loading";
const FETCH_STATUS_SUCCESS = "success";
const FETCH_STATUS_FAILURE = "failure";

const FETCH_TYPE_LOADING = "LOADING";
const FETCH_TYPE_SUCCESS = "SUCCESS";
const FETCH_TYPE_FAILURE = "FAILURE";

const initialState = {
  status: FETCH_STATUS_IDLE,
  error: null,
  data: null,
};

const fetchReducer = (state, action) => {
  switch (action.type) {
    case FETCH_TYPE_LOADING:
      return { ...initialState, status: FETCH_STATUS_LOADING };
    case FETCH_TYPE_SUCCESS:
      return {
        ...initialState,
        status: FETCH_STATUS_SUCCESS,
        data: action.payload,
      };
    case FETCH_TYPE_FAILURE:
      return {
        ...initialState,
        status: FETCH_STATUS_FAILURE,
        error: action.error,
      };
    default:
      return state;
  }
};

const newRequest = (url, params, method) => {
  let body = null;
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  url = `${baseUrl}${url}`;
  if (method === "GET") {
    const stringified = queryString.stringify(params);
    if (stringified) {
      url = `${url}?${stringified}`;
    }
  } else {
    body = JSON.stringify(params);
  }
  const init = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body,
  };
  return [url, init];
};

const useFetch = (url, initialParams = null, method = "GET") => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  const [params, setParams] = useState(initialParams);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    if (!url || !url.trim() || !params) return;

    const abortController = new AbortController();
    const signal = abortController.signal;
    // signal.addEventListener("abort", () => console.log("aborted!!!!!"));
    abortControllerRef.current = abortController;

    const fetchData = async () => {
      dispatch({ type: FETCH_TYPE_LOADING });
      try {
        const [input, init] = newRequest(url, params, method);
        const res = await sendMsg(MSG_TYPE_FETCH, { input, init });
        console.log("fetch res", res);
        if (signal.aborted) return;
        dispatch({
          type: FETCH_TYPE_SUCCESS,
          payload: res,
        });
      } catch (error) {
        console.log("fetch err", error);
        if (signal.aborted) return;
        dispatch({
          type: FETCH_TYPE_FAILURE,
          error: error.message,
        });
      }
    };
    fetchData();

    return () => {
      // console.log("auto abort!")
      abortController.abort();
    };
  }, [url, method, params]);

  const abortFetch = () => {
    // console.log("user abort!")
    abortControllerRef.current && abortControllerRef.current.abort();
  };

  return [state, setParams, abortFetch];
};

export default useFetch;
