import React from "react";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import { RESULTS_PER_PAGE } from "../../constant/constant";
import ReporTile from "./RepoTile";
import "./result.scss";

const Result = ({ searchRepositories }) => {
  const { page, repositories, totalCount } = useSelector(
    (state) => state.repositories
  );

  const hasMore = totalCount ? totalCount - RESULTS_PER_PAGE * page > 0 : false;
  // infinite-scroll-component
  return (
    <InfiniteScroll
      dataLength={repositories.length}
      next={searchRepositories}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      className="repo-result-container"
      endMessage={
        <>
          {repositories.length && page > 1 ? (
            <p className="end-of-result">
              End of the result. You have seen it all
            </p>
          ) : null}
        </>
      }
    >
      {repositories.map((data) => (
        <ReporTile key={`repo_${data.id}`} data={data} />
      ))}
    </InfiniteScroll>
  );
};

export default Result;
