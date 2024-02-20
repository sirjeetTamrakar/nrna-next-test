import { axiosInstance } from "@/apis/_axios";

// get downloads
export const getDownloadApi = (data) => {
  const page = data?.page ? `?page=${data?.page}` : "";
  const pagination_limit = data?.pagination_limit
    ? `&pagination_limit=${data?.pagination_limit}`
    : "";
  const type = data?.type
    ? `&downloadable_type=${data?.type}&downloadable_id=${data?.id}`
    : "";
  const search = data?.search ? `&search=${data?.search}` : "";
  const user_id = data?.user_id ? `&user_id=${data?.user_id}` : "";
  return axiosInstance().get(
    `/admin/download-files${page}${pagination_limit}${type}${search}${user_id}`
  );
};

// post news
export const postDownloadApi = (data, typeData) => {
  const type = typeData?.type
    ? `?downloadable_type=${typeData?.type}&downloadable_id=${typeData?.id}`
    : "";
  return axiosInstance().post(`/admin/download-files${type}`, data);
};

// update news
export const updateDownloadApi = (data, slug) => {
  return axiosInstance().post(`/admin/download-files/${slug}`, data);
};

// delete news
export const deleteDownloadApi = (data) => {
  return axiosInstance().delete(`/admin/download-files/${data}`);
};

// change news status
export const changeDownloadStatusApi = (data) => {
  return axiosInstance().post(
    `/admin/download-files/status/${data?.slug}`,
    data
  );
};

export const getPublicDownloadApi = ({
  downloadable_type,
  downloadable_id,
}) => {
  const type = downloadable_type
    ? `?downloadable_type=${downloadable_type}&downloadable_id=${downloadable_id}`
    : "";
  return axiosInstance().get(`/api/download-files${type}`);
};

export const getPublicSingleDownloadApi = (slug) => {
  return axiosInstance().get(`/api/download-files/${slug}`);
};
