import { runSaga } from "redux-saga";
import * as api from "./redux/repositories/query";

import {
  setRepositories,
  setRepositoriesError,
} from "./redux/repositories/action";
import { getRepositoriesSaga } from "./redux/repositories/saga";

describe("getRepositoriesSaga", () => {
  it("should call api and dispatch success action", async () => {
    const repositories = {
      total_count: 10,
      items: [
        {
          id: 68911683,
          name: "tetros",
          owner: {
            login: "daniel-e",
            id: 5294331,
            avatar_url: "https://avatars.githubusercontent.com/u/5294331?v=4",
            url: "https://api.github.com/users/daniel-e",
          },
          description: "Tetris that fits into the boot sector.",
          stargazers_url:
            "https://api.github.com/repos/daniel-e/tetros/stargazers",
          url: "https://api.github.com/repos/daniel-e/tetros",
          updated_at: "2021-04-26T23:32:58Z",
          stargazers_count: 716,
          language: "Assembly",
        },
        {
          id: 68911684,
          name: "tetros",
          owner: {
            login: "daniel-e",
            id: 5294331,
            avatar_url: "https://avatars.githubusercontent.com/u/5294331?v=4",
            url: "https://api.github.com/users/daniel-e",
          },
          description: "Tetris that fits into the boot sector.",
          stargazers_url:
            "https://api.github.com/repos/daniel-e/tetros/stargazers",
          url: "https://api.github.com/repos/daniel-e/tetros",
          updated_at: "2021-04-26T23:32:58Z",
          stargazers_count: 716,
          language: "Assembly",
        },
      ],
    };

    const payload = {
      searchTerm: "google",
      language: "python",
      perPage: 10,
      page: 1,
    };

    const requestRepositories = jest
      .spyOn(api, "searchRepositories")
      .mockImplementation(() => Promise.resolve(repositories));

    const dispatched = [];
    const result = await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      getRepositoriesSaga,
      {
        payload,
      }
    );

    expect(requestRepositories).toHaveBeenCalledTimes(1);

    expect(dispatched[0].type).toEqual(setRepositories(repositories).type);

    requestRepositories.mockClear();
  });

  it("should call api and dispatch error action", async () => {
    const requestRepositories = jest
      .spyOn(api, "searchRepositories")
      .mockImplementation(() => Promise.reject());

    const payload = {
      searchTerm: "google",
      language: "python",
      perPage: 10,
      page: 1,
    };
    const dispatched = [];
    const result = await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      getRepositoriesSaga,
      {
        payload,
      }
    );

    expect(requestRepositories).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([setRepositoriesError()]);
    requestRepositories.mockClear();
  });
});
