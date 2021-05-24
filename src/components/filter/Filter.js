import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getRepositories, resetState } from "../../redux/repositories/action";
import useDebounce from "../../hooks/useDebounce";
import { Loader, Result, Error } from "../../components";
import { RESULTS_PER_PAGE, STATUS } from "../../constant/constant";
import "./filter.scss";

const Filter = () => {
  const [searchForm, setSearchForm] = useState({});

  const { SUCCESS, ERROR } = STATUS;

  const dispatch = useDispatch();

  const { status, page, totalCount, loading } = useSelector(
    (state) => state.repositories
  );

  const debouncedSearchTerm = useDebounce(searchForm.search, 500);

  const searchRepositories = () => {
    dispatch(
      getRepositories({
        searchTerm: debouncedSearchTerm,
        language: searchForm.language,
        perPage: RESULTS_PER_PAGE,
        page,
      })
    );
  };

  // Effect for API call
  useEffect(
    () => {
      if (debouncedSearchTerm || searchForm.language) {
        searchRepositories();
      } else {
        dispatch(resetState());
      }
    },
    [debouncedSearchTerm, searchForm.language] // Only call effect if debounced search term or language changes
  );

  const setFormField = (e) => {
    const { name, value } = e.target;
    dispatch(resetState());
    setSearchForm({ ...searchForm, [name]: value });
  };

  return (
    <>
      <div className="filter-wrapper">
        <div className="filter-container">
          <div className="field">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Find a repository..."
              autoComplete="off"
              onChange={setFormField}
            />
            <label htmlFor="search">Search repositories</label>
          </div>

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
        </div>
        {status === SUCCESS && <p>{totalCount} results found</p>}
      </div>

      <Result searchRepositories={searchRepositories} />

      {status === ERROR && <Error />}

      {loading && <Loader />}
    </>
  );
};

export default Filter;
