import CustomButton from "@/components/common/CustomButton/CustomButton";
import CustomForm from "@/components/common/Form/CustomForm";
import CustomFormProvider from "@/components/common/Form/CustomFormProvider";
import { Roles } from "@/constants/RoleConstant";
import useYupValidationResolver from "@/hooks/useYupValidationResolver";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewsForm from "./Form";
import { editValidationSchema } from "./ValidationSchema";
import { updateDownload } from "./redux/actions";
import { useStyles } from "./styles";

const EditForm = ({ detail, handleClose }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const { update_download_loading } = useSelector((state) => state.download);
  const { user } = useSelector((state) => state.auth);
  const [typeData, setTypeData] = useState();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data?.title);
    formData.append("description", data?.description);
    formData.append("created_by", user?.id);
    formData.append("_method", "PUT");
    if (data?.file?.length > 0) {
      formData.append("file", data?.file?.[0]);
    }

    dispatch(updateDownload(formData, detail?.slug, handleClose, typeData));
  };
  useEffect(() => {
    if (user?.role_name == Roles?.Member) {
      setTypeData({
        type: "member",
        id: user?.id,
        page: 1,
        pagination_limit: 10,
        user_id: user?.id,
      });
    } else if (user?.role_name == Roles?.NCC) {
      setTypeData({
        type: "ncc",
        id: user?.ncc?.id,
        page: 1,
        pagination_limit: 10,
        user_id: user?.id,
      });
    }
  }, []);

  return (
    <CustomForm onSubmit={onSubmit}>
      <NewsForm featureImage={detail?.file} />
      <Box className={classes.footerRoot}>
        <CustomButton buttonName="Update" loading={update_download_loading} />
      </Box>
    </CustomForm>
  );
};
const Edit = ({ data, handleClose }) => {
  const defaultValues = {
    title: data?.title,
    created_by: data?.created_by?.id,
    description: data?.description,
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
