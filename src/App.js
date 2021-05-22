import { useState, useEffect, useRef } from "react";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroll-component";

import useDebounce from "./hooks/useDebounce";

const PER_PAGE = 10;

// Usage
function App() {
  // State and setters for ...
  // Search term
  const [search, setSearch] = useState({});
  const [page, setPage] = useState(1);

  // API search results
  const [results, setResults] = useState({});
  // Searching status (whether there is pending API request)
  const [isSearching, setIsSearching] = useState(false);
  // Debounce search term so that it only gives us latest value ...
  // ... if search has not been updated within last 500ms.
  // The goal is to only have the API call fire when user stops typing ...
  // ... so that we aren't hitting our API rapidly.
  const debouncedSearchTerm = useDebounce(search.search, 500);

  const searchRepositories = async () => {
    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${debouncedSearchTerm}${
          search.language ? `+language:${search.language.toLowerCase()}` : ""
        }&sort=stars&order=desc&per_page=${PER_PAGE}&page=${page}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      setIsSearching(false);
      if (results.items && Array.isArray(results.items)) {
        data.items = [...results.items, ...data.items];
      }
      setResults(data);
      setPage(page + 1);
    } catch (err) {
      setResults([]);
      setIsSearching(false);
    }
  };

  // Effect for API call
  useEffect(
    async () => {
      if (debouncedSearchTerm || search.language) {
        setIsSearching(true);
        await searchRepositories();
      } else {
        setResults([]);
        setIsSearching(false);
      }
    },
    [debouncedSearchTerm, search.language] // Only call effect if debounced search term changes
  );

  const setFormField = (e) => {
    const { name, value } = e.target;
    setResults({});
    setPage(1);
    setSearch({ ...search, [name]: value });
  };

  const { items: repositories = [], total_count } = results;

  const hasMore = total_count ? total_count - PER_PAGE * page > 0 : false;

  return (
    <div>
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Find a repository..."
        onChange={setFormField}
      />
      {isSearching && <div>Searching ...</div>}

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
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
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

export default App;
