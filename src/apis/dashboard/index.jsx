import { axiosInstance } from "@/apis/_axios";

// NCC------------------>
// get ncc
export const getNCCApi = (data) => {
  const page = data?.page ? `?page=${data?.page}` : "";
  const pagination_limit = data?.pagination_limit
    ? `&pagination_limit=${data?.pagination_limit}`
    : "";
  return axiosInstance().get(`/admin/ncc${page}${pagination_limit}`);
};

// post ncc
export const postNCCApi = (data) => {
  return axiosInstance().post("/admin/ncc", data);
};

// update ncc
export const updateNCCApi = (data, slug) => {
  return axiosInstance().post(`/admin/ncc/${slug}`, data);
};

// delete ncc
export const deleteNCCApi = (data) => {
  return axiosInstance().delete(`/admin/ncc/${data}`);
};

// change ncc status
export const changeNCCStatusApi = (data) => {
  return axiosInstance().post(`/admin/ncc/${data?.slug}/status`, data);
};

// SETTINGS------------------>
// get site settings
export const getSiteSettingsApi = (data) => {
  const settingable_type = data?.settingable_type
    ? `?settingable_type=${data?.settingable_type}`
    : "";
  const settingable_id = data?.settingable_id
    ? `&settingable_id=${data?.settingable_id}`
    : "";
  return axiosInstance().get(
    `/admin/site-settings${settingable_type}${settingable_id}`
  );
};

// post site settings
export const postSiteSettingsApi = (data) => {
  return axiosInstance().post(`/admin/site-settings`, data);
};

// COUNTRIES LIST
// get countries list
export const getCountriesApi = () => {
  return axiosInstance().get(`/api/countries`);
};

// ADVICE---------------->
// get events
export const getAdviceApi = (data) => {
  const page = data?.page ? `?page=${data?.page}` : "";
  const pagination_limit = data?.pagination_limit
    ? `&pagination_limit=${data?.pagination_limit}`
    : "";
  return axiosInstance().get(`/admin/advices${page}${pagination_limit}`);
};

// delete advice
export const deleteAdviceApi = (data) => {
  return axiosInstance().delete(`/admin/advices/${data}`);
};

// OUR TEAMS---------------->
// get our teams
export const getTeamsApi = (data) => {
  const page = data?.page ? `?page=${data?.page}` : "";
  const pagination_limit = data?.pagination_limit
    ? `&pagination_limit=${data?.pagination_limit}`
    : "";
  const id = data?.id ? `&ncc_id=${data?.id}` : "";
  const type = data?.type ? `&type=${data?.type}` : "";

  const country = data?.country ? `&country=${data?.country}` : "";

  return axiosInstance().get(
    `/admin/our-teams${page}${pagination_limit}${id}${country}${type}`
  );
};

// post our teams
export const postTeamsApi = (data) => {
  return axiosInstance().post("/admin/our-teams", data);
};

// update our teams
export const updateTeamsApi = (data, slug) => {
  return axiosInstance().post(`/admin/our-teams/${slug}`, data);
};

// delete our teams
export const deleteTeamsApi = (data) => {
  return axiosInstance().delete(`/admin/our-teams/${data}`);
};

// change our teams status
export const changeTeamsStatusApi = (data) => {
  return axiosInstance().post(`/admin/our-teams/${data?.slug}/status`, data);
};

// CANDIDATE---------------->
// get candidate
export const getCandidateApi = (data) => {
  const page = data?.page ? `?page=${data?.page}` : "";
  const pagination_limit = data?.pagination_limit
    ? `&pagination_limit=${data?.pagination_limit}`
    : "";
  const id = data?.id ? `&ncc_id=${data?.id}` : "";
  return axiosInstance().get(
    `/admin/ncc-candidates${page}${pagination_limit}${id}`
  );
};

// post candidate
export const postCandidateApi = (data) => {
  return axiosInstance().post("/admin/ncc-candidates", data);
};

// update candidate
export const updateCandidateApi = (data, slug) => {
  return axiosInstance().post(`/admin/ncc-candidates/${slug}`, data);
};

// delete candidate
export const deleteCandidateApi = (data) => {
  return axiosInstance().delete(`/admin/ncc-candidates/${data}`);
};

// change candidate status
export const changeCandidateStatusApi = (data) => {
  return axiosInstance().post(
    `/admin/ncc-candidates/${data?.slug}/status`,
    data
  );
};

// PROFILE------------------>
// get profile
export const getProfileApi = () => {
  return axiosInstance().get("/admin/profile");
};

