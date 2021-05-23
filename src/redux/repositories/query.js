import axios from "axios";

export const searchRepositories = ({ searchTerm, language, perPage, page }) =>
  axios.get(
    `https://apis.github.com/search/repositories?q=${searchTerm}${
      language ? `+language:${language.toLowerCase()}` : ""
    }&sort=stars&order=desc&per_page=${perPage}&page=${page}`
  );
