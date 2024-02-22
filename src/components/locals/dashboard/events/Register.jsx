import CustomButton from "@/components/common/CustomButton/CustomButton";
import CustomForm from "@/components/common/Form/CustomForm";
import CustomFormProvider from "@/components/common/Form/CustomFormProvider";
import { Roles } from "@/constants/RoleConstant";
import useYupValidationResolver from "@/hooks/useYupValidationResolver";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import EventForm from "./Form";
import { validationSchema } from "./ValidationSchema";
import { postEvents } from "./redux/actions";
import { useStyles } from "./styles";

const Register = ({ handleClose }) => {
  const dispatch = useDispatch();
  const defaultValues = {};
  const classes = useStyles();
  const { events_loading, get_category_loading } = useSelector(
    (state) => state.events
  );
  const { user } = useSelector((state) => state.auth);
  const storedValueRole = localStorage.getItem("nccRole");
  const storedValueID = Number(localStorage.getItem("nccRoleID"));

  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append("title", data?.title);
    formData.append("description", data?.description);
    formData.append("location", data?.location);
    formData.append("venue", data?.venue);
    formData.append("event_date", data?.event_date);
    formData.append("event_time", data?.event_time);
    formData.append("contact_email", data?.contact_email);
    formData.append("contact_phone", data?.contact_phone);
    formData.append("map_url", data?.map_url ?? "");
    formData.append("youtube_url", data?.youtube_url ?? "");
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
    dispatch(postEvents(formData, handleClose, typeData));
  };

  return (
    <>
      <CustomFormProvider
        defaultValues={defaultValues}
        resolver={useYupValidationResolver(validationSchema)}
      >
        <CustomForm onSubmit={onSubmit}>
          <EventForm />
          {!get_category_loading && (
            <Box className={classes.footerRoot}>
              <CustomButton buttonName="Submit" loading={events_loading} />
            </Box>
          )}
        </CustomForm>
      </CustomFormProvider>
    </>
  );
};

export default Register;
