import CustomApproveModal from "@/components/common/CustomModal/CustomApproveModal";
import CustomDeleteModal from "@/components/common/CustomModal/CustomDeleteModal";
import CustomModal from "@/components/common/CustomModal/CustomModal";
import CustomRoleChangeModal from "@/components/common/CustomModal/CustomRoleChnageModal";
import CustomPopover from "@/components/common/CustomPopover/CustomPopover";
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
import {
  changeApproval,
  changeUserRole,
  deleteUsers,
  getAllUsers,
  setUserSearch,
} from "../../userManagement/redux/actions";
import { getNCC } from "../redux/actions";
// import {
//   changeApproval,
//   changeStatus,
//   changeUserRole,
//   getAllUsers,
//   getNCC,
//   setUserSearch
// } from '../redux/actions';
import Edit from "./Edit";
import Register from "./Register";
import { useStyles } from "./styles";
import View from "./View";
const ViewMembersTable = ({ countrySlug }) => {
  const dispatch = useDispatch();
  const [openForm, formOpenFunction] = useToggle(false);
  const [openEdit, editOpenFunction] = useToggle(false);
  const [openDelete, deleteOpenFunction] = useToggle(false);
  const [openRole, roleOpenFunction] = useToggle(false);
  const [openApprove, approveOpenFunction] = useToggle(false);
  const [openView, viewOpenFunction] = useToggle(false);
  const {
    users,
    user_search,
    users_loading,
    approve_user_loading,
    change_role_loading,
  } = useSelector((state) => state.user);
  const { user, delete_users_loading } = useSelector((state) => state.auth);
  const { nccData } = useSelector((state) => state.ncc);
  const [roleIDData, setRoleIDData] = useState();

  useEffect(() => {
    const newArray = nccData?.data?.filter(
      (item) => item?.slug === user?.ncc?.slug
    );
    const newObj = {};

    newArray?.forEach((item, index) => {
      newObj[`roleId${index + 1}`] = item;
    });
    setRoleIDData(newObj);
  }, [nccData?.data]);

  const [detail, setDetail] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const classes = useStyles();
  useEffect(() => {
    dispatch(getNCC());
  }, []);
  const tableHeads = [
    { title: "S.N.", type: "Index", minWidth: 20 },
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
      title: "Email/Phone",
      minWidth: 100,
      field: (row) => {
        return (
          <Box>
            <Typography variant="body2">{row?.email}</Typography>
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
          <Typography variant="body2">{`${row?.city}, ${row?.country_of_residence}`}</Typography>
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
              {roleIDData?.roleId1?.admin?.id === user?.id && (
                <>
                  <li onClick={() => handleEdit(row)}>Edit Member </li>
                  <li onClick={() => handleRole(row)}>Change role</li>
                  <li onClick={() => handleApprove(row)}>Approve User</li>
                  <li onClick={() => handleDelete(row)}>Delete</li>
                </>
              )}
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

  const handleApprove = (row) => {
    setDetail(row);
    approveOpenFunction();
  };

  const handleView = (row) => {
    setDetail(row);
    viewOpenFunction();
  };

  const handleConfirm = (slug) => {
    let typeData;
    // if (user?.role_name == Roles?.NCC) {
    //   typeData = { id: user?.ncc?.id, page: page + 1, pagination_limit: rowsPerPage };
    // } else {
    //   typeData = { page: page + 1, pagination_limit: rowsPerPage };
    // }
    typeData = {
      page: page + 1,
      pagination_limit: rowsPerPage,
      country: countrySlug,
    };

    dispatch(deleteUsers(slug, deleteOpenFunction, typeData));
  };

  const handleChangeRole = (value) => {
    dispatch(
      changeUserRole(
        detail?.username,
        { role_name: value, _method: "PATCH" },
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

  const handleUserSearch = (e) => {
    setPage(0);
    dispatch(setUserSearch(inputValue));
    e.preventDefault();
  };
  const [inputValue, setInputValue] = useState(""); // Track the input field value

  const nameChangeHandler = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue); // Update the input field value
    const timeout = setTimeout(() => {
      dispatch(setUserSearch(e.target.value));
    }, [1000]);
    return () => clearTimeout(timeout);
  };

  const nameClearHandler = () => {
    setPage(0);
    setInputValue("");
    dispatch(setUserSearch(""));
  };

  const filterData = {
    page: page + 1,
    pagination_limit: rowsPerPage,
    search: user_search,
  };
  const refetch = () => {
    // let roleData;
    // if (user?.role_name === 'ncc') {
    //   const roleData = { country: countrySlug };
    //   dispatch(getAllUsers(filterData, roleData));
    // } else {
    //   dispatch(getAllUsers(filterData));
    // }
    const roleData = { country: countrySlug };
    dispatch(getAllUsers(filterData, roleData));
  };

  useEffect(() => {
    // let roleData;
    // if (user?.role_name === 'ncc') {
    //   const roleData = { country: countrySlug };
    //   dispatch(getAllUsers(filterData, roleData));
    // } else {
    //   dispatch(getAllUsers(filterData));
    // }
    const roleData = { country: countrySlug };
    dispatch(getAllUsers(filterData, roleData));
  }, [JSON.stringify(filterData)]);

  useEffect(() => {
    // refetch();
  }, [page, rowsPerPage]);

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
          <Box>
            <Box sx={{ textTransform: "capitalize" }}>
              {countrySlug}'s NCC Member
            </Box>
            <Box sx={{ marginTop: "10px" }}>
              <form onClick={handleUserSearch}>
                <input
                  style={{
                    padding: "5px 10px",
                    width: "250px",
                    border: "none",
                    outline: "none",
                    // borderRadius: '4px'
                  }}
                  type="text"
                  value={inputValue}
                  onChange={nameChangeHandler}
                  placeholder="Search user"
                />

                <button
                  onClick={nameClearHandler}
                  style={
                    inputValue
                      ? {
                          padding: "5px 10px",
                          border: "none",
                          backgroundColor: "#fff",
                          color: "red",
                        }
                      : {
                          padding: "5px 10px",
                          border: "none",
                          backgroundColor: "#fff",
                          color: "#fff",
                        }
                  }
                >
                  x
                </button>
              </form>
            </Box>
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
          <Register handleClose={formOpenFunction} countrySlug={countrySlug} />
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
            countrySlug={countrySlug}
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
          isLoading={change_role_loading}
        />
        {/* <CustomDeleteModal open={openDelete} handleClose={deleteOpenFunction} /> */}
        <CustomDeleteModal
          handleConfirm={handleConfirm}
          slug={detail?.id}
          open={openDelete}
          handleClose={deleteOpenFunction}
          isLoading={delete_users_loading}
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

export default ViewMembersTable;
