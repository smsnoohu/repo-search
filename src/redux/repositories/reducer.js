import { handleActions } from "redux-actions";
import {
  getRepositories,
  setRepositories,
  setRepositoriesError,
  resetState,
} from "./action";

const DEFAULT_STATE = {
  loading: false,
  page: 1,
  totalCount: 0,
  status: null,
  repositories: [],
};

const handlers = {
  [getRepositories]: (state) => ({ ...state, loading: true }),

  [setRepositories]: (state, action) => {
    if (state.repositories && Array.isArray(state.repositories)) {
      action.payload.items = [...state.repositories, ...action.payload.items];
    }

    const { total_count: totalCount, items: repositories } = action.payload;

    return {
      page: state.page + 1,
      loading: false,
      status: "DONE",
      totalCount,
      repositories,
    };
  },

  [setRepositoriesError]: (state, action) => {
    return { ...DEFAULT_STATE, status: "ERROR" };
  },

  [resetState]: () => {
    return { ...DEFAULT_STATE };
  },
};

export default handleActions(handlers, DEFAULT_STATE);
