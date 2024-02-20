import CustomButton from "@/components/common/CustomButton/CustomButton";
import CustomForm from "@/components/common/Form/CustomForm";
import CustomFormProvider from "@/components/common/Form/CustomFormProvider";
import { updateGallery } from "@/components/locals/dashboard/nbnsTab/redux/actions";
import useYupValidationResolver from "@/hooks/useYupValidationResolver";
import { Box } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GalleryForm from "./Form";
import { editValidationSchema } from "./ValidationSchema";
import { useStyles } from "./styles";

const EditForm = ({ detail, handleClose }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { update_gallery_loading } = useSelector((state) => state.nbns);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data?.title);
    formData.append("_method", "PUT");

    if (data?.gallery_image?.length > 0) {
      formData.append("gallery_image", data?.gallery_image?.[0]);
    }

    const typeData = { page: page + 1, pagination_limit: rowsPerPage };

    dispatch(updateGallery(formData, detail?.id, handleClose, typeData));
  };

  return (
    <CustomForm onSubmit={onSubmit}>
      <GalleryForm featureImage={detail?.gallery_image} />
      <Box className={classes.footerRoot}>
        <CustomButton buttonName="Update" loading={update_gallery_loading} />
      </Box>
    </CustomForm>
  );
};
const Edit = ({ data, handleClose }) => {
  const defaultValues = {
    title: data?.title,
    created_by: data?.created_by?.id,
    description: data?.description,
    excerpt: data?.excerpt,
    news_category_id: data?.news_category_id,
  };

  return (
    <>
      <CustomFormProvider
        defaultValues={defaultValues}
        resolver={useYupValidationResolver(editValidationSchema)}
      >
        <EditForm detail={data} handleClose={handleClose} />
      </CustomFormProvider>
    </>
  );
};

export default Edit;
