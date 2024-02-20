import CustomButton from "@/components/common/CustomButton/CustomButton";
import CustomForm from "@/components/common/Form/CustomForm";
import CustomFormProvider from "@/components/common/Form/CustomFormProvider";
import useYupValidationResolver from "@/hooks/useYupValidationResolver";
import { Box } from "@mui/material";
import { Roles } from "constants/RoleConstant";
import { useDispatch, useSelector } from "react-redux";
import EventForm from "./Form";
import { validationSchema } from "./ValidationSchema";
import { updateEvents } from "./redux/actions";
import { useStyles } from "./styles";

const EditForm = ({ detail, handleClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { update_events_loading, get_category_loading } = useSelector(
    (state) => state.events
  );
  const { user } = useSelector((state) => state.auth);
  const storedValueRole = localStorage.getItem("nccRole");
  const storedValueID = Number(localStorage.getItem("nccRoleID"));

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data?.title);
    formData.append("description", data?.description);
    formData.append("status", data?.status);
    formData.append("location", data?.location);
    formData.append("venue", data?.venue);
    formData.append("event_date", data?.event_date);
    formData.append("event_time", data?.event_time);
    formData.append("contact_email", data?.contact_email);
    formData.append("contact_phone", data?.contact_phone);
    formData.append("map_url", data?.map_url ?? "");
    formData.append("youtube_url", data?.youtube_url ?? "");
    formData.append("_method", "PUT");
    formData.append("event_category_id", data?.event_category_id);

    if (data?.feature_image?.length > 0) {
      formData.append("feature_image", data?.feature_image?.[0]);
    }
    let typeData;
    if (user?.role_name == Roles?.NCC) {
      typeData = { id: user?.ncc?.id, page: 1, pagination_limit: 10 };
      formData.append("ncc_id", user?.ncc?.id);
    } else if (
      user?.role_name == Roles?.SuperAdmin &&
      storedValueRole === "ncc"
    ) {
      typeData = {
        id: storedValueID,
        page: 1,
        pagination_limit: 10,
      };
      formData.append("ncc_id", storedValueID);
    } else {
      typeData = { page: 1, pagination_limit: 10 };
    }
    dispatch(updateEvents(formData, detail?.slug, handleClose, typeData));
  };

  return (
    <CustomForm onSubmit={onSubmit}>
      <EventForm image={detail?.feature_image} />
      {!get_category_loading && (
        <Box className={classes.footerRoot}>
          <CustomButton buttonName="Update" loading={update_events_loading} />
        </Box>
      )}
    </CustomForm>
  );
};
const Edit = ({ data, handleClose }) => {
  const defaultValues = { ...data, feature_image: "" };

  return (
    <>
      <CustomFormProvider
        defaultValues={defaultValues}
        resolver={useYupValidationResolver(validationSchema)}
      >
        <EditForm detail={data} handleClose={handleClose} />
      </CustomFormProvider>
    </>
  );
};

export default Edit;
