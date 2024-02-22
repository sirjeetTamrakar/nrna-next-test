import CustomButton from "@/components/common/CustomButton/CustomButton";
import CustomForm from "@/components/common/Form/CustomForm";
import CustomFormProvider from "@/components/common/Form/CustomFormProvider";
import { Roles } from "@/constants/RoleConstant";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateBusiness } from "../redux/actions";
import BusinessForm from "./Form";
import { useStyles } from "./styles";

const EditForm = ({ detail, handleClose }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const { update_business_loading } = useSelector((state) => state.business);
  const { user, admin_ncc_id_details, admin_role_details } = useSelector(
    (state) => state.auth
  );
  const storedValueID = Number(localStorage.getItem("nccRoleID"));
  const storedValueRole = localStorage.getItem("nccRole");

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("fullname", data?.fullname);
    formData.append("email", data?.email);
    formData.append("phone", data?.phone);
    formData.append("address", data?.address);
    formData.append("google_map_link", data?.google_map_link);
    formData.append("facebook_url", data?.facebook_url);
    formData.append("instagram_url", data?.instagram_url);
    formData.append("twitter_url", data?.twitter_url);
    formData.append("description", data?.description);
    formData.append("country", data?.country);
    formData.append("_method", "PUT");
    if (user?.role_name === Roles?.Member) {
      formData.append("user_id", user?.id);
    }
    if (user?.role_name === Roles?.NCC) {
      formData.append("user_id", user?.ncc?.id);
    }
    if (
      (user?.role_name === "admin" || user?.role_name === "superadmin") &&
      storedValueRole === "ncc"
    ) {
      formData.append("user_id", storedValueID);
    }
    formData.append("business_category_id", data?.business_category_id);

    if (data?.profile_image?.length > 0) {
      formData.append("profile_image", data?.profile_image?.[0]);
    }
    if (data?.banner_image?.length > 0) {
      formData.append("banner_image", data?.banner_image?.[0]);
    }
    let typeData;
    if (user?.role_name == Roles?.Member) {
      typeData = {
        type: "member",
        user_id: user?.id,
        page: 1,
        pagination_limit: 10,
      };
    } else if (
      (user?.role_name === "admin" || user?.role_name === "superadmin") &&
      storedValueRole === "ncc"
    ) {
      typeData = {
        type: "ncc",
        user_id: storedValueID,
        page: 1,
        pagination_limit: 10,
      };
    } else if (user?.role_name == Roles?.NCC) {
      typeData = {
        type: "ncc",
        user_id: user?.ncc?.id,
        page: 1,
        pagination_limit: 10,
      };
    }
    dispatch(updateBusiness(formData, detail?.slug, handleClose, typeData));
  };

  return (
    <CustomForm onSubmit={onSubmit}>
      <BusinessForm
        profileImage={detail?.image}
        bannerImage={detail?.banner_image}
      />
      <Box className={classes.footerRoot}>
        <CustomButton buttonName="Update" loading={update_business_loading} />
      </Box>
    </CustomForm>
  );
};
const Edit = ({ data, handleClose }) => {
  const defaultValues = {
    fullname: data?.fullname,
    email: data?.email,
    phone: data?.phone,
    address: data?.address,
    business_category_id: parseInt(data?.business_category_id),
    google_map_link: data?.google_map_link,
    facebook_url: data?.facebook_url,
    instagram_url: data?.instagram_url,
    twitter_url: data?.twitter_url,

    description: data?.description,
  };

  return (
    <>
      <CustomFormProvider
        defaultValues={defaultValues}
        // resolver={useYupValidationResolver(editValidationSchema)}
      >
        <EditForm detail={data} handleClose={handleClose} />
      </CustomFormProvider>
    </>
  );
};

export default Edit;
