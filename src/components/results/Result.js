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
            <p className="count" role="status">
              {totalCount} result{totalCount > 1 && <>s</>} found.
            </p>
            <div>
              <button
                id="grid"
                name="grid"
                role="button"
                title="Grid View"
                aria-label="Grid View"
                className={`grid ${grid ? "active" : ""}`}
                onClick={() => setGrid(true)}
              >
                <span aria-hidden="true">&#x2637;</span>
              </button>
              <button
                id="list"
                name="list"
                role="button"
                title="List View"
                aria-label="List View"
                className={`list ${grid ? "" : "active"}`}
                onClick={() => setGrid(false)}
              >
                <span aria-hidden="true">&#x2630;</span>
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
