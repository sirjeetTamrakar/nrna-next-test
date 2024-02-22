import CustomButton from "@/components/common/CustomButton/CustomButton";
import CustomForm from "@/components/common/Form/CustomForm";
import CustomFormProvider from "@/components/common/Form/CustomFormProvider";
import { Roles } from "@/constants/RoleConstant";
import useYupValidationResolver from "@/hooks/useYupValidationResolver";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDepartment } from "../department/redux/actions";
import OurTeamForm from "./Form";
import { validationSchema } from "./ValidationSchema";
import { postTeams } from "./redux/actions";
import { useStyles } from "./styles";

const Register = ({ handleClose }) => {
  const dispatch = useDispatch();
  const defaultValues = {};
  const classes = useStyles();
  const { teams_loading } = useSelector((state) => state.teams);
  const { user, admin_ncc_id_details, admin_role_details, users_loading } =
    useSelector((state) => state.auth);
  const { get_department_loading } = useSelector((state) => state.department);

  const storedValueID = Number(localStorage.getItem("nccRoleID"));
  const storedValueRole = localStorage.getItem("nccRole");

  const onSubmit = (data) => {
    let typeData;
    if (user?.role_name == Roles?.NCC) {
      typeData = { id: user?.ncc?.id, page: 1, pagination_limit: 10 };
      dispatch(
        postTeams({ ...data, ncc_id: user?.ncc?.id }, handleClose, typeData)
      );
    } else if (
      user?.role_name == Roles?.SuperAdmin &&
      storedValueRole === "ncc"
    ) {
      typeData = { id: storedValueID, page: 1, pagination_limit: 10 };
      dispatch(
        postTeams({ ...data, ncc_id: storedValueID }, handleClose, typeData)
      );
    } else {
      typeData = { page: 1, pagination_limit: 10 };
      dispatch(postTeams(data, handleClose, typeData));
    }
  };

  useEffect(() => {
    let typeData;
    if (user) {
      if (user?.role_name == Roles?.NCC) {
        typeData = { id: user?.ncc?.id, page: 1, pagination_limit: 20 };
        dispatch(getDepartment(typeData));
      } else {
        typeData = { page: 1, pagination_limit: 20 };
        dispatch(getDepartment(typeData));
      }
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
          {!get_department_loading && !users_loading && (
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
