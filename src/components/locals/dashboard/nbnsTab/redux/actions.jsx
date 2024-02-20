import {
  changeArticleStatusApi,
  changePressReleaseStatusApi,
  deleteArticleApi,
  deleteGalleryApi,
  deletePressReleaseApi,
  getArticleApi,
  getGalleryApi,
  getPressReleaseApi,
  postArticleApi,
  postGalleryApi,
  postPressReleaseApi,
  updateArticleApi,
  updateGalleryApi,
  updatePressReleaseApi,
} from "@/apis/dashboard";
import { errorToast, successToast } from "@/utils/toast";
import * as actions from "./types";

export const getGallery = (data) => (dispatch) => {
  dispatch({ type: actions.GET_GALLERY_BEGIN });
  getGalleryApi(data)
    .then((res) => {
      dispatch({ type: actions.GET_GALLERY_SUCCESS, payload: res.data });
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.GET_GALLERY_ERROR });
    });
};

export const postGallery = (data, handleSuccess, typeData) => (dispatch) => {
  dispatch({ type: actions.POST_GALLERY_BEGIN });
  postGalleryApi(data)
    .then((res) => {
      dispatch({ type: actions.POST_GALLERY_SUCCESS });
      handleSuccess && handleSuccess();
      dispatch(getGallery(typeData));
      successToast("Your message sent successfully");
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.POST_GALLERY_ERROR });
    });
};

export const deleteGallery =
  (Data, handleSuccess, typeData) => async (dispatch) => {
    dispatch({ type: actions.DELETE_GALLERY_BEGIN });

    try {
      await deleteGalleryApi(Data);
      dispatch({
        type: actions.DELETE_GALLERY_SUCCESS,
        payload: "",
      });
      handleSuccess && handleSuccess();
      dispatch(getGallery(typeData));
      successToast("Gallery has been deleted");
    } catch (error) {
      dispatch({ type: actions.DELETE_GALLERY_ERROR });
      errorToast(error);
    }
  };

export const updateGallery =
  (Data, id, handleSuccess, typeData) => async (dispatch) => {
    dispatch({ type: actions.UPDATE_GALLERY_BEGIN });

    try {
      await updateGalleryApi(Data, id);
      dispatch({
        type: actions.UPDATE_GALLERY_SUCCESS,
        payload: "",
      });
      handleSuccess && handleSuccess();
      dispatch(getGallery(typeData));
      successToast("Gallery has been updated");
    } catch (error) {
      dispatch({ type: actions.UPDATE_GALLERY_ERROR });
      errorToast(error);
    }
  };

// ARTICLE

export const getArticle = (data) => (dispatch) => {
  dispatch({ type: actions.GET_ARTICLE_BEGIN });
  getArticleApi(data)
    .then((res) => {
      dispatch({ type: actions.GET_ARTICLE_SUCCESS, payload: res.data });
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.GET_ARTICLE_ERROR });
    });
};

export const postArticle = (data, handleSuccess, typeData) => (dispatch) => {
  dispatch({ type: actions.POST_ARTICLE_BEGIN });
  postArticleApi(data)
    .then((res) => {
      dispatch({ type: actions.POST_ARTICLE_SUCCESS });
      handleSuccess && handleSuccess();
      dispatch(getArticle(typeData));
      successToast("Your message sent successfully");
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.POST_ARTICLE_ERROR });
    });
};

export const deleteArticle =
  (Data, handleSuccess, typeData) => async (dispatch) => {
    dispatch({ type: actions.DELETE_ARTICLE_BEGIN });

    try {
      await deleteArticleApi(Data);
      dispatch({
        type: actions.DELETE_ARTICLE_SUCCESS,
        payload: "",
      });
      handleSuccess && handleSuccess();
      dispatch(getArticle(typeData));
      successToast("Article has been deleted");
    } catch (error) {
      dispatch({ type: actions.DELETE_ARTICLE_ERROR });
      errorToast(error);
    }
  };

