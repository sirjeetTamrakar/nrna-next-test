import CustomButton from "@/components/common/CustomButton/CustomButton";
import CustomForm from "@/components/common/Form/CustomForm";
import CustomFormProvider from "@/components/common/Form/CustomFormProvider";
import useYupValidationResolver from "@/hooks/useYupValidationResolver";
import { Box } from "@mui/material";
import { Roles } from "constants/RoleConstant";
import { useDispatch, useSelector } from "react-redux";
import OurTeamForm from "./Form";
import { validationSchema } from "./ValidationSchema";
import { postDepartment } from "./redux/actions";
import { useStyles } from "./styles";

const Register = ({ handleClose }) => {
  const dispatch = useDispatch();
  const defaultValues = {};
  const classes = useStyles();
  const { department_loading } = useSelector((state) => state.department);
  const { user } = useSelector((state) => state.auth);

  const onSubmit = (data) => {
    let typeData;
    if (user?.role_name == Roles?.NCC) {
      typeData = { id: user?.ncc?.id, page: 1, pagination_limit: 10 };
      dispatch(
        postDepartment(
          { ...data, ncc_id: user?.ncc?.id },
          handleClose,
          typeData
        )
      );
    } else {
      typeData = { page: 1, pagination_limit: 10 };
      dispatch(postDepartment(data, handleClose, typeData));
    }
  };

  return (
    <>
      <CustomFormProvider
        defaultValues={defaultValues}
        resolver={useYupValidationResolver(validationSchema)}
      >
        <CustomForm onSubmit={onSubmit}>
          <OurTeamForm />
          <Box className={classes.footerRoot}>
            <CustomButton
              buttonName="Create Department"
              loading={department_loading}
            />
          </Box>
        </CustomForm>
      </CustomFormProvider>
    </>
  );
};

export default Register;
