import axios from "axios";

export function fetchUsers(query, page, limit) {
  if (!query) {
    return Promise.reject("Query should be provided");
  }
  return axios.get(`https://api.github.com/search/users`, {
    params: {
      q: query,
      page: page,
      per_page: limit
    }
  });
}
