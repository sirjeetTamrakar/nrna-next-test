import { axiosInstance } from "@/apis/_axios";

// get category
export const getCategoryApi = () => {
  return axiosInstance().get("/admin/event-categories");
};

// post category
export const postCategoryApi = (data) => {
  return axiosInstance().post("/admin/event-categories", data);
};

// update category
export const updateCategoryApi = (data, slug) => {
  return axiosInstance().post(`/admin/event-categories/${slug}`, data);
};

// delete category
export const deleteCategoryApi = (data) => {
  return axiosInstance().delete(`/admin/event-categories/${data}`);
};

// change category status
export const changeCategoryStatusApi = (data) => {
  return axiosInstance().post(
    `/admin/event-categories/${data?.slug}/status`,
    data
  );
};

// EVENTS------------------>
// get events
export const getEventsApi = (data) => {
  const page = data?.page ? `?page=${data?.page}` : "";
  const pagination_limit = data?.pagination_limit
    ? `&pagination_limit=${data?.pagination_limit}`
    : "";
  const id = data?.id ? `&ncc_id=${data?.id}` : "";
  return axiosInstance().get(`/admin/events${page}${pagination_limit}${id}`);
};

// post events
export const postEventsApi = (data) => {
  return axiosInstance().post("/admin/events", data);
};

// update events
export const updateEventsApi = (data, slug) => {
  return axiosInstance().post(`/admin/events/${slug}`, data);
};

// delete events
export const deleteEventsApi = (data) => {
  return axiosInstance().delete(`/admin/events/${data}`);
};

// change events status
export const changeEventsStatusApi = (data) => {
  return axiosInstance().post(`/admin/events/${data?.slug}/status`, data);
};
