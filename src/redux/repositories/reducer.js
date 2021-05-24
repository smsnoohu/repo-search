import { handleActions } from "redux-actions";

import {
  getRepositories,
  setRepositories,
  setRepositoriesError,
  resetState,
} from "./action";

import { STATUS } from "../../constant/constant";

const DEFAULT_STATE = {
  loading: false,
  page: 1,
  totalCount: 0,
  status: null,
  repositories: [],
};

const { SUCCESS, ERROR } = STATUS;

const handlers = {
  // Initiate fetch service
  [getRepositories]: (state) => ({ ...state, loading: true }),

  // Set state after getting responce from service
  [setRepositories]: (state, action) => {
    if (state.repositories && Array.isArray(state.repositories)) {
      action.payload.items = [...state.repositories, ...action.payload.items];
    }

    const { total_count: totalCount, items: repositories } = action.payload;

    return {
      page: state.page + 1,
      loading: false,
      status: SUCCESS,
      totalCount,
      repositories,
    };
  },

  // Set Error state from response
  [setRepositoriesError]: (state, action) => {
    return { ...DEFAULT_STATE, status: ERROR };
  },

  // Reset State
  [resetState]: () => {
    return { ...DEFAULT_STATE };
  },
};

export default handleActions(handlers, DEFAULT_STATE);
