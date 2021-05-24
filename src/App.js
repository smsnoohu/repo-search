import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import moment from "moment";

import { getRepositories, resetState } from "./redux/repositories/action";

import useDebounce from "./hooks/useDebounce";

import { Loader, SearchForm, Result } from "./components";

const PER_PAGE = 10;

// Usage
function App() {
  // State and setters for ...
  // Search term
  const [searchForm, setSearchForm] = useState({});
  const dispatch = useDispatch();

  const { status, page, repositories, totalCount, loading } = useSelector(
    (state) => state.repositories
  );

  // Debounce search term so that it only gives us latest value ...
  // ... if search has not been updated within last 500ms.
  // The goal is to only have the API call fire when user stops typing ...
  // ... so that we aren't hitting our API rapidly.
  const debouncedSearchTerm = useDebounce(searchForm.search, 500);

  const searchRepositories = () => {
    dispatch(
      getRepositories({
        searchTerm: debouncedSearchTerm,
        language: searchForm.language,
        perPage: PER_PAGE,
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
    [debouncedSearchTerm, searchForm.language] // Only call effect if debounced search term changes
  );

  const setFormField = (e) => {
    const { name, value } = e.target;
    dispatch(resetState());
    setSearchForm({ ...searchForm, [name]: value });
  };

  const hasMore = totalCount ? totalCount - PER_PAGE * page > 0 : false;

  useEffect(() => {});

  return (
    <section id="wrapper">
      <SearchForm />
      <Result />
      <InfiniteScroll
        dataLength={repositories.length} //This is important field to render the next data
        next={searchRepositories}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <>
            {page > 1 ? (
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            ) : null}
          </>
        }
      >
        {repositories.map(
          ({
            id,
            name,
            stargazers_count,
            stargazers_url,
            language,
            url,
            updated_at,
            owner: { login, avatar_url, url: ownerUrl },
          }) => (
            <div key={`repo_${id}`}>
              <div>
                <a href={url} target="_blank">
                  {name}
                </a>
              </div>
              <div>
                <div>{language}</div>
                <div>
                  *{" "}
                  <a href={stargazers_url} target="_blank">
                    {stargazers_count}
                  </a>
                </div>
                <div>{moment(updated_at).fromNow()}</div>
              </div>
            </div>
          )
        )}
      </InfiniteScroll>
    </section>
  );
}

export default App;