// post profile
export const postProfileApi = (data) => {
  return axiosInstance().post(`/admin/profile`, data);
};

// BANNER---------------->
// get banner
export const getBannerApi = (data) => {
  const page = data?.page ? `?page=${data?.page}` : "";
  const pagination_limit = data?.pagination_limit
    ? `&pagination_limit=${data?.pagination_limit}`
    : "";
  const bannerable_type = data?.bannerable_type
    ? `&bannerable_type=${data?.bannerable_type}`
    : "";
  const bannerable_id = data?.bannerable_id
    ? `&bannerable_id=${data?.bannerable_id}`
    : "";
  return axiosInstance().get(
    `/admin/banners${page}${pagination_limit}${bannerable_type}${bannerable_id}`
  );
};

// post banner
export const postBannerApi = (data) => {
  return axiosInstance().post("/admin/banners", data);
};

// update banner
export const updateBannerApi = (banner_id, data) => {
  return axiosInstance().post(`/admin/banners/${banner_id}`, data);
};

// delete banner
export const deleteBannerApi = (banner_id) => {
  return axiosInstance().delete(`/admin/banners/${banner_id}`);
};

export const updateBannerStatusApi = (banner_id, data) => {
  return axiosInstance().patch(`/admin/banners/${banner_id}/status`, data);
};

// Department
// get department
export const getDepartmentApi = (data) => {
  const id = data?.id ? `?ncc_id=${data?.id}` : "";

  return axiosInstance().get(`/admin/our-team-categories${id}`);
};

// post department
export const postDepartmentApi = (data) => {
  return axiosInstance().post("/admin/our-team-categories", data);
};

// update department
export const updateDepartmentApi = (data, slug) => {
  return axiosInstance().post(`/admin/our-team-categories/${slug}`, data);
};

// delete department
export const deleteDepartmentApi = (data) => {
  return axiosInstance().delete(`/admin/our-team-categories/${data}`);
};

// change department status
export const changeDepartmentStatusApi = (data) => {
  return axiosInstance().post(
    `/admin/our-team-categories/${data?.slug}/status`,
    data
  );
};

// site setting home data---------------->
// gethomedata
export const getHomeDataApi = (data) => {
  const page = data?.page ? `?page=${data?.page}` : "";
  const pagination_limit = data?.pagination_limit
    ? `&pagination_limit=${data?.pagination_limit}`
    : "";
  const homedataable_type = data?.homedataable_type
    ? `&homedataable_type=${data?.homedataable_type}`
    : "";
  const homedataable_id = data?.homedataable_id
    ? `&homedataable_id=${data?.homedataable_id}`
    : "";
  return axiosInstance().get(
    `/admin/homedata${page}${pagination_limit}${homedataable_type}${homedataable_id}`
  );
};

// posthomedata
export const postHomeDataApi = (data) => {
  return axiosInstance().post("/admin/homedata", data);
};

// updatehomedata
export const updateHomeDataApi = (banner_id, data) => {
  return axiosInstance().post(`/admin/homedata/${banner_id}`, data);
};

// deletehomedata
export const deleteHomeDataApi = (banner_id) => {
  return axiosInstance().delete(`/admin/homedata/${banner_id}`);
};

export const updateHomeDataStatusApi = (data) => {
  return axiosInstance().post(`/admin/homedata/${data?.slug}/status`, data);
};

// delete users
export const deleteUsersApi = (data) => {
  return axiosInstance().delete(`/admin/users/${data}`);
};

// get nbns followers
export const getNbnsFollowersApi = (data) => {
  const page = data?.page ? `?page=${data?.page}` : "";
  const pagination_limit = data?.pagination_limit
    ? `&pagination_limit=${data?.pagination_limit}`
    : "";
  return axiosInstance().get(`/admin/nbns-followers${page}${pagination_limit}`);
};

// post nbns user aprooval
export const nbnsUserApprovalApi = (data) => {
  return axiosInstance().post(
    `/admin/nbns-followers/status/${data?.user_id}`,
    data
  );
};

// EmaiL TEMPLATE---------------->
// get email template
export const getEmailTemplateApi = (data) => {
  const page = data?.page ? `?page=${data?.page}` : "";
  const pagination_limit = data?.pagination_limit
    ? `&pagination_limit=${data?.pagination_limit}`
    : "";
  const email_type = data?.page
    ? data?.email_type
      ? `&email_type=${data?.email_type}`
      : ""
    : data?.email_type
    ? `?email_type=${data?.email_type}`
    : "";
  return axiosInstance().get(
    `/admin/email-template${page}${pagination_limit}${email_type}`
  );
};

