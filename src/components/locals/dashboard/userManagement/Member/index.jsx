import CustomApproveModal from "@/components/common/CustomModal/CustomApproveModal";
import CustomModal from "@/components/common/CustomModal/CustomModal";
import CustomRoleChangeModal from "@/components/common/CustomModal/CustomRoleChnageModal";
import CustomStatusModal from "@/components/common/CustomModal/CustomStatusModal";
import CustomPopover from "@/components/common/CustomPopover/CustomPopover";
import CustomAutoComplete from "@/components/common/Form/CustomAutoComplete";
import CustomForm from "@/components/common/Form/CustomForm";
import CustomFormProvider from "@/components/common/Form/CustomFormProvider";
import CustomTable from "@/components/common/table";
import useToggle from "@/hooks/useToggle";
import { changeDateFormat } from "@/utils/dateUtils";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, getNCC } from "../../ncc/redux/actions";

import ExcelDownloadButton from "@/components/common/CustomExcelFileDownload";
import CustomDeleteModal from "@/components/common/CustomModal/CustomDeleteModal";
import CustomInput from "@/components/common/Form/CustomInput";
import { useFormContext } from "react-hook-form";
import { useDebounce } from "utils";
import {
  changeApproval,
  changeStatus,
  changeUserRole,
  deleteUsers,
  getAllUsers,
  getAllUsersDownload,
} from "../redux/actions";
import Edit from "./Edit";
import Register from "./Register";
import View from "./View";
import { useStyles } from "./styles";

