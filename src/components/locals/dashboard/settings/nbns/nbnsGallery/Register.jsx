import CustomButton from "@/components/common/CustomButton/CustomButton";
import CustomForm from "@/components/common/Form/CustomForm";
import CustomFormProvider from "@/components/common/Form/CustomFormProvider";
import { postGallery } from "@/components/locals/dashboard/nbnsTab/redux/actions";
import useYupValidationResolver from "@/hooks/useYupValidationResolver";
import { Box } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GalleryForm from "./Form";
import { validationSchema } from "./ValidationSchema";
import { useStyles } from "./styles";

const Register = ({ handleClose }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const defaultValues = { created_by: user?.id };
  const classes = useStyles();
  const { gallery_loading } = useSelector((state) => state.nbns);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data?.title);

    if (data?.gallery_image?.length > 0) {
      formData.append("gallery_image", data?.gallery_image?.[0]);
    }
    const typeData = { page: page + 1, pagination_limit: rowsPerPage };

    dispatch(postGallery(formData, handleClose, typeData));
  };

  return (
    <>
      <CustomFormProvider
        defaultValues={defaultValues}
        resolver={useYupValidationResolver(validationSchema)}
      >
        <CustomForm onSubmit={onSubmit}>
          <GalleryForm />
          <Box className={classes.footerRoot}>
            <CustomButton buttonName="Submit" loading={gallery_loading} />
          </Box>
        </CustomForm>
      </CustomFormProvider>
    </>
  );
};

export default Register;
