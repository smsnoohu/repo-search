import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getRepositories, resetState } from "../../redux/repositories/action";

import useDebounce from "../../hooks/useDebounce";
import { Loader } from "../";
import "./search-form.scss";

const SearchForm = () => {
  const [searchForm, setSearchForm] = useState({});

  const dispatch = useDispatch();

  const { status, page, repositories, totalCount, loading } = useSelector(
    (state) => state.repositories
  );

  const debouncedSearchTerm = useDebounce(searchForm.search, 500);

  const setFormField = (e) => {
    const { name, value } = e.target;
    dispatch(resetState());
    setSearchForm({ ...searchForm, [name]: value });
  };

  return (
    <div className="search-wrapper">
      <div className="search-form">
        <div class="field">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Find a repository..."
            autocomplete="off"
            onChange={setFormField}
          />
          <label for="search">Search repositories</label>
        </div>

        {loading && <Loader />}

        <select name="language" id="language" onChange={setFormField}>
          <option>All</option>
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
      {status && <p>{totalCount} results found</p>}
    </div>
  );
};

export default SearchForm;
