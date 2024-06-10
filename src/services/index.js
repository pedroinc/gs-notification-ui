const baseURL = process.env.REACT_APP_BASE_URL;

const Methods = { GET: "GET", POST: "POST" };

const defaultHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json;charset=UTF-8",
};

export const sendMessage = (categoryId, content) => {
  return fetch(`${baseURL}/messages`, {
    method: Methods.POST,
    headers: defaultHeaders,
    body: JSON.stringify({ categoryId, content }),
  });
};

export const fetchLogs = () => {
  return fetch(`${baseURL}/logs`, {
    method: Methods.GET,
    headers: defaultHeaders,
  });
};

export const fetchCategories = () => {
  return fetch(`${baseURL}/categories`, {
    method: Methods.GET,
    headers: defaultHeaders,
  });
};
