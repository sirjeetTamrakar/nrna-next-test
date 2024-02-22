import CustomButton from "@/components/common/CustomButton/CustomButton";
import CustomForm from "@/components/common/Form/CustomForm";
import CustomFormProvider from "@/components/common/Form/CustomFormProvider";
import { Roles } from "@/constants/RoleConstant";
import useYupValidationResolver from "@/hooks/useYupValidationResolver";
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import NewsForm from "./Form";
import { validationSchema } from "./ValidationSchema";
import { postNews } from "./redux/actions";
import { useStyles } from "./styles";

const Register = ({ handleClose }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const defaultValues = { created_by: user?.id };
  const classes = useStyles();
  const { news_loading } = useSelector((state) => state.news);
  const { get_category_loading } = useSelector((state) => state.news);

  const {
    formState: { errors },
  } = useForm();

  const storedValueRole = localStorage.getItem("nccRole");
  const storedValueID = Number(localStorage.getItem("nccRoleID"));

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data?.title);
    formData.append("description", data?.description);
    formData.append("excerpt", data?.excerpt);
    formData.append("created_by", user?.id);
    formData.append("author", data?.author ?? "");
    formData.append("news_category_id", data?.news_category_id);

    if (data?.feature_image?.length > 0) {
      formData.append("feature_image", data?.feature_image?.[0]);
    }
    let typeData;
    if (user?.role_name == Roles?.Member) {
      typeData = {
        type: "member",
        id: user?.id,
        page: 1,
        pagination_limit: 10,
        user_id: user?.id,
      };
    } else if (user?.role_name == Roles?.NCC) {
      typeData = {
        type: "ncc",
        id: user?.ncc?.id,
        page: 1,
        pagination_limit: 10,
        user_id: user?.id,
      };
    } else if (
      user?.role_name == Roles?.SuperAdmin &&
      storedValueRole === "ncc"
    ) {
      typeData = {
        type: "ncc",
        id: storedValueID,
        page: 1,
        pagination_limit: 10,
        user_id: user?.id,
      };
    } else if (
      user?.role_name == Roles?.SuperAdmin &&
      storedValueRole === "admin"
    ) {
      typeData = {
        page: 1,
        pagination_limit: 10,
        user_id: user?.id,
      };
    }
    dispatch(postNews(formData, handleClose, typeData));
  };

  return (
    <>
      {}
      <CustomFormProvider
        defaultValues={defaultValues}
        resolver={useYupValidationResolver(validationSchema)}
      >
        <CustomForm onSubmit={onSubmit}>
          <NewsForm />
          {!get_category_loading && (
            <Box className={classes.footerRoot}>
              <CustomButton buttonName="Submit" loading={news_loading} />
            </Box>
          )}
        </CustomForm>
      </CustomFormProvider>
    </>
  );
};

export default Register;
