import React, { useState, useEffect } from "react";
import moment from "moment";

import { dummyData } from "../../dummy";
import "./result.scss";

const Result = () => {
  const [dummy, setDummy] = useState(dummyData);
  return (
    <div className="repo-result-container">
      {dummy &&
        dummy.items &&
        dummy.items.length &&
        dummy.items.map(
          ({
            id,
            name,
            stargazers_count,
            language,
            html_url,
            updated_at,
            forks_count,
            owner: { login, avatar_url, url: ownerUrl },
          }) => (
            <div className="repo-result-item" key={`repo_${id}`}>
              <h3>
                <a href={html_url} target="_blank">
                  {name}
                </a>
              </h3>
              <div className="user-info">
                <a href={ownerUrl} target="_blank">
                  <img src={avatar_url} alt={name} />
                  <span>{login}</span>
                </a>
              </div>
              <ul className="repo-info">
                <li className="language-icon">{language}</li>
                <li className="star-icon">{stargazers_count}</li>
                <li className="fork-icon">{forks_count}</li>
                <li className="clock-icon">{moment(updated_at).fromNow()}</li>
              </ul>
            </div>
          )
        )}
    </div>
  );
};

export default Result;
