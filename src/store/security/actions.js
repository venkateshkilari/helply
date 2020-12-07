import { CONSTANTS } from "./constants";

const ACTIONS_USER_DETAILS = async ({ commit }) => {
  commit(CONSTANTS.MUTATIONS.USER.USERDETAILS, {});
};

export { ACTIONS_USER_DETAILS };
