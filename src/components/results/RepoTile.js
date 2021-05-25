import React from "react";
import moment from "moment";

const RepoTile = (props) => {
  const {
    name,
    stargazers_count: starCount,
    language,
    html_url: repoUrl,
    updated_at: updatedAt,
    forks_count: forkCount,
    owner: { login: userName, avatar_url: avatarUrl, url: ownerUrl },
  } = props.data;

  return (
    <div className="repo-result-item">
      <h3>
        <a href={repoUrl} target="_blank" rel="noreferrer">
          {name}
        </a>
      </h3>
      <div className="user-info">
        <a href={ownerUrl} target="_blank" rel="noreferrer">
          <img src={avatarUrl} alt={name} />
          <span>{userName}</span>
        </a>
      </div>
      <ul className="repo-info">
        <li className="language-icon" title={language}>
          {language}
        </li>
        <li className="star-icon" title={starCount}>
          {starCount}
        </li>
        <li className="fork-icon" title={forkCount}>
          {forkCount}
        </li>
        <li className="clock-icon" title={moment(updatedAt).fromNow()}>
          {moment(updatedAt).fromNow()}
        </li>
      </ul>
    </div>
  );
};

export default RepoTile;