// post email template
export const postEmailTemplateApi = (data) => {
  return axiosInstance().post("/admin/email-template", data);
};

// update email template
export const updateEmailTemplateApi = (data, template_id) => {
  return axiosInstance().post(`/admin/email-template/${template_id}`, data);
};

// delete email template
export const deleteEmailTemplateApi = (template_id) => {
  return axiosInstance().delete(`/admin/email-template/${template_id}`);
};

// change email template set status
export const emailTemplateStatusSetApi = (data) => {
  return axiosInstance().post(
    `/admin/email-template/set-default-template/${data?.id}`,
    data
  );
};
// change email template remove status
export const emailTemplateStatusRemoveApi = (data) => {
  return axiosInstance().post(
    `/admin/email-template/remove-default-template/${data?.id}`,
    data
  );
};

// REGION---------------->
// get region
export const getRegionApi = (data) => {
  const page = data?.page ? `?page=${data?.page}` : "";
  const pagination_limit = data?.pagination_limit
    ? `&pagination_limit=${data?.pagination_limit}`
    : "";

  return axiosInstance().get(`/admin/regions${page}${pagination_limit}`);
};

// post region
export const postRegionApi = (data) => {
  return axiosInstance().post("/admin/regions", data);
};

// update region
export const updateRegionApi = (region_id, data) => {
  return axiosInstance().post(`/admin/regions/${region_id}`, data);
};

// delete region
export const deleteRegionApi = (region_id) => {
  return axiosInstance().delete(`/admin/regions/${region_id}`);
};

// update region status
export const updateRegionStatusApi = (data) => {
  return axiosInstance().post(`/admin/regions/status/${data?.slug}`, data);
};

// NBNS GALLERY------------------>
// get gallery
export const getGalleryApi = (data) => {
  const page = data?.page ? `?page=${data?.page}` : "";
  const pagination_limit = data?.pagination_limit
    ? `&pagination_limit=${data?.pagination_limit}`
    : "";

  return axiosInstance().get(`/admin/gallery${page}${pagination_limit}`);
};

// post gallery
export const postGalleryApi = (data) => {
  return axiosInstance().post("/admin/gallery", data);
};

// update gallery
export const updateGalleryApi = (data, id) => {
  return axiosInstance().post(`/admin/gallery/${id}`, data);
};

// delete gallery
export const deleteGalleryApi = (data) => {
  return axiosInstance().delete(`/admin/gallery/${data}`);
};

// change gallery status
export const changeGalleryStatusApi = (data) => {
  return axiosInstance().post(`/admin/gallery/${data?.slug}/status`, data);
};

// NBNS ARTICLE------------------>
// get article
export const getArticleApi = (data) => {
  const page = data?.page ? `?page=${data?.page}` : "";
  const pagination_limit = data?.pagination_limit
    ? `&pagination_limit=${data?.pagination_limit}`
    : "";

  return axiosInstance().get(`/admin/articles${page}${pagination_limit}`);
};

// post article
export const postArticleApi = (data) => {
  return axiosInstance().post("/admin/articles", data);
};

// update article
export const updateArticleApi = (data, slug) => {
  return axiosInstance().post(`/admin/articles/${slug}`, data);
};

// delete article
export const deleteArticleApi = (data) => {
  return axiosInstance().delete(`/admin/articles/${data}`);
};

// change article status
export const changeArticleStatusApi = (data) => {
  return axiosInstance().post(`/admin/articles/status/${data?.slug}`, data);
};

// NBNS PRESS RELEASE------------------>
// get press release
export const getPressReleaseApi = (data) => {
  const page = data?.page ? `?page=${data?.page}` : "";
  const pagination_limit = data?.pagination_limit
    ? `&pagination_limit=${data?.pagination_limit}`
    : "";

  return axiosInstance().get(`/admin/press-release${page}${pagination_limit}`);
};

// post press release
export const postPressReleaseApi = (data) => {
  return axiosInstance().post("/admin/press-release", data);
};

// update press release
export const updatePressReleaseApi = (data, slug) => {
  return axiosInstance().post(`/admin/press-release/${slug}`, data);
};

// delete press release
export const deletePressReleaseApi = (data) => {
  return axiosInstance().delete(`/admin/press-release/${data}`);
};

// change press release status
export const changePressReleaseStatusApi = (data) => {
  return axiosInstance().post(
    `/admin/press-release/status/${data?.slug}`,
    data
  );
};
