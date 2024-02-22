import CustomButton from "@/components/common/CustomButton/CustomButton";
import CustomForm from "@/components/common/Form/CustomForm";
import CustomFormProvider from "@/components/common/Form/CustomFormProvider";
import { Roles } from "@/constants/RoleConstant";
import useYupValidationResolver from "@/hooks/useYupValidationResolver";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import MemberForm from "./Form";
import { validationSchema } from "./ValidationSchema";
import { updateCandidate } from "./redux/actions";
import { useStyles } from "./styles";

const EditForm = ({ id, handleClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { update_candidate_loading } = useSelector((state) => state.candidate);
  const { user, admin_role_details, admin_ncc_id_details } = useSelector(
    (state) => state.auth
  );

  const onSubmit = (data) => {
    let typeData;
    if (user?.role_name == Roles?.NCC) {
      typeData = { id: user?.id, page: 1, pagination_limit: 10 };
      dispatch(
        updateCandidate(
          { ...data, ncc_id: user?.id, _method: "PUT" },
          id,
          handleClose,
          typeData
        )
      );
    } else if (
      user?.role_name == Roles?.SuperAdmin &&
      admin_role_details === "ncc"
    ) {
      typeData = { id: admin_ncc_id_details, page: 1, pagination_limit: 10 };
      dispatch(
        updateCandidate(
          { ...data, ncc_id: admin_ncc_id_details, _method: "PUT" },
          handleClose,
          typeData
        )
      );
    } else {
      typeData = { page: 1, pagination_limit: 10 };
      dispatch(
        updateCandidate({ ...data, _method: "PUT" }, id, handleClose, typeData)
      );
    }
  };

  return (
    <CustomForm onSubmit={onSubmit}>
      <MemberForm />
      <Box className={classes.footerRoot}>
        <CustomButton buttonName="Update" loading={update_candidate_loading} />
      </Box>
    </CustomForm>
  );
};
const Edit = ({ data, handleClose }) => {
  const defaultValues = {
    member_id: data?.member?.id,
    designation: data?.designation,
    order: data?.order,
  };

  return (
    <>
      <CustomFormProvider
        defaultValues={defaultValues}
        resolver={useYupValidationResolver(validationSchema)}
      >
        <EditForm id={data?.id} handleClose={handleClose} />
      </CustomFormProvider>
    </>
  );
};

export default Edit;
