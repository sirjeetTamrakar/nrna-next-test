import CustomButton from "@/components/common/CustomButton/CustomButton";
import CustomForm from "@/components/common/Form/CustomForm";
import CustomFormProvider from "@/components/common/Form/CustomFormProvider";
import { Roles } from "@/constants/RoleConstant";
import useYupValidationResolver from "@/hooks/useYupValidationResolver";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import OurTeamForm from "./Form";
import { validationSchema } from "./ValidationSchema";
import { updateDepartment } from "./redux/actions";
import { useStyles } from "./styles";

const EditForm = ({ id, handleClose }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { update_department_loading } = useSelector(
    (state) => state.department
  );
  const { user } = useSelector((state) => state.auth);

  const onSubmit = (data) => {
    let typeData;
    if (user?.role_name == Roles?.NCC) {
      typeData = { id: user?.id, page: 1, pagination_limit: 10 };
      dispatch(
        updateDepartment(
          { ...data, _method: "PUT", ncc_id: user?.id },
          id,
          handleClose,
          typeData
        )
      );
    } else {
      typeData = { page: 1, pagination_limit: 10 };
      dispatch(
        updateDepartment({ ...data, _method: "PUT" }, id, handleClose, typeData)
      );
    }
  };

  return (
    <CustomForm onSubmit={onSubmit}>
      <OurTeamForm />
      <Box className={classes.footerRoot}>
        <CustomButton buttonName="Update" loading={update_department_loading} />
      </Box>
    </CustomForm>
  );
};

const Edit = ({ data, handleClose }) => {
  const defaultValues = {
    title: data?.title,
  };

  return (
    <>
      <CustomFormProvider
        defaultValues={defaultValues}
        resolver={useYupValidationResolver(validationSchema)}
      >
        <EditForm id={data?.slug} handleClose={handleClose} />
      </CustomFormProvider>
    </>
  );
};

export default Edit;
