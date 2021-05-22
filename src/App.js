import { useState, useEffect, useRef } from "react";
import moment from "moment";
import useDebounce from "./hooks/useDebounce";

// Usage
function App() {
  // State and setters for ...
  // Search term
  const [searchTerm, setSearchTerm] = useState("");
  const [language, setLanguage] = useState("");

  // API search results
  const [results, setResults] = useState({});
  // Searching status (whether there is pending API request)
  const [isSearching, setIsSearching] = useState(false);
  // Debounce search term so that it only gives us latest value ...
  // ... if searchTerm has not been updated within last 500ms.
  // The goal is to only have the API call fire when user stops typing ...
  // ... so that we aren't hitting our API rapidly.
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  // Effect for API call
  useEffect(
    () => {
      if (debouncedSearchTerm || language) {
        setIsSearching(true);
        searchRepositories(debouncedSearchTerm, language).then((data) => {
          setIsSearching(false);
          setResults(data);
        });
      } else {
        setResults([]);
        setIsSearching(false);
      }
    },
    [debouncedSearchTerm, language] // Only call effect if debounced search term changes
  );
  const { items: repositories = [] } = results;

  return (
    <div>
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Find a repository..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {isSearching && <div>Searching ...</div>}

      <select
        name="language"
        id="language"
        onChange={(e) => setLanguage(e.target.value)}
      >
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
    </div>
  );
}
// API search function
function searchRepositories(search, language) {
  return fetch(
    `https://api.github.com/search/repositories?q=${search}${
      language ? `+language:${language.toLowerCase()}` : ""
    }&sort=stars&order=desc`,
    {
      method: "GET",
    }
  )
    .then((r) => r.json())
    .then((r) => r)
    .catch((error) => {
      console.error(error);
      return [];
    });
}

export default App;
