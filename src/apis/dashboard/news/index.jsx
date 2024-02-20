import { axiosInstance } from "@/apis/_axios";

// get category
export const getCategoryApi = () => {
  return axiosInstance().get("/admin/news-categories");
};

// post category
export const postCategoryApi = (data) => {
  return axiosInstance().post("/admin/news-categories", data);
};

// update category
export const updateCategoryApi = (data, slug) => {
  return axiosInstance().post(`/admin/news-categories/${slug}`, data);
};

// delete category
export const deleteCategoryApi = (data) => {
  return axiosInstance().delete(`/admin/news-categories/${data}`);
};

// change category status
export const changeCategoryStatusApi = (data) => {
  return axiosInstance().post(
    `/admin/news-categories/${data?.slug}/status`,
    data
  );
};

// NEWS---------------->
// get news
export const getNewsApi = (data) => {
  const page = data?.page ? `?page=${data?.page}` : "";
  const pagination_limit = data?.pagination_limit
    ? `&pagination_limit=${data?.pagination_limit}`
    : "";
  const type = data?.type
    ? `&newsable_type=${data?.type}&newsable_id=${data?.id}`
    : "";
  const search = data?.search ? `&search=${data?.search}` : "";
  const user_id = data?.user_id ? `&user_id=${data?.user_id}` : "";
  return axiosInstance().get(
    `/admin/news${page}${pagination_limit}${type}${search}${user_id}`
  );
};

// post news
export const postNewsApi = (data, typeData) => {
  const type = typeData?.type
    ? `?newsable_type=${typeData?.type}&newsable_id=${typeData?.id}`
    : "";
  return axiosInstance().post(`/admin/news${type}`, data);
};

// update news
export const updateNewsApi = (data, slug) => {
  return axiosInstance().post(`/admin/news/${slug}`, data);
};

// delete news
export const deleteNewsApi = (data) => {
  return axiosInstance().delete(`/admin/news/${data}`);
};

// change news status
export const changeNewsStatusApi = (data) => {
  return axiosInstance().post(`/admin/news/${data?.slug}/status`, data);
};

// post news order
export const postNewsOrderApi = (data) => {
  return axiosInstance().post(`/admin/news-order`, data);
};

// delete news
export const deleteNewsOrderApi = (data) => {
  return axiosInstance().delete(`/admin/news/news-order/${data}`);
};

// get category
export const getNewsOrderApi = () => {
  return axiosInstance().get("/admin/news-order");
};
