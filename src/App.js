import { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import moment from "moment";

import { getRepositories, resetState } from "./redux/repositories/action";

import useDebounce from "./hooks/useDebounce";

import Loader from "./components/Loader";

const PER_PAGE = 10;

// Usage
function App({ dispatch, status, page, repositories, totalCount, loading }) {
  // State and setters for ...
  // Search term
  const [search, setSearch] = useState({});

  // Debounce search term so that it only gives us latest value ...
  // ... if search has not been updated within last 500ms.
  // The goal is to only have the API call fire when user stops typing ...
  // ... so that we aren't hitting our API rapidly.
  const debouncedSearchTerm = useDebounce(search.search, 500);

  const searchRepositories = () => {
    dispatch(
      getRepositories({
        searchTerm: debouncedSearchTerm,
        language: search.language,
        perPage: PER_PAGE,
        page,
      })
    );
  };

  // Effect for API call
  useEffect(
    () => {
      if (debouncedSearchTerm || search.language) {
        searchRepositories();
      } else {
        dispatch(resetState());
      }
    },
    [debouncedSearchTerm, search.language] // Only call effect if debounced search term changes
  );

  const setFormField = (e) => {
    const { name, value } = e.target;
    dispatch(resetState());
    setSearch({ ...search, [name]: value });
  };

  const hasMore = totalCount ? totalCount - PER_PAGE * page > 0 : false;

  return (
    <div>
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Find a repository..."
        onChange={setFormField}
      />
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
        // // below props only if you need pull down functionality
        // refreshFunction={this.refresh}
        // pullDownToRefresh
        // pullDownToRefreshThreshold={50}
        // pullDownToRefreshContent={
        //   <h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>
        // }
        // releaseToRefreshContent={
        //   <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
        // }
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
    </div>
  );
}

const mapStateToProps = (state) => {
  const {
    repositories: { status, page, repositories, totalCount, loading },
  } = state;
  return { page, status, repositories, totalCount, loading };
};

export default connect(
  mapStateToProps,
  null // Generaly its the place of mapStateToDispatch
)(App);
