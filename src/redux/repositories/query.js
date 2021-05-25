import axios from "axios";

export const searchRepositories = ({ searchTerm, language, perPage, page }) =>
  axios.get(
    `https://api.github.com/search/repositories?q=${searchTerm}${
      language ? `+language:${language}` : ""
    }&sort=stars&order=desc&per_page=${perPage}&page=${page}`
  );
