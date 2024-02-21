import { axiosInstance } from "@/apis/_axios";

// get site settings
export const getSiteSettingsApi = (data) => {
  const type = data?.type ? `?settingable_type=${data?.type}` : "";
  const id = data?.id ? `&settingable_id=${data?.id}` : "";
  return axiosInstance().get(`/api/site-settings${type}${id}`);
};

// export const getAllNewsApi = () => {
//   return axiosInstance().get(`/api/news`);
// };

// get all news
export const getAllNewsApi = (data) => {
  const type = data?.type ? `?newsable_type=${data?.type}` : "";
  const id = data?.id ? `&newsable_id=${data?.id}` : "";
  const limit = data?.type
    ? data?.limit
      ? `&pagination_limit=${data?.limit}`
      : ""
    : data?.limit
    ? `?pagination_limit=${data?.limit}`
    : "";
  const category_id = data?.category_id
    ? `&category_id=${data?.category_id}`
    : "";
  const status = data?.status ? `&status=${data?.status}` : "";
  const query = data?.query ? `&search=${data?.query}` : "";
  const user_id = data?.user_id ? `&user_id=${data?.user_id}` : "";

  return axiosInstance().get(
    `/api/news${type}${limit}${id}${category_id}${status}${query}${user_id}`
  );
};

// get news category
export const getNewsCategoryApi = () => {
  return axiosInstance().get(`/api/news-categories`);
};

// get single news
export const getSingleNewsApi = (slug) => {
  return axiosInstance().get(`/api/news/${slug}`);
};

// get all events
// export const getAllEventsApi = () => {
//   return axiosInstance().get(`/api/events`);
// };

export const getAllEventsApi = (data) => {
  // const type = data?.type ? `?newsable_type=${data?.type}` : '';
  const limit = data?.limit ? `?pagination_limit=${data?.limit}` : "";
  // const id = data?.ncc_id ? `&ncc_id=${data?.ncc_id}` : '';
  const id = data?.limit
    ? data?.ncc_id
      ? `&ncc_id=${data?.ncc_id}`
      : ""
    : data?.ncc_id
    ? `?ncc_id=${data?.ncc_id}`
    : "";
  const query = data?.query ? `&search=${data?.query}` : "";
  return axiosInstance().get(`/api/events${limit}${id}${query}`);
};

// get events category
export const getEventsCategoryApi = () => {
  return axiosInstance().get(`/api/event-categories`);
};

// get single evnet
export const getSingleEventApi = (slug) => {
  return axiosInstance().get(`/api/events/${slug}`);
};

// send contact us
export const contactUsApi = (data) => {
  return axiosInstance().post(`/api/contact-us`, data);
};
// export const contactUsApi = (data, typeData) => {
//   const type = typeData?.type
//     ? `?contactable_type=${typeData?.type}&contactable_id=${typeData?.id}`
//     : '';
//   return axiosInstance().post(`/api/contact-us${type}`, data);
// };

export const getContactUsApi = (data) => {
  const page = data?.page ? `?page=${data?.page}` : "";
  const pagination_limit = data?.pagination_limit
    ? `&pagination_limit=${data?.pagination_limit}`
    : "";
  const type = data?.type
    ? `&contactable_type=${data?.type}&contactable_id=${data?.id}`
    : "";
  return axiosInstance().get(
    `/admin/contact-us${page}${pagination_limit}${type}`
  );
};

// get contact
export const deleteContactApi = (id) => {
  return axiosInstance().delete(`/admin/contact-us/${id}`);
};

// get banner
export const getBannerApi = (data) => {
  const type = data?.type ? `?bannerable_type=${data?.type}` : "";
  const id = data?.id ? `&bannerable_id=${data?.id}` : "";
  return axiosInstance().get(`/api/banners${type}${id}`);
};

// get teams
// export const getTeamsApi = () => {
//   return axiosInstance().get(`/api/our-teams`);
// };

export const getTeamsApi = (data) => {
  const id = data?.ncc_id ? `?ncc_id=${data?.ncc_id}` : "";
  const limit = data?.id
    ? data?.limit
      ? `&pagination_limit=${data?.limit}`
      : ""
    : data?.limit
    ? `?pagination_limit=${data?.limit}`
    : "";
  const type = data?.type ? `&type=${data?.type}` : "";
  const category_id = data?.category_id
    ? `&category_id=${data?.category_id}`
    : "";
  const country = data?.country ? `&country=${data?.country}` : "";
  return axiosInstance().get(
    `/api/our-teams${id}${limit}${category_id}${type}${country}`
  );
};

// get single news
export const getSingleTeamsApi = (slug) => {
  return axiosInstance().get(`/api/our-teams/${slug}`);
};

// get candidates
export const getCandidatesApi = (data) => {
  const limit = data?.limit ? `?pagination_limit=${data?.limit}` : "";
  const country = data?.limit
    ? data?.country
      ? `&country=${data?.country}`
      : ""
    : data?.country
    ? `?country=${data?.country}`
    : "";
  return axiosInstance().get(`/api/ncc-candidates${country}${limit}`);
};

// get ncc
export const getNccApi = (data) => {
  const limit = data?.continent
    ? data?.limit
      ? `&pagination_limit=${data?.limit}`
      : ""
    : data?.limit
    ? `?pagination_limit=${data?.limit}`
    : "";
  const continent = data?.limit
    ? data?.continent
      ? `&continent=${data?.continent}`
      : ""
    : data?.continent
    ? `?continent=${data?.continent}`
    : "";
  const region = data?.limit
    ? data?.region
      ? `&region=${data?.region}`
      : ""
    : data?.region
    ? `?region=${data?.region}`
    : "";
  return axiosInstance().get(`/api/ncc${limit}${continent}${region}`);
};

