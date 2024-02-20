import CustomButton from "@/components/common/CustomButton/CustomButton";
import CustomForm from "@/components/common/Form/CustomForm";
import CustomFormProvider from "@/components/common/Form/CustomFormProvider";
import useYupValidationResolver from "@/hooks/useYupValidationResolver";
import { Box } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateArticle } from "../redux/actions";
import Form from "./Form";
import { editValidationSchema } from "./ValidationSchema";
import { useStyles } from "./styles";

const EditForm = ({ detail, handleClose }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { update_article_loading } = useSelector((state) => state.nbns);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data?.title);
    formData.append("author", data?.author ?? "");
    formData.append("description", data?.description);
    formData.append("excerpt", data?.excerpt);
    formData.append("_method", "PUT");

    if (data?.articleImage?.length > 0) {
      formData.append("articleImage", data?.articleImage?.[0]);
    }
    const typeData = { page: page + 1, pagination_limit: rowsPerPage };

    dispatch(updateArticle(formData, detail?.slug, handleClose, typeData));
  };
  // useEffect(() => {
  //   if (user?.role_name == Roles?.Member) {
  //     setTypeData({ type: 'member', id: user?.id, page: 1, pagination_limit: 10 });
  //   } else if (user?.role_name == Roles?.NCC) {
  //     setTypeData({ type: 'ncc', id: user?.ncc?.id, page: 1, pagination_limit: 10 });
  //   }
  // }, []);

  return (
    <CustomForm onSubmit={onSubmit}>
      <Form featureImage={detail?.article_image} />
      <Box className={classes.footerRoot}>
        <CustomButton buttonName="Update" loading={update_article_loading} />
      </Box>
    </CustomForm>
  );
};
const Edit = ({ data, handleClose }) => {
  const defaultValues = {
    title: data?.title,
    description: data?.description,
    excerpt: data?.excerpt,
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
