import CustomButton from "@/components/common/CustomButton/CustomButton";
import CustomForm from "@/components/common/Form/CustomForm";
import CustomFormProvider from "@/components/common/Form/CustomFormProvider";
import useYupValidationResolver from "@/hooks/useYupValidationResolver";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDepartment } from "../../department/redux/actions";
import { postTeams } from "../redux/actions";
import OurTeamForm from "./Form";
import { validationSchema } from "./ValidationSchema";
import { useStyles } from "./styles";

const Register = ({ handleClose }) => {
  const dispatch = useDispatch();
  const defaultValues = {};
  const classes = useStyles();
  const { teams_loading } = useSelector((state) => state.teams);
  const { user, users_loading } = useSelector((state) => state.auth);
  const { get_department_loading } = useSelector((state) => state.department);

  const onSubmit = (data) => {
    const finalData = {
      ...data,
      type: "nfea",
    };
    const typeData = { page: 1, pagination_limit: 10, type: "nfea" };
    dispatch(postTeams(finalData, handleClose, typeData));
  };

  useEffect(() => {
    if (user) {
      const typeData = { page: 1, pagination_limit: 20 };
      dispatch(getDepartment(typeData));
    }
  }, [user]);

  return (
    <>
      <CustomFormProvider
        defaultValues={defaultValues}
        resolver={useYupValidationResolver(validationSchema)}
      >
        <CustomForm onSubmit={onSubmit}>
          <OurTeamForm />
          {!users_loading && !get_department_loading && (
            <Box className={classes.footerRoot}>
              <CustomButton buttonName="Create Team" loading={teams_loading} />
            </Box>
          )}
        </CustomForm>
      </CustomFormProvider>
    </>
  );
};

export default Register;
