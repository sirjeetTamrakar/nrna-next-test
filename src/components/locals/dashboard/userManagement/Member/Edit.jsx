import CustomButton from "@/components/common/CustomButton/CustomButton";
import CustomForm from "@/components/common/Form/CustomForm";
import CustomFormProvider from "@/components/common/Form/CustomFormProvider";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateUsers } from "../redux/actions";
import MemberForm from "./Form";
import { useStyles } from "./styles";

const EditForm = ({ handleClose, refetch }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const { update_user_loading } = useSelector((state) => state.user);
  const { get_countries_list_loading } = useSelector((state) => state.ncc);

  const handleRefetch = () => {
    refetch();
    handleClose();
  };

  const onSubmit = (data) => {
    dispatch(
      updateUsers(
        {
          ...data,
          registration_number: data?.registration_number,
          _method: "PUT",
        },
        data?.username,
        handleRefetch
      )
    );
  };

  return (
    <CustomForm onSubmit={onSubmit}>
      <MemberForm disabled registration_number />
      {!get_countries_list_loading && (
        <Box className={classes.footerRoot}>
          <CustomButton buttonName="Update" loading={update_user_loading} />
        </Box>
      )}
    </CustomForm>
  );
};
const Edit = ({ data, handleClose, refetch }) => {
  const defaultValues = { ...data };

  return (
    <>
      <CustomFormProvider
        defaultValues={defaultValues}
        // resolver={useYupValidationResolver(validationSchema)}
      >
        <EditForm handleClose={handleClose} refetch={refetch} />
      </CustomFormProvider>
    </>
  );
};

export default Edit;
