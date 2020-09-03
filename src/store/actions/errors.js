import { resetErrorAction } from "./actions";

export const resetError = () => async (dispatch) => {
    dispatch(resetErrorAction())
};