const Member = () => {
  const dispatch = useDispatch();
  const [openForm, formOpenFunction] = useToggle(false);
  const [openEdit, editOpenFunction] = useToggle(false);
  const [openDelete, deleteOpenFunction] = useToggle(false);
  const [openRole, roleOpenFunction] = useToggle(false);
  const [openStatus, statusOpenFunction] = useToggle(false);
  const [openApprove, approveOpenFunction] = useToggle(false);
  const [openView, viewOpenFunction] = useToggle(false);
  const [filteredNcc, setFilteredNcc] = useState();
  const storedValueRole = localStorage.getItem("nccRole");
  const storedValueID = Number(localStorage.getItem("nccRoleID"));

  const {
    users,
    users_loading,
    user_status_loading,
    approve_user_loading,
    change_role_loading,
    delete_users_loading,
    users_download,
  } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.auth);
  const { nccData } = useSelector((state) => state.ncc);

  const [roleIDData, setRoleIDData] = useState();
  useEffect(() => {
    dispatch(getCountries());
  }, []);
  // const findNCCUserId = nccData?.data?.filter((item) => item?.slug === user?.ncc?.slug);

  useEffect(() => {
    const newArray = nccData?.data?.filter(
      (item) => item?.slug === user?.ncc?.slug
    );
    const newObj = {};

    newArray?.forEach((item, index) => {
      newObj[`roleId${index + 1}`] = item;
    });
    setRoleIDData(newObj);
  }, [nccData?.data, user?.ncc?.slug]);

  const [detail, setDetail] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const classes = useStyles();

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

  const tableHeads = [
    { title: "S.N.", type: "Index", minWidth: 20 },
    {
      title: "Reg No",
      minWidth: 150,
      field: "registration_number",
    },
    {
      title: "Name",
      minWidth: 150,
      field: (row) => {
        return (
          <Box>
            <Typography variant="body2">
              {row?.first_name && row?.first_name}{" "}
              {row?.first_name && row?.last_name}{" "}
              {!row?.first_name && row?.username}
            </Typography>
            <Typography variant="subtitle1">
              {changeDateFormat(row?.created_at)}
            </Typography>
          </Box>
        );
      },
    },
    {
      title: "Email",
      minWidth: 100,
      field: (row) => {
        return (
          <Box>
            <Typography variant="body2">{row?.email}</Typography>
          </Box>
        );
      },
    },
    {
      title: "Phone",
      minWidth: 100,
      field: (row) => {
        return (
          <Box>
            <Typography variant="subtitle1">{row?.phone}</Typography>
          </Box>
        );
      },
    },

    {
      title: "Address",
      minWidth: 120,
      field: (row) => {
        return (
          <Typography variant="body2">{`${row?.city ? row?.city + "," : ""} ${
            row?.country_of_residence
          }`}</Typography>
        );
      },
    },

    {
      title: "Role",
      minWidth: 100,
      field: (row) => {
        return (
          <>
            <Typography variant="body2">{`${row?.role_name}`}</Typography>
            <Typography variant="body2">{`${
              roleIDData?.roleId1?.admin?.id === row?.id ? "Admin" : ""
            }`}</Typography>
          </>
        );
      },
    },
    {
      title: "Approved",
      minWidth: 100,
      field: (row) => {
        return (
          <Box>
            {row?.approval_status === "approved" ? (
              <Box display="flex" columnGap={0.5}>
                <TaskAltIcon sx={{ color: "green" }} />
                <Typography color={"green"}>Approved</Typography>
              </Box>
            ) : row?.approval_status === "rejected" ? (
              <Box display="flex" columnGap={0.5}>
                <CancelIcon sx={{ color: "red" }} />
                <Typography color={"red"}>Rejected</Typography>
              </Box>
            ) : (
              <Box display="flex" columnGap={0.5}>
                <PauseCircleFilledIcon sx={{ color: "#2196f3" }} />
                <Typography color={"#2196f3"}>Pending</Typography>
              </Box>
            )}
          </Box>
        );
      },
    },
    {
      title: "Status",
      minWidth: 100,
      field: (row) => {
        return (
          <Box>
            {row?.status === 1 ? (
              <Button
                variant="contained"
                color="success"
                onClick={() => handleStatus(row)}
                sx={{ width: "100px" }}
              >
                Active
              </Button>
            ) : (
              <Button
                variant="contained"
                sx={{ width: "100px" }}
                color="error"
                onClick={() => handleStatus(row)}
              >
                Inactive
              </Button>
            )}
          </Box>
        );
      },
    },

    {
      title: "Actions",
      minWidth: 85,
      field: (row) => {
        return (
          <CustomPopover ButtonComponent={<MoreVertIcon />}>
            <ul className={classes.listWrapper}>
              <li onClick={() => handleView(row)}>View Details</li>

              {(user?.role_name === "superadmin" ||
                user?.role_name === "admin") && (
                <>
                  <li onClick={() => handleEdit(row)}>Edit Member </li>
                  <li onClick={() => handleRole(row)}>Change role</li>
                  <li onClick={() => handleApprove(row)}>Approve User</li>
                  <li onClick={() => handleDelete(row)}>Delete</li>
                </>
              )}
              {/* {roleIDData?.roleId1?.admin?.id === user?.id && (
                <>
                  <li onClick={() => handleEdit(row)}>Edit Member </li>
                  <li onClick={() => handleRole(row)}>Change role</li>
                  <li onClick={() => handleApprove(row)}>Approve User</li>
                  <li onClick={() => handleDelete(row)}>Delete</li>
                </>
              )} */}
              {roleIDData?.roleId1?.admin?.id !== user?.id &&
                user?.id === row?.id && (
                  <>
                    <li onClick={() => handleEdit(row)}>Edit Member </li>
                    <li onClick={() => handleDelete(row)}>Delete</li>
                  </>
                )}
            </ul>
          </CustomPopover>
        );
      },
    },
  ];

  const handleEdit = (row) => {
    setDetail(row);
    editOpenFunction();
  };

  const handleRole = (row) => {
    setDetail(row);
    roleOpenFunction();
  };

  const handleDelete = (row) => {
    setDetail(row);
    deleteOpenFunction();
  };

  const handleStatus = (row) => {
    setDetail(row);
    statusOpenFunction();
  };

  const handleApprove = (row) => {
    setDetail(row);
    approveOpenFunction();
  };

  const handleView = (row) => {
    setDetail(row);
    viewOpenFunction();
  };

  const handleChangeStatus = () => {
    dispatch(
      changeStatus(
        detail?.username,
        { status: detail?.status == 1 ? 0 : 1 },
        () => {
          statusOpenFunction();
          refetch();
        }
      )
    );
  };

  const handleChangeRole = (value) => {
    dispatch(
      changeUserRole(
        detail?.username,
        {
          role_name: value?.role_name,
          ncc_id: value?.ncc_id,
          _method: "PATCH",
        },
        () => {
          roleOpenFunction();
          refetch();
        }
      )
    );
  };

  const handleApproveStatus = (value) => {
    const status = value === "approved" ? "approved" : "rejected";
    dispatch(
      changeApproval(
        detail?.username,
        { approval_status: status, _method: "PATCH" },
        () => {
          approveOpenFunction();
          refetch();
        }
      )
    );
  };

  const handleConfirmDelete = (id) => {
    dispatch(deleteUsers(id, deleteOpenFunction));
  };

  const refetch = (data) => {
    let roleData;
    let filterData = {
      page: page + 1,
      pagination_limit: rowsPerPage,
      search: data?.search ?? "",
      country: data?.country ?? "",
    };
    if (user?.role_name === "ncc") {
      const roleData = { country: user?.ncc?.slug };
      dispatch(getAllUsers(filterData, roleData));
    } else if (user?.role_name === "superadmin" && storedValueRole === "ncc") {
      const roleData = { country: filteredNcc?.nccID1?.country_name };
      dispatch(getAllUsers(filterData, roleData));
    } else {
      dispatch(getAllUsers(filterData));
    }
  };

  useEffect(() => {
    refetch();
  }, [page, rowsPerPage, filteredNcc?.nccID1]);

  useEffect(() => {
    dispatch(getAllUsersDownload());
  }, []);

  const defaultValues = {};

  return (
    <>
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "30px",
              }}
            >
              <CustomFormProvider defaultValues={defaultValues}>
                <Filter refetch={refetch} />
              </CustomFormProvider>
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ marginRight: "20px" }}>
              <ExcelDownloadButton
                data={users_download?.data}
                fileName="Members Data"
              />
            </Box>

            <Button
              startIcon={<AddIcon />}
              variant="contained"
              display="flex"
              onClick={formOpenFunction}
            >
              Add Member
            </Button>
          </Box>
        </Box>
        <CustomTable
          tableHeads={tableHeads}
          tableData={users?.data}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          page={page}
          loading={users_loading}
          setPage={setPage}
          total={users?.meta?.total}
        />
        <CustomModal
          open={openForm}
          handleClose={formOpenFunction}
          modalTitle="Create Member"
          modalSubtitle="Become a member of NBNS Global"
          icon={<PersonAddIcon />}
          width={`40rem`}
        >
          <Register handleClose={formOpenFunction} />
        </CustomModal>
        <CustomModal
          open={openEdit}
          handleClose={editOpenFunction}
          modalTitle={`Update Member`}
          modalSubtitle="Become a member of NBNS Global"
          icon={<PersonAddIcon />}
          width={`40rem`}
        >
          <Edit
            data={detail}
            handleClose={editOpenFunction}
            refetch={refetch}
          />
        </CustomModal>
        <CustomModal
          open={openView}
          handleClose={viewOpenFunction}
          modalTitle="Get full detail of the member"
          // modalSubtitle="Get full detail of the member"
          icon={<PersonIcon />}
          width={`40rem`}
        >
          <View data={detail} />
        </CustomModal>
        <CustomRoleChangeModal
          open={openRole}
          handleConfirm={handleChangeRole}
          handleClose={roleOpenFunction}
          role={detail?.role_name}
          data={detail}
          isLoading={change_role_loading}
        />

        <CustomDeleteModal
          open={openDelete}
          handleClose={deleteOpenFunction}
          handleConfirm={handleConfirmDelete}
          slug={detail?.id}
          isLoading={delete_users_loading}
        />
        <CustomStatusModal
          open={openStatus}
          handleConfirm={handleChangeStatus}
          handleClose={statusOpenFunction}
          status={detail?.status == 1 ? "Active" : "Inactive"}
          isLoading={user_status_loading}
        />
        <CustomApproveModal
          open={openApprove}
          handleClose={approveOpenFunction}
          row={detail}
          isLoading={approve_user_loading}
          handleApprove={() => handleApproveStatus("approved")}
          handleReject={() => handleApproveStatus("rejected")}
        />
      </Box>
    </>
  );
};

export default Member;

const Filter = ({ refetch }) => {
  const { countries_list } = useSelector((state) => state.ncc);
  const { user } = useSelector((state) => state.auth);
  const countryList = countries_list?.map((item) => ({
    label: item,
    value: item,
  }));
  const { watch } = useFormContext();
  const debounceValue = useDebounce(watch("search"), 600);

  useEffect(() => {
    refetch(watch());
  }, [debounceValue, watch("country")]);
  const handleFilter = (data) => {};
  return (
    <CustomForm onSubmit={handleFilter}>
      <Box display={"flex"} columnGap={4} justifyContent={"flex-start"}>
        {user?.role_name === "superadmin" ? (
          <Box width={"200px"}>
            <CustomAutoComplete
              name="country"
              label="Filter by country"
              options={countryList}
            />
          </Box>
        ) : (
          ""
        )}
        <CustomInput name={"search"} label="Filter by user" />
      </Box>
    </CustomForm>
  );
};
