import { axiosInstance } from "@/apis/_axios";

// get users
export const getAllQuestionsApi = () => {
  return axiosInstance().get("/admin/questions");
};

// create question
export const createQuestionApi = (data) => {
  return axiosInstance().post("/admin/questions", data);
};

// update question
export const updateQuestionApi = (id, data) => {
  return axiosInstance().put(`/admin/questions/${id}`, data);
};

// change status
export const changeStatusApi = (data) => {
  return axiosInstance().post(
    `/admin/questions/${data?.question_id}/status`,
    data
  );
};

// delete question
export const deleteQuestionApi = (id) => {
  return axiosInstance().delete(`/admin/questions/${id}`);
};

// post question front -------->
export const postQuestionFrontApi = (data) => {
  return axiosInstance().post("/api/surveys/answer", data);
};

export const postQuestionCheckFrontApi = (data) => {
  return axiosInstance().post("/admin/surveys/has-already-taken", data);
};

// get survey report
export const getSurveyResultApi = () => {
  return axiosInstance().get(`/admin/surveys/result-by-question`);
};

export const getParticipantsApi = (slug) => {
  return axiosInstance().get(`/admin/surveys/survey-participants/${slug}`);
};

export const getParticipantResultApi = (slug, user_id) => {
  return axiosInstance().get(`/admin/surveys/${slug}/${user_id}/result-detail`);
};

// survey-------------
// get all survey

export const getAllSurveyApi = (data) => {
  const page = data?.page ? `?page=${data?.page}` : "";
  const pagination_limit = data?.pagination_limit
    ? `&pagination_limit=${data?.pagination_limit}`
    : "";
  return axiosInstance().get(`/admin/surveys${page}${pagination_limit}`);
};

// create question
export const createSurveyApi = (data) => {
  return axiosInstance().post("/admin/surveys", data);
};

// update question
export const updateSurveyApi = (id, data) => {
  return axiosInstance().put(`/admin/surveys/${id}`, data);
};

// change status
export const changeSurveyStatusApi = (data) => {
  return axiosInstance().post(`/admin/surveys/${data?.slug}/status`, data);
};

// delete question
export const deleteSurveyApi = (id) => {
  return axiosInstance().delete(`/admin/surveys/${id}`);
};
