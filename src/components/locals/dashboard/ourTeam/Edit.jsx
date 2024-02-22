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
import { updateTeams } from "./redux/actions";
import { useStyles } from "./styles";

const EditForm = ({ id, handleClose }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { update_teams_loading } = useSelector((state) => state.teams);
  const { user, users_loading } = useSelector((state) => state.auth);
  const { get_department_loading } = useSelector((state) => state.department);

  const storedValueRole = localStorage.getItem("nccRole");
  const storedValueID = Number(localStorage.getItem("nccRoleID"));

  const onSubmit = (data) => {
    let typeData;
    if (user?.role_name == Roles?.NCC) {
      typeData = { id: user?.id, page: 1, pagination_limit: 10 };
      dispatch(
        updateTeams(
          { ...data, _method: "PUT", ncc_id: user?.id },
          id,
          handleClose,
          typeData
        )
      );
    } else if (
      user?.role_name == Roles?.SuperAdmin &&
      storedValueRole === "ncc"
    ) {
      typeData = { id: storedValueID, page: 1, pagination_limit: 10 };
      dispatch(
        updateTeams({ ...data, ncc_id: storedValueID }, handleClose, typeData)
      );
    } else {
      typeData = { page: 1, pagination_limit: 10 };
      dispatch(
        updateTeams({ ...data, _method: "PUT" }, id, handleClose, typeData)
      );
    }
  };
  useEffect(() => {
    let typeData;
    if (user) {
      if (user?.role_name == Roles?.NCC) {
        typeData = { id: user?.id, page: 1, pagination_limit: 20 };
        dispatch(getDepartment(typeData));
      } else {
        typeData = { page: 1, pagination_limit: 20 };
        dispatch(getDepartment(typeData));
      }
    }
  }, [user]);

  return (
    <CustomForm onSubmit={onSubmit}>
      <OurTeamForm />
      {!users_loading && !get_department_loading && (
        <Box className={classes.footerRoot}>
          <CustomButton buttonName="Update" loading={update_teams_loading} />
        </Box>
      )}
    </CustomForm>
  );
};

const Edit = ({ data, handleClose }) => {
  const defaultValues = {
    member_id: data?.member?.id,
    designation: data?.designation,
    order: data?.order,
    our_team_category_id: data?.our_team_category_id,
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
