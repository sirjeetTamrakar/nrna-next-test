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
import { getNbnsFollowers, postNbnsUserApproval } from "../redux/actions";
import View from "./View";
import { useStyles } from "./styles";

const NBNSFollowers = () => {
  const dispatch = useDispatch();

  const [openView, viewOpenFunction] = useToggle(false);
  const [openApprove, approveOpenFunction] = useToggle(false);
  const [detail, setDetail] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const classes = useStyles();

  const { businessFollowData, get_business_follow_loading } = useSelector(
    (state) => state.business
  );

  const { nbns_followers, nbns_user_approval_loading } = useSelector(
    (state) => state.settings
  );
  const { user } = useSelector((state) => state.auth);

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
          <Typography variant="body2">{` ${
            row?.country_of_residence ?? "-"
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
            {row?.nbns_status === "approved" ? (
              <Box display="flex" columnGap={0.5}>
                <TaskAltIcon sx={{ color: "green" }} />
                <Typography color={"green"}>Approved</Typography>
              </Box>
            ) : row?.nbns_status === "rejected" ? (
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

  const handleApprove = (row) => {
    setDetail(row);
    approveOpenFunction();
  };

  const handleApproveStatus = (value) => {
    const status = value === "approved" ? "approved" : "rejected";
    const data = {
      user_id: detail?.id,
    };
    dispatch(
      postNbnsUserApproval(
        { ...data, nbns_status: status, _method: "PATCH" },
        () => {
          approveOpenFunction();
          refetch();
        }
      )
    );
  };

  const handleView = (row) => {
    setDetail(row);
    viewOpenFunction();
  };

  const refetch = () => {
    const data = { page: page + 1, pagination_limit: rowsPerPage };
    dispatch(getNbnsFollowers(data));
  };

  useEffect(() => {
    refetch();
  }, [page, rowsPerPage, 1]);

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
          <Box>NBNS Followers</Box>
        </Box>
        <CustomTable
          tableHeads={tableHeads}
          tableData={nbns_followers?.data}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          page={page}
          setPage={setPage}
          total={nbns_followers?.meta?.total}
          loading={get_business_follow_loading}
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
          isLoading={nbns_user_approval_loading}
          handleApprove={() => handleApproveStatus("approved")}
          handleReject={() => handleApproveStatus("rejected")}
        />
      </Box>
    </>
  );
};

export default NBNSFollowers;
