import useFetch from "./fetch";

export const useApiGetPosts = (params) => useFetch("/posts", params);
export const useApiGetUsers = (params) => useFetch("/users", params);
