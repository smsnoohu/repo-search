import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getRepositories, resetState } from "../../redux/repositories/action";
import useDebounce from "../../hooks/useDebounce";

import { RESULTS_PER_PAGE, STATUS } from "../../constant/constant";

import { Loader, Result, Message } from "../../components";

import "./filter.scss";

const Filter = () => {
  const [searchForm, setSearchForm] = useState({});

  const { search, language } = searchForm;

  const { SUCCESS, ERROR } = STATUS;

  const dispatch = useDispatch();

  const { status, page, loading, repositories } = useSelector(
    (state) => state.repositories
  );

  const debouncedSearchTerm = useDebounce(search, 500);

  const searchRepositories = () => {
    dispatch(
      getRepositories({
        searchTerm: debouncedSearchTerm,
        language: language,
        perPage: RESULTS_PER_PAGE,
        page,
      })
    );
  };

  // Effect for API call
  useEffect(
    () => {
      if (debouncedSearchTerm || language) {
        searchRepositories();
      } else {
        dispatch(resetState());
      }
    },
    [debouncedSearchTerm, language] // Only call effect if debounced search term or language changes
  );

  const setFormField = (e) => {
    const { name, value } = e.target;
    dispatch(resetState());
    setSearchForm({ ...searchForm, [name]: value });
  };

  console.log("status: ", status, repositories.length);

  return (
    <>
      <fieldset className="filter-wrapper" role="search" aria-label="Search API from GitHub">
        <fieldset className="field">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Find a repository..."
            autoComplete="off"
            onChange={setFormField}
          />
          <label htmlFor="search">Search repositories</label>
        </fieldset>

        <select name="language" id="language" onChange={setFormField}>
          <option value="All">All</option>
          <option value="Javascript">Javascript</option>
          <option value="Python">Python</option>
          <option value="Java">Java</option>
          <option value="GoLang">GoLang</option>
          <option value="Ruby">Ruby</option>
          <option value="Rust">Rust</option>
          <option value="C">C</option>
          <option value="Dart">Dart</option>
          <option value="PHP">PHP</option>
        </select>
      </fieldset>

      {repositories.length > 0 && (
        <Result searchRepositories={searchRepositories} />
      )}

      {status === SUCCESS && repositories.length === 0 && (
        <Message status="empty" />
      )}

      {status === ERROR && <Message status="error" />}

      {loading && <Loader />}
    </>
  );
};

export default Filter;
