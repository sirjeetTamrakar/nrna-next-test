import CustomButton from "@/components/common/CustomButton/CustomButton";
import CustomForm from "@/components/common/Form/CustomForm";
import CustomFormProvider from "@/components/common/Form/CustomFormProvider";
import useYupValidationResolver from "@/hooks/useYupValidationResolver";
import { Box } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postArticle } from "../redux/actions";
import Form from "./Form";
import { validationSchema } from "./ValidationSchema";
import { useStyles } from "./styles";

const Register = ({ handleClose }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const defaultValues = {};
  const classes = useStyles();
  const { article_loading } = useSelector((state) => state.nbns);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data?.title);
    formData.append("author", data?.author ?? "");
    formData.append("description", data?.description);
    formData.append("excerpt", data?.excerpt);

    if (data?.articleImage?.length > 0) {
      formData.append("articleImage", data?.articleImage?.[0]);
    }

    const typeData = { page: page + 1, pagination_limit: rowsPerPage };

    dispatch(postArticle(formData, handleClose, typeData));
  };

  return (
    <>
      <CustomFormProvider
        defaultValues={defaultValues}
        resolver={useYupValidationResolver(validationSchema)}
      >
        <CustomForm onSubmit={onSubmit}>
          <Form />
          <Box className={classes.footerRoot}>
            <CustomButton buttonName="Submit" loading={article_loading} />
          </Box>
        </CustomForm>
      </CustomFormProvider>
    </>
  );
};

export default Register;
