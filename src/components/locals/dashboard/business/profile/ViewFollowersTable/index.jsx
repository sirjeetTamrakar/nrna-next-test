import ExcelDownloadButton from "@/components/common/CustomExcelFileDownload";
import CustomApproveModal from "@/components/common/CustomModal/CustomApproveModal";
import CustomModal from "@/components/common/CustomModal/CustomModal";
import CustomPopover from "@/components/common/CustomPopover/CustomPopover";
import CustomTable from "@/components/common/table";
import useToggle from "@/hooks/useToggle";
import CancelIcon from "@mui/icons-material/Cancel";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";
import PersonIcon from "@mui/icons-material/Person";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Box, Typography } from "@mui/material";
import { Roles } from "constants/RoleConstant";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBusinessFollow,
  getBusinessFollowDownload,
  postBusinessUserApproval,
  setFollowersSearch,
} from "../../redux/actions";

// import {
//   changeApproval,
//   changeUserRole,
//   deleteUsers,
//   setUserSearch
// } from '../../userManagement/redux/actions';
// import { getNCC } from '../redux/actions';
// import {
//   changeApproval,
//   changeStatus,
//   changeUserRole,
//   getAllUsers,
//   getNCC,
//   setUserSearch
// } from '../redux/actions';
import { useStyles } from "./styles";
import View from "./View";
const ViewFollowerTable = ({ countrySlug, businessId }) => {
  const dispatch = useDispatch();

  const [openApprove, approveOpenFunction] = useToggle(false);
  const { user } = useSelector((state) => state.auth);
  const { nccData } = useSelector((state) => state.ncc);
  const {
    businessFollowData,
    get_business_follow_loading,
    business_user_approval_loading,
    followers_search,
    businessFollowDownloadData,
  } = useSelector((state) => state.business);
  const [roleIDData, setRoleIDData] = useState();
  const [openView, viewOpenFunction] = useToggle(false);

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

  const tableHeads = [
    { title: "S.N.", type: "Index", minWidth: 20 },
    {
      title: "Firstname",
      minWidth: 150,
      field: (row) => {
        return (
          <Box>
            <Typography variant="body2">
              {row?.user?.first_name && row?.user?.first_name}{" "}
            </Typography>
          </Box>
        );
      },
    },
    {
      title: "Lastname",
      minWidth: 150,
      field: (row) => {
        return (
          <Box>
            <Typography variant="body2">
              {row?.user?.last_name && row?.user?.last_name}{" "}
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
            <Typography variant="body2">{row?.user?.email}</Typography>
            <Typography variant="subtitle1">{row?.user?.phone}</Typography>
          </Box>
        );
      },
    },
    {
      title: "Address",
      minWidth: 120,
      field: (row) => {
        return (
          <Typography variant="body2">{` ${
            row?.user?.country_of_residence ?? "-"
          }`}</Typography>
        );
      },
    },

    {
      title: "Approved",
      minWidth: 100,
      field: (row) => {
        return (
          <Box>
            {row?.status === "approved" ? (
              <Box display="flex" columnGap={0.5}>
                <TaskAltIcon sx={{ color: "green" }} />
                <Typography color={"green"}>Approved</Typography>
              </Box>
            ) : row?.status === "rejected" ? (
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
              {/* <li onClick={() => handleEdit(row)}>Edit Business </li>
              {(user?.role_name === Roles?.SuperAdmin || user?.role_name === Roles?.Admin) && (
                <li onClick={() => handleApprove(row)}>Approve Business</li>
              )}
              <li onClick={() => handleTableServices(row)}>View services</li>
              <li onClick={() => handleDelete(row)}>Delete</li> */}
              {(user?.role_name === Roles?.SuperAdmin ||
                user?.role_name === Roles?.Admin) && (
                <li onClick={() => handleApprove(row)}>Approve User</li>
              )}
              <li onClick={() => handleView(row)}>View</li>
            </ul>
          </CustomPopover>
        );
      },
    },
  ];

  const handleView = (row) => {
    setDetail(row);
    viewOpenFunction();
  };

  const handleApprove = (row) => {
    setDetail(row);
    approveOpenFunction();
  };

  const handleApproveStatus = (value) => {
    const status = value === "approved" ? "approved" : "rejected";
    const data = {
      user_id: Number(detail?.user_id),
      business_id: businessId,
    };
    dispatch(
      postBusinessUserApproval(
        { ...data, status: status, _method: "PATCH" },
        () => {
          approveOpenFunction();
          refetch();
        }
      )
    );
  };

  const [inputValue, setInputValue] = useState(""); // Track the input field value
  const handleUserSearch = (e) => {
    setPage(0);
    dispatch(setFollowersSearch(inputValue));
    e.preventDefault();
  };

  const nameChangeHandler = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue); // Update the input field value
    const timeout = setTimeout(() => {
      dispatch(setFollowersSearch(e.target.value));
    }, [1000]);
    return () => clearTimeout(timeout);
  };

  const nameClearHandler = () => {
    setPage(0);
    setInputValue("");
    dispatch(setFollowersSearch(""));
  };

  const filterDataMember = {
    page: page + 1,
    pagination_limit: rowsPerPage,
    search: followers_search,
    business_id: businessId,
  };

  const refetch = () => {
    dispatch(getBusinessFollow(filterDataMember));
  };

  useEffect(() => {
    dispatch(getBusinessFollow(filterDataMember));
  }, [JSON.stringify(filterDataMember), businessId]);

  useEffect(() => {
    // refetch();
  }, [page, rowsPerPage, businessId]);

  // const refetch = () => {
  //   const data = { page: page + 1, pagination_limit: rowsPerPage, business_id: businessId };
  //   dispatch(getBusinessFollow(data));
  // };

  // useEffect(() => {
  //   refetch();
  // }, [page, rowsPerPage, businessId]);

  const filterDataMemberDownload = {
    business_id: businessId,
  };

  useEffect(() => {
    dispatch(getBusinessFollowDownload(filterDataMemberDownload));
  }, [businessId]);

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
            <Box>
              <Box sx={{ textTransform: "capitalize" }}>Followers</Box>{" "}
              <Box
                sx={{
                  marginTop: "10px",
                  display: "flex",
                  alignItems: "center",
                  // justifyContent: 'space-between'
                  gap: "400px",
                }}
              >
                <Box>
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
                      placeholder="Search followers"
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
                <Box sx={{}}>
                  <ExcelDownloadButton
                    data={businessFollowDownloadData?.data}
                    fileName="Followers Data"
                    followers
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <CustomTable
          tableHeads={tableHeads}
          tableData={businessFollowData?.data}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          page={page}
          loading={get_business_follow_loading}
          setPage={setPage}
          total={businessFollowData?.meta?.total}
        />
        <CustomModal
          open={openView}
          handleClose={viewOpenFunction}
          modalTitle="Follower's detail"
          // modalSubtitle="Get full detail"
          icon={<PersonIcon />}
          width={`40rem`}
        >
          <View data={detail} />
        </CustomModal>
        <CustomApproveModal
          open={openApprove}
          handleClose={approveOpenFunction}
          row={detail}
          isLoading={business_user_approval_loading}
          handleApprove={() => handleApproveStatus("approved")}
          handleReject={() => handleApproveStatus("rejected")}
        />
      </Box>
    </>
  );
};

export default ViewFollowerTable;
