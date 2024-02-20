import CustomButton from "@/components/common/CustomButton/CustomButton";
import CustomForm from "@/components/common/Form/CustomForm";
import CustomFormProvider from "@/components/common/Form/CustomFormProvider";
import useYupValidationResolver from "@/hooks/useYupValidationResolver";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNCC } from "../../ncc/redux/actions";
import { createUser } from "../redux/actions";
import MemberForm from "./Form";
import { validationSchema } from "./ValidationSchema";
import { useStyles } from "./styles";

const Register = ({ handleClose }) => {
  const defaultValues = {};
  const classes = useStyles();
  const dispatch = useDispatch();
  const [filteredNcc, setFilteredNcc] = useState();
  const { nccData, get_ncc_loading, get_countries_list_loading } = useSelector(
    (state) => state.ncc
  );
  const { create_user_loading } = useSelector((state) => state.user);
  const { user, admin_role_details, admin_ncc_id_details } = useSelector(
    (state) => state.auth
  );
  const storedValueID = Number(localStorage.getItem("nccRoleID"));
  const storedValueRole = localStorage.getItem("nccRole");

  useEffect(() => {
    dispatch(getNCC());
  }, []);

  useEffect(() => {
    const newArray = nccData?.data?.filter(
      (item) => item?.id === storedValueID
    );
    const newObj = {};

    newArray?.forEach((item, index) => {
      newObj[`nccID${index + 1}`] = item;
    });
    setFilteredNcc(newObj);
  }, [nccData?.data, storedValueID]);

  const onSubmit = (data) => {
    if (user?.role_name === "superadmin" && storedValueRole === "ncc") {
      const roleData = { country: filteredNcc };
      dispatch(createUser(data, handleClose, roleData));
    } else {
      dispatch(createUser(data, handleClose));
    }
  };

  return (
    <>
      <CustomFormProvider
        defaultValues={defaultValues}
        resolver={useYupValidationResolver(validationSchema)}
      >
        <CustomForm onSubmit={onSubmit}>
          <MemberForm />
          {!get_countries_list_loading && (
            <Box className={classes.footerRoot}>
              <CustomButton
                buttonName="Create Member"
                loading={create_user_loading}
              />
            </Box>
          )}
        </CustomForm>
      </CustomFormProvider>
    </>
  );
};

export default Register;
