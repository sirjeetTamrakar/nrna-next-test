import { getNCC } from "@/components/locals/dashboard/ncc/redux/actions";
import { Delete } from "@mui/icons-material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { Box, Button, CircularProgress, IconButton } from "@mui/material";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import CustomAutoComplete from "../Form/CustomAutoComplete";
import CustomForm from "../Form/CustomForm";
import CustomFormProvider from "../Form/CustomFormProvider";
import CustomModal from "./CustomModal";

const CustomRoleChangeModal = ({
  open,
  handleClose,
  handleConfirm,
  isLoading,
  role,
  modalTitle,
  data,
}) => {
  const defaultValues = { role: role, ncc_id: data?.ncc_id };

  return (
    <>
      <CustomModal
        open={open}
        width={"500px"}
        // height={'380px'}
        icon={<Delete />}
        handleClose={handleClose}
      >
        <Box sx={{ marginBottom: "20px" }}>
          <Box>
            <Box
              style={{
                fontSize: "17px",
                textAlign: "center",
                margin: 0,
                padding: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                width: "100%",
                marginTop: "20px",
              }}
            >
              <IconButton
                style={{
                  backgroundColor: "#dffffc",
                  width: "40px",
                  height: "40px",
                }}
              >
                <AutorenewIcon style={{ color: "#009688" }} />
              </IconButton>

              <p
                style={{
                  fontWeight: "500",
                  margin: 0,
                  padding: 0,
                  marginTop: "10px",
                }}
              >
                Do you want to change role of this record?
              </p>
              {role ? (
                <p
                  style={{
                    margin: 0,
                    padding: 0,
                    fontSize: "14px",
                    marginTop: "5px",
                    color: "#008478",
                  }}
                >
                  Your current status is {role}.
                </p>
              ) : (
                <p
                  style={{
                    margin: 0,
                    padding: 0,
                    fontSize: "14px",
                    marginTop: "5px",
                    color: "#d92323",
                  }}
                >
                  You currenttly do not have a role.
                </p>
              )}
            </Box>
          </Box>

          <CustomFormProvider defaultValues={defaultValues}>
            <RoleForm
              handleConfirm={handleConfirm}
              isLoading={isLoading}
              handleClose={handleClose}
              data={data}
            />
          </CustomFormProvider>
        </Box>
      </CustomModal>
    </>
  );
};

const RoleForm = ({ handleConfirm, handleClose, isLoading, data }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const {
    control,
    watch,
    reset,
    formState: { errors },
  } = useFormContext();

  const roleData = [
    { value: "admin", label: "Admin" },
    { value: "member", label: "Member" },
    { value: "ncc", label: "NCC" },
    { value: "", label: "None" },
  ];
  const roleDataNcc = [
    { value: "member", label: "Member" },
    { value: "ncc", label: "NCC" },
    { value: "", label: "None" },
  ];
  const { nccData, get_ncc_loading } = useSelector((state) => state.ncc);

  useEffect(() => {
    dispatch(getNCC());
  }, []);

  const nccList = nccData?.data?.map((item) => ({
    label: item?.country_name,
    value: item?.id,
  }));

  const submitHandler = (data) => {
    const finalData = {
      role_name: data?.role,
      ncc_id: data?.ncc_id,
    };
    handleConfirm(finalData);
  };

  // useEffect(() => {
  //   if (data) {
  //     reset('ncc_id', 48);
  //   }
  // }, [data]);

  return (
    <CustomForm onSubmit={submitHandler}>
      <Box sx={{ padding: "10px 50px 5px" }}>
        <CustomAutoComplete
          name="role"
          label="Select a role"
          options={(user?.role_name === "ncc" ? roleDataNcc : roleData) ?? []}
        />
      </Box>
      {watch("role") == "ncc" && (
        <Box sx={{ padding: "10px 50px 5px" }}>
          <CustomAutoComplete
            name="ncc_id"
            label="Select NCC"
            options={nccList ?? []}
          />
        </Box>
      )}
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          //   height: "60px",
          gap: "10px",
          marginTop: "30px",
        }}
      >
        <Button
          type="submit"
          variant="contained"
          disabled={isLoading}
          color="primary"
        >
          {isLoading ? (
            <Box display={"flex"} alignItems={"center"} gap={"10px"}>
              <CircularProgress size={15} style={{ color: "#fff" }} />
              Submit
            </Box>
          ) : (
            "Submit"
          )}
        </Button>
        <Button
          variant="outlined"
          onClick={() => handleClose()}
          color="primary"
        >
          Cancel
        </Button>
      </Box>
    </CustomForm>
  );
};

export default CustomRoleChangeModal;
