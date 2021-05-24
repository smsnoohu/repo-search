import React from "react";
import moment from "moment";

const ReporTile = (props) => {
  const {
    name,
    stargazers_count,
    language,
    html_url,
    updated_at,
    forks_count,
    owner: { login, avatar_url, url: ownerUrl },
  } = props.data;
  return (
    <div className="repo-result-item">
      <h3>
        <a href={html_url} target="_blank" rel="noreferrer">
          {name}
        </a>
      </h3>
      <div className="user-info">
        <a href={ownerUrl} target="_blank" rel="noreferrer">
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
  );
};

export default ReporTile;