export const updateArticle =
  (Data, id, handleSuccess, typeData) => async (dispatch) => {
    dispatch({ type: actions.UPDATE_ARTICLE_BEGIN });

    try {
      await updateArticleApi(Data, id);
      dispatch({
        type: actions.UPDATE_ARTICLE_SUCCESS,
        payload: "",
      });
      handleSuccess && handleSuccess();
      dispatch(getArticle(typeData));
      successToast("Article has been updated");
    } catch (error) {
      dispatch({ type: actions.UPDATE_ARTICLE_ERROR });
      errorToast(error);
    }
  };

export const changeArticleStatus =
  (data, handleSuccess, typeData) => (dispatch) => {
    dispatch({ type: actions.CHANGE_ARTICLE_STATUS_BEGIN });
    changeArticleStatusApi(data)
      .then((res) => {
        dispatch({ type: actions.CHANGE_ARTICLE_STATUS_SUCCESS });
        handleSuccess && handleSuccess();
        dispatch(getArticle(typeData));
        successToast("Status has been changed");
      })
      .catch((error) => {
        errorToast(error);
        dispatch({ type: actions.CHANGE_ARTICLE_STATUS_ERROR });
      });
  };

// PRESS RELEASE

export const getPressRelease = (data) => (dispatch) => {
  dispatch({ type: actions.GET_PRESS_RELEASE_BEGIN });
  getPressReleaseApi(data)
    .then((res) => {
      dispatch({ type: actions.GET_PRESS_RELEASE_SUCCESS, payload: res.data });
    })
    .catch((error) => {
      errorToast(error);
      dispatch({ type: actions.GET_PRESS_RELEASE_ERROR });
    });
};

export const postPressRelease =
  (data, handleSuccess, typeData) => (dispatch) => {
    dispatch({ type: actions.POST_PRESS_RELEASE_BEGIN });
    postPressReleaseApi(data)
      .then((res) => {
        dispatch({ type: actions.POST_PRESS_RELEASE_SUCCESS });
        handleSuccess && handleSuccess();
        dispatch(getPressRelease(typeData));
        successToast("Your message sent successfully");
      })
      .catch((error) => {
        errorToast(error);
        dispatch({ type: actions.POST_PRESS_RELEASE_ERROR });
      });
  };

export const deletePressRelease =
  (Data, handleSuccess, typeData) => async (dispatch) => {
    dispatch({ type: actions.DELETE_PRESS_RELEASE_BEGIN });

    try {
      await deletePressReleaseApi(Data);
      dispatch({
        type: actions.DELETE_PRESS_RELEASE_SUCCESS,
        payload: "",
      });
      handleSuccess && handleSuccess();
      dispatch(getPressRelease(typeData));
      successToast("Press release has been deleted");
    } catch (error) {
      dispatch({ type: actions.DELETE_PRESS_RELEASE_ERROR });
      errorToast(error);
    }
  };

export const updatePressRelease =
  (Data, id, handleSuccess, typeData) => async (dispatch) => {
    dispatch({ type: actions.UPDATE_PRESS_RELEASE_BEGIN });

    try {
      await updatePressReleaseApi(Data, id);
      dispatch({
        type: actions.UPDATE_PRESS_RELEASE_SUCCESS,
        payload: "",
      });
      handleSuccess && handleSuccess();
      dispatch(getPressRelease(typeData));
      successToast("Press release has been updated");
    } catch (error) {
      dispatch({ type: actions.UPDATE_PRESS_RELEASE_ERROR });
      errorToast(error);
    }
  };

export const changePressReleaseStatus =
  (data, handleSuccess, typeData) => (dispatch) => {
    dispatch({ type: actions.CHANGE_PRESS_RELEASE_STATUS_BEGIN });
    changePressReleaseStatusApi(data)
      .then((res) => {
        dispatch({ type: actions.CHANGE_PRESS_RELEASE_STATUS_SUCCESS });
        handleSuccess && handleSuccess();
        dispatch(getPressRelease(typeData));
        successToast("Status has been changed");
      })
      .catch((error) => {
        errorToast(error);
        dispatch({ type: actions.CHANGE_PRESS_RELEASE_STATUS_ERROR });
      });
  };
