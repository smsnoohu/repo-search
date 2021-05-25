import React, { useState } from "react";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import { RESULTS_PER_PAGE, STATUS } from "../../constant/constant";

import RepoTile from "./RepoTile";

import "./result.scss";

const Result = ({ searchRepositories }) => {
  const { page, repositories, totalCount, status } = useSelector(
    (state) => state.repositories
  );

  const { SUCCESS } = STATUS;

  const [grid, setGrid] = useState(true);

  const hasMore = totalCount ? totalCount - RESULTS_PER_PAGE * page > 0 : false;

  // infinite-scroll-component
  return (
    <>
      <div className="switch-layout">
        {status === SUCCESS && (
          <>
            <p className="count">
              {totalCount} result{totalCount > 1 && <>s</>} found.
            </p>
            <div>
              <button
                id="grid"
                name="grid"
                className={`grid ${grid ? "active" : ""}`}
                onClick={() => setGrid(true)}
              >
                &#x2637;
              </button>
              <button
                id="list"
                name="list"
                className={`list ${grid ? "" : "active"}`}
                onClick={() => setGrid(false)}
              >
                &#x2630;
              </button>
            </div>
          </>
        )}
      </div>
      <InfiniteScroll
        dataLength={repositories.length}
        next={searchRepositories}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        className={`repo-result-container ${grid ? "grid-layout" : ""}`}
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
          <RepoTile key={`repo_${data.id}`} data={data} />
        ))}
      </InfiniteScroll>
    </>
  );
};

export default Result;
