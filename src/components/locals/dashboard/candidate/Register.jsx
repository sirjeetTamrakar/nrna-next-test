import CustomButton from "@/components/common/CustomButton/CustomButton";
import CustomForm from "@/components/common/Form/CustomForm";
import CustomFormProvider from "@/components/common/Form/CustomFormProvider";
import useYupValidationResolver from "@/hooks/useYupValidationResolver";
import { Box } from "@mui/material";
import { Roles } from "constants/RoleConstant";
import { useDispatch, useSelector } from "react-redux";
import CandidateForm from "./Form";
import { validationSchema } from "./ValidationSchema";
import { postCandidate } from "./redux/actions";
import { useStyles } from "./styles";

const Register = ({ handleClose }) => {
  const dispatch = useDispatch();
  const defaultValues = {};
  const classes = useStyles();
  const { candidate_loading } = useSelector((state) => state.candidate);
  const { user, admin_role_details, admin_ncc_id_details } = useSelector(
    (state) => state.auth
  );

  const onSubmit = (data) => {
    let typeData;
    if (user?.role_name == Roles?.NCC) {
      typeData = { id: user?.ncc?.id, page: 1, pagination_limit: 10 };
      dispatch(
        postCandidate({ ...data, ncc_id: user?.ncc?.id }, handleClose, typeData)
      );
    } else if (
      user?.role_name == Roles?.SuperAdmin &&
      admin_role_details === "ncc"
    ) {
      typeData = { id: admin_ncc_id_details, page: 1, pagination_limit: 10 };
      dispatch(
        postCandidate(
          { ...data, ncc_id: admin_ncc_id_details },
          handleClose,
          typeData
        )
      );
    } else {
      typeData = { page: 1, pagination_limit: 10 };
      dispatch(postCandidate(data, handleClose, typeData));
    }
  };

  return (
    <>
      <CustomFormProvider
        defaultValues={defaultValues}
        resolver={useYupValidationResolver(validationSchema)}
      >
        <CustomForm onSubmit={onSubmit}>
          <CandidateForm />
          <Box className={classes.footerRoot}>
            <CustomButton
              buttonName="Create Candidate"
              loading={candidate_loading}
            />
          </Box>
        </CustomForm>
      </CustomFormProvider>
    </>
  );
};

export default Register;
