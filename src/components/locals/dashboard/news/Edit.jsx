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
import { updateNews } from "./redux/actions";
import { useStyles } from "./styles";

const EditForm = ({ detail, handleClose }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const { update_news_loading, get_category_loading } = useSelector(
    (state) => state.news
  );
  const { user } = useSelector((state) => state.auth);

  const [typeData, setTypeData] = useState();
  const storedValueRole = localStorage.getItem("nccRole");
  const storedValueID = Number(localStorage.getItem("nccRoleID"));

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data?.title);
    formData.append("description", data?.description);
    formData.append("excerpt", data?.excerpt);
    formData.append("created_by", user?.id);
    formData.append("author", data?.author ?? "");

    formData.append("_method", "PUT");
    formData.append("news_category_id", data?.news_category_id);

    if (data?.feature_image?.length > 0) {
      formData.append("feature_image", data?.feature_image?.[0]);
    }

    dispatch(updateNews(formData, detail?.slug, handleClose, typeData));
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
    } else if (
      user?.role_name == Roles?.SuperAdmin &&
      storedValueRole === "ncc"
    ) {
      setTypeData({
        type: "ncc",
        id: storedValueID,
        page: 1,
        pagination_limit: 10,
        user_id: user?.id,
      });
    } else if (
      user?.role_name == Roles?.SuperAdmin &&
      storedValueRole === "admin"
    ) {
      setTypeData({
        page: 1,
        pagination_limit: 10,
        user_id: user?.id,
      });
    }
  }, []);

  return (
    <CustomForm onSubmit={onSubmit}>
      <NewsForm featureImage={detail?.feature_image} />
      {!get_category_loading && (
        <Box className={classes.footerRoot}>
          <CustomButton buttonName="Update" loading={update_news_loading} />
        </Box>
      )}
    </CustomForm>
  );
};
const Edit = ({ data, handleClose }) => {
  const defaultValues = {
    title: data?.title,
    created_by: data?.created_by?.id,
    description: data?.description,
    author: data?.author,
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
