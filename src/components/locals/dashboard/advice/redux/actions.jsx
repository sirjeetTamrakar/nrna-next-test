import { deleteAdviceApi, getAdviceApi } from "@/apis/dashboard";
import { errorToast, successToast } from "@/utils/toast";
import * as actions from "./types";

export const getAdvice = (data) => (dispatch) => {
  dispatch({ type: actions.GET_ADVICE_BEGIN });
  getAdviceApi(data)
    .then((res) => {
      dispatch({ type: actions.GET_ADVICE_SUCCESS, payload: res.data });
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.GET_ADVICE_ERROR });
    });
};

export const deleteAdvice = (Data, handleSuccess) => async (dispatch) => {
  dispatch({ type: actions.DELETE_ADVICE_BEGIN });

  try {
    await deleteAdviceApi(Data);
    dispatch({
      type: actions.DELETE_ADVICE_SUCCESS,
    });
    handleSuccess && handleSuccess();
    dispatch(getAdvice());
    successToast("ADVICE has been deleted");
  } catch (error) {
    dispatch({ type: actions.DELETE_ADVICE_ERROR });
    errorToast(error);
  }
};
