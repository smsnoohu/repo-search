import { createAction } from "redux-actions";

export const getRepositories = createAction("GET_REPOSITORIES");
export const setRepositories = createAction("SET_REPOSITORIES");
export const setRepositoriesError = createAction("SET_REPOSITORIES_ERROR");
export const resetState = createAction("RESET_STATE");