// get single news
export const getSingleNCCApi = (slug) => {
  return axiosInstance().get(`/api/ncc/${slug}`);
};

// get our team department
export const getDepartmentApi = (data) => {
  const id = data?.ncc_id ? `?ncc_id=${data?.ncc_id}` : "";
  return axiosInstance().get(`/api/our-team-categories${id}`);
};

// get all continents
export const getContinentsApi = () => {
  return axiosInstance().get(`/api/continents`);
};

// get business
export const getBusinessApi = (data) => {
  const limit = data?.limit ? `?pagination_limit=${data?.limit}` : "";
  const country = data?.limit
    ? data?.country
      ? `&country=${data?.country}`
      : ""
    : data?.country
    ? `?country=${data?.country}`
    : "";
  const query = data?.query ? `&search=${data?.query}` : "";
  return axiosInstance().get(`/api/businesses${limit}${country}${query}`);
};

// get single business
export const getSingleBusinessApi = (slug) => {
  return axiosInstance().get(`/api/businesses/${slug}`);
};

// send business contact
export const businessContactApi = (data) => {
  return axiosInstance().post(`/api/business-contact`, data);
};

// get business category
export const getBusinessCategoryApi = () => {
  return axiosInstance().get(`/api/business-categories`);
};

// get countries list
export const getCountriesApi = () => {
  return axiosInstance().get(`/api/countries`);
};

// get single user
export const getSingleUserApi = (slug) => {
  return axiosInstance().get(`/api/users/${slug}`);
};

// post team contact
export const postTeamContactApi = (data) => {
  return axiosInstance().post("/api/team-contact", data);
};

// post advice
export const postAdviceApi = (data) => {
  return axiosInstance().post("/api/advices", data);
};

// get all homedata
export const getAllHomeDataApi = (data) => {
  const type = data?.type ? `?homedataable_type=${data?.type}` : "";
  const id = data?.id ? `&homedataable_id=${data?.id}` : "";
  return axiosInstance().get(`/api/homedata${type}${id}`);
};

// get single homedata
export const getSingleHomeDataApi = (slug) => {
  return axiosInstance().get(`/api/homedata/${slug}`);
};

// get questions public
export const getAllQuestionsApi = () => {
  return axiosInstance().get("/api/questions");
};

// check survey taken with email
export const postCheckEmailApi = (data) => {
  return axiosInstance().post(`/api/surveys/checkemail`, data);
};

// get questions public
export const getAllSurveyApi = () => {
  return axiosInstance().get("/api/surveys");
};

// get countries with country code list
export const getCountriesCodeApi = () => {
  return axiosInstance().get(`/api/countries-code`);
};

// join business post
export const businessJoinApi = (data) => {
  return axiosInstance().post(`/api/business-follow`, data);
};

// get business followers
export const getBusinessFollowApi = (data) => {
  const user_id = data?.user_id ? `?user_id=${data?.user_id}` : "";
  const business_id = data?.business_id
    ? `&business_id=${data?.business_id}`
    : "";
  return axiosInstance().get(`/api/business-follow${user_id}${business_id}`);
};

// delete business follow
export const deleteBusinessFollowApi = (data) => {
  return axiosInstance().delete(
    `/api/business-follow/${data?.user_id}/${data?.business_id}`
  );
};

// join nbns post
export const nbnsJoinApi = (data) => {
  return axiosInstance().post(`/api/follow_nbns/${data?.user_id}`);
};

// get nbns followers
export const getNbnsFollowApi = (data) => {
  const user_id = data?.user_id ? `?user_id=${data?.user_id}` : "";
  return axiosInstance().get(`/api/nbns-followers${user_id}`);
};

// delete nbns follow
export const deleteNbnsFollowApi = (data) => {
  return axiosInstance().post(`/api/unfollow_nbns/${data?.user_id}`);
};

// check survey taken with email
export const postBusinessCreateAccountApi = (data) => {
  return axiosInstance().post(`/api/business-follow/create-account`, data);
};

// get regions
export const getRegionsApi = () => {
  return axiosInstance().get(`/api/regions`);
};

// get all gallery images
export const getGalleryApi = (data) => {
  const limit = data?.limit ? `?pagination_limit=${data?.limit}` : "";

  return axiosInstance().get(`/api/gallery${limit}`);
};

// get articles
export const getArticlesApi = (data) => {
  const limit = data?.limit ? `?pagination_limit=${data?.limit}` : "";
  const query = data?.query ? `&search=${data?.query}` : "";
  return axiosInstance().get(`/api/articles${limit}${query}`);
};

// get single articles
export const getSingleArticleApi = (slug) => {
  return axiosInstance().get(`/api/articles/${slug}`);
};

// get press release
export const getPressReleaseApi = (data) => {
  const limit = data?.limit ? `?pagination_limit=${data?.limit}` : "";
  const query = data?.query ? `&search=${data?.query}` : "";
  return axiosInstance().get(`/api/press-release${limit}${query}`);
};

// get single press release
export const getSinglePressReleaseApi = (slug) => {
  return axiosInstance().get(`/api/press-release/${slug}`);
};
