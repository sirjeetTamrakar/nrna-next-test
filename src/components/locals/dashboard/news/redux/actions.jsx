import {
  changeCategoryStatusApi,
  changeNewsStatusApi,
  deleteCategoryApi,
  deleteNewsApi,
  deleteNewsOrderApi,
  getCategoryApi,
  getNewsApi,
  getNewsOrderApi,
  postCategoryApi,
  postNewsApi,
  postNewsOrderApi,
  updateCategoryApi,
  updateNewsApi,
} from "@/apis/dashboard/news";
import { errorToast, successToast } from "@/utils/toast";
import * as actions from "./types";

export const getNews = (data, typeData) => (dispatch) => {
  dispatch({ type: actions.GET_NEWS_BEGIN });
  getNewsApi(data)
    .then((res) => {
      dispatch({ type: actions.GET_NEWS_SUCCESS, payload: res.data });
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.GET_NEWS_ERROR });
    });
};

export const postNews = (data, handleSuccess, typeData) => (dispatch) => {
  dispatch({ type: actions.POST_NEWS_BEGIN });
  postNewsApi(data, typeData)
    .then((res) => {
      dispatch({ type: actions.POST_NEWS_SUCCESS });
      handleSuccess && handleSuccess();
      dispatch(getNews(typeData));
      successToast("Your message sent successfully");
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.POST_NEWS_ERROR });
    });
};

export const deleteNews =
  (Data, handleSuccess, typeData) => async (dispatch) => {
    dispatch({ type: actions.DELETE_NEWS_BEGIN });

    try {
      await deleteNewsApi(Data);
      dispatch({
        type: actions.DELETE_NEWS_SUCCESS,
        payload: "",
      });
      dispatch(getNews(typeData));
      handleSuccess && handleSuccess();
      successToast("News has been deleted");
    } catch (error) {
      dispatch({ type: actions.DELETE_NEWS_ERROR });
      errorToast(error);
    }
  };

export const updateNews =
  (Data, slug, handleSuccess, typeData) => async (dispatch) => {
    dispatch({ type: actions.UPDATE_NEWS_BEGIN });
    try {
      await updateNewsApi(Data, slug);
      dispatch({
        type: actions.UPDATE_NEWS_SUCCESS,
        payload: "",
      });
      dispatch(getNews(typeData));
      handleSuccess && handleSuccess();
      successToast("News has been updated");
    } catch (error) {
      dispatch({ type: actions.UPDATE_NEWS_ERROR });
      errorToast(error);
    }
  };

export const changeNewsStatus =
  (data, handleSuccess, typeData) => (dispatch) => {
    dispatch({ type: actions.CHANGE_NEWS_STATUS_BEGIN });
    changeNewsStatusApi(data)
      .then((res) => {
        dispatch({ type: actions.CHANGE_NEWS_STATUS_SUCCESS });
        handleSuccess && handleSuccess();
        dispatch(getNews(typeData));
        successToast("Status has been changed");
      })
      .catch((error) => {
        errorToast(error);
        dispatch({ type: actions.CHANGE_NEWS_STATUS_ERROR });
      });
  };

export const getCategory = () => (dispatch) => {
  dispatch({ type: actions.GET_CATEGORY_BEGIN });
  getCategoryApi()
    .then((res) => {
      dispatch({ type: actions.GET_CATEGORY_SUCCESS, payload: res.data.data });
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.GET_CATEGORY_ERROR });
    });
};

export const postCategory = (data, handleSuccess) => (dispatch) => {
  dispatch({ type: actions.POST_CATEGORY_BEGIN });
  postCategoryApi(data)
    .then((res) => {
      dispatch({ type: actions.POST_CATEGORY_SUCCESS });
      handleSuccess && handleSuccess();
      dispatch(getCategory());
      successToast("Category added successfully");
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.POST_CATEGORY_ERROR });
    });
};

export const deleteCategory = (Data, handleSuccess) => async (dispatch) => {
  dispatch({ type: actions.DELETE_CATEGORY_BEGIN });

  try {
    await deleteCategoryApi(Data);
    dispatch({
      type: actions.DELETE_CATEGORY_SUCCESS,
      payload: "",
    });
    dispatch(getCategory());
    handleSuccess && handleSuccess();
    successToast("Category has been deleted");
  } catch (error) {
    dispatch({ type: actions.DELETE_CATEGORY_ERROR });
    errorToast(error);
  }
};

export const updateCategory =
  (Data, slug, handleSuccess) => async (dispatch) => {
    dispatch({ type: actions.UPDATE_CATEGORY_BEGIN });

    try {
      await updateCategoryApi(Data, slug);
      dispatch({
        type: actions.UPDATE_CATEGORY_SUCCESS,
        payload: "",
      });
      dispatch(getCategory());
      handleSuccess && handleSuccess();
      successToast("Category has been updated");
    } catch (error) {
      dispatch({ type: actions.UPDATE_CATEGORY_ERROR });
      errorToast(error);
    }
  };

export const changeCategoryStatus = (data, handleSuccess) => (dispatch) => {
  dispatch({ type: actions.CHANGE_CATEGORY_STATUS_BEGIN });
  changeCategoryStatusApi(data)
    .then((res) => {
      dispatch({ type: actions.CHANGE_CATEGORY_STATUS_SUCCESS });
      handleSuccess && handleSuccess();
      dispatch(getCategory());
      successToast("Status has been changed");
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.CHANGE_CATEGORY_STATUS_ERROR });
    });
};

export const postNewsOrder = (data, handleSuccess) => (dispatch) => {
  dispatch({ type: actions.POST_NEWS_ORDER_BEGIN });
  postNewsOrderApi(data)
    .then((res) => {
      dispatch({ type: actions.POST_NEWS_ORDER_SUCCESS });
      handleSuccess && handleSuccess();
      // dispatch(getNews(typeData));
      successToast("Your message sent successfully");
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.POST_NEWS_ORDER_ERROR });
    });
};

export const deleteNewsOrder =
  (Data, handleSuccess, typeData) => async (dispatch) => {
    dispatch({ type: actions.DELETE_NEWS_ORDER_BEGIN });

    try {
      await deleteNewsOrderApi(Data);
      dispatch({
        type: actions.DELETE_NEWS_ORDER_SUCCESS,
        payload: "",
      });
      dispatch(getNews(typeData));
      handleSuccess && handleSuccess();
      successToast("News order has been deleted");
    } catch (error) {
      dispatch({ type: actions.DELETE_NEWS_ORDER_ERROR });
      errorToast(error);
    }
  };

export const getNewsOrder = () => (dispatch) => {
  dispatch({ type: actions.GET_NEWS_ORDER_BEGIN });
  getNewsOrderApi()
    .then((res) => {
      dispatch({
        type: actions.GET_NEWS_ORDER_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.GET_NEWS_ORDER_ERROR });
    });
};

export const setNewsSearch = (data) => (dispatch) => {
  dispatch({ type: actions.SEARCH_NEWS, payload: data });
};
