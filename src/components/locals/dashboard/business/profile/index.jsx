import CustomApproveModal from "@/components/common/CustomModal/CustomApproveModal";
import CustomDeleteModal from "@/components/common/CustomModal/CustomDeleteModal";
import CustomModal from "@/components/common/CustomModal/CustomModal";
import CustomStatusModal from "@/components/common/CustomModal/CustomStatusModal";
import CustomPopover from "@/components/common/CustomPopover/CustomPopover";
import CustomTable from "@/components/common/table";
import { Roles } from "@/constants/RoleConstant";
import useToggle from "@/hooks/useToggle";
import { changeDateFormat } from "@/utils/dateUtils";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeBusinessStatus,
  deleteBusiness,
  getBusiness,
} from "../redux/actions";
import Edit from "./Edit";
import Register from "./Register";
import Service from "./Service";
import ServiceTable from "./ServiceTable";
import ViewFollowerTable from "./ViewFollowersTable";
import { useStyles } from "./styles";

const Profile = () => {
  const dispatch = useDispatch();
  const [openForm, formOpenFunction] = useToggle(false);
  const [openEdit, editOpenFunction] = useToggle(false);
  const [openDelete, deleteOpenFunction] = useToggle(false);
  const [openStatus, statusOpenFunction] = useToggle(false);
  const [openApprove, approveOpenFunction] = useToggle(false);
  const [openService, serviceOpenFunction] = useToggle(false);
  const [openFollowers, openFollowersFunction] = useToggle(false);
  const [openServicesTable, servicesTableOpenFunction] = useToggle(false);
  const [detail, setDetail] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const classes = useStyles();
  const storedValueID = Number(localStorage.getItem("nccRoleID"));
  const storedValueRole = localStorage.getItem("nccRole");

  const {
    businessData,
    get_business_loading,
    business_status_loading,
    delete_business_loading,
  } = useSelector((state) => state.business);

  const { user } = useSelector((state) => state.auth);

  // const refetch = () => {
  //   const data = {
  //     user_id: user?.ncc?.id
  //   };
  //   dispatch(getBusiness(data));
  // };

  const tableHeads = [
    { title: "S.N.", type: "Index", minWidth: 20 },

    {
      title: "Business Name",
      minWidth: 200,
      field: (row) => {
        return (
          <Box>
            <Typography variant="body2">{row?.fullname}</Typography>
            <Typography variant="subtitle1">{row?.address}</Typography>
          </Box>
        );
      },
    },
    {
      title: "Followers",
      minWidth: 100,
      field: (row) => {
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleShowFollowers(row)}
          >
            {row?.business_follower_count}
          </Button>
        );
      },
    },

    {
      title: "Email/Phone",
      minWidth: 120,
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
      title: "Created by",
      minWidth: 120,
      field: (row) => {
        return (
          <Box>
            <Typography variant="body2">{row?.created_by}</Typography>
            <Typography variant="subtitle1">
              {changeDateFormat(row?.created_at)}
            </Typography>
          </Box>
        );
      },
    },
    {
      title: "Services",
      minWidth: 100,
      field: (row) => {
        return (
          <Box display={"flex"} columnGap={"10px"}>
            <Button
              sx={{ width: "40px" }}
              variant="contained"
              onClick={() => handleTableServices(row)}
            >
              <VisibilityIcon />
            </Button>
            <Button
              size="small"
              sx={{ minWidth: "40px", padding: "20px 10px !important" }}
              variant="contained"
              color="primary"
              onClick={() => handleService(row)}
            >
              <AddIcon />
            </Button>
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
                sx={{ width: "100px" }}
                variant="contained"
                color="success"
                onClick={() => handleStatus(row)}
              >
                Active
              </Button>
            ) : (
              <Button
                sx={{ width: "100px" }}
                variant="contained"
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
      title: "Approved By",
      minWidth: 150,
      field: (row) => {
        return <Box>{row?.approved_by ? row?.approved_by : "-"}</Box>;
      },
    },
    {
      title: "Actions",
      minWidth: 85,
      field: (row) => {
        return (
          <CustomPopover ButtonComponent={<MoreVertIcon />}>
            <ul className={classes.listWrapper}>
              <li onClick={() => handleEdit(row)}>Edit Business </li>
              {(user?.role_name === Roles?.SuperAdmin ||
                user?.role_name === Roles?.Admin) && (
                <li onClick={() => handleApprove(row)}>Approve Business</li>
              )}
              <li onClick={() => handleTableServices(row)}>View services</li>
              <li onClick={() => handleDelete(row)}>Delete</li>
            </ul>
          </CustomPopover>
        );
      },
    },
  ];

  // const handleConfirm = (slug) => {
  //   dispatch(deleteBusiness(slug, deleteOpenFunction));
  // };

  // const handleStatusConfirm = (slug) => {
  //   const finalData = {
  //     slug: slug,
  //     status: detail?.status === 'Active' ? 'inactive' : 'active',
  //     _method: 'PATCH'
  //   };
  //   dispatch(changeBusinessStatus(finalData, statusOpenFunction));
  // };

  const handleConfirm = (slug) => {
    let typeData;
    if (user?.role_name == Roles?.Member) {
      typeData = {
        type: "member",
        user_id: user?.id,
        page: page + 1,
        pagination_limit: rowsPerPage,
      };
    } else if (user?.role_name == Roles?.NCC) {
      typeData = {
        type: "ncc",
        user_id: user?.ncc?.id,
        page: page + 1,
        pagination_limit: rowsPerPage,
      };
    }
    dispatch(deleteBusiness(slug, deleteOpenFunction, typeData));
  };

  const handleStatusConfirm = (slug) => {
    const finalData = {
      slug: slug,
      status: detail?.status === 0 ? "1" : "0",
      _method: "PATCH",
    };
    let typeData;
    if (user?.role_name == Roles?.Member) {
      typeData = {
        type: "member",
        user_id: user?.id,
        page: page + 1,
        pagination_limit: rowsPerPage,
      };
    } else if (user?.role_name == Roles?.NCC) {
      typeData = {
        type: "ncc",
        user_id: user?.ncc?.id,
        page: page + 1,
        pagination_limit: rowsPerPage,
      };
    }
    dispatch(changeBusinessStatus(finalData, statusOpenFunction, typeData));
  };

  const handleShowFollowers = (row) => {
    setDetail(row);
    openFollowersFunction();
  };

  const handleEdit = (row) => {
    setDetail(row);
    editOpenFunction();
  };

  const handleDelete = (row) => {
    setDetail(row);
    deleteOpenFunction();
  };

  const handleTableServices = (row) => {
    setDetail(row);
    servicesTableOpenFunction();
  };

  const handleStatus = (row) => {
    setDetail(row);
    statusOpenFunction();
  };

  const handleApprove = (row) => {
    setDetail(row);
    approveOpenFunction();
  };

  const handleService = (row) => {
    setDetail(row);
    serviceOpenFunction();
  };

  const refetch = () => {
    if (user?.role_name == Roles?.Member) {
      const data = {
        page: page + 1,
        pagination_limit: rowsPerPage,
        type: "member",
        user_id: user?.id,
      };
      dispatch(getBusiness(data));
    } else if (user?.role_name == Roles?.NCC) {
      const data = {
        page: page + 1,
        pagination_limit: rowsPerPage,
        type: "ncc",
        user_id: user?.ncc?.id,
      };
      dispatch(getBusiness(data));
    } else if (
      (user?.role_name == "superadmin" || user?.role_name == "admin") &&
      storedValueRole === "ncc"
      // admin_role_details === 'ncc'
    ) {
      const data = {
        page: page + 1,
        pagination_limit: rowsPerPage,
        type: "ncc",
        user_id: storedValueID,
      };
      dispatch(getBusiness(data));
    } else if (
      (user?.role_name == "superadmin" || user?.role_name == "admin") &&
      storedValueRole === "admin"
      // admin_role_details === 'admin'
    ) {
      const data = { page: page + 1, pagination_limit: rowsPerPage };
      dispatch(getBusiness(data));
    } else if (
      user?.role_name == "superadmin" ||
      user?.role_name == "admin"
      // admin_role_details === 'admin'
    ) {
      const data = { page: page + 1, pagination_limit: rowsPerPage };
      dispatch(getBusiness(data));
    }
  };

  useEffect(() => {
    refetch();
  }, [page, rowsPerPage, user]);

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
          <Box>Business</Box>
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            display="flex"
            onClick={formOpenFunction}
          >
            Add Business
          </Button>
        </Box>
        <CustomTable
          tableHeads={tableHeads}
          tableData={businessData?.data}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          page={page}
          setPage={setPage}
          total={businessData?.meta?.total}
          loading={get_business_loading}
        />
        <CustomModal
          open={openServicesTable}
          handleClose={servicesTableOpenFunction}
          modalTitle={`Business Services of ${detail?.fullname}`}
          modalSubtitle=""
          // icon={<PersonAddIcon />}
          width={`60rem`}
        >
          <ServiceTable serviceId={detail?.id} />{" "}
        </CustomModal>
        <CustomModal
          open={openForm}
          handleClose={formOpenFunction}
          modalTitle="Create Business"
          modalSubtitle=""
          icon={<PersonAddIcon />}
          width={`60rem`}
        >
          <Register handleClose={formOpenFunction} />
        </CustomModal>
        <CustomModal
          open={openEdit}
          handleClose={editOpenFunction}
          modalTitle={`Update Business`}
          modalSubtitle=""
          icon={<PersonAddIcon />}
          width={`60rem`}
        >
          <Edit data={detail} handleClose={editOpenFunction} />
        </CustomModal>
        <CustomModal
          open={openService}
          handleClose={serviceOpenFunction}
          modalTitle={`Services of ${detail?.fullname}`}
          modalSubtitle="Enlist your services"
          icon={<PersonAddIcon />}
          width={`60rem`}
        >
          <Service data={detail} handleClose={serviceOpenFunction} />
        </CustomModal>
        <CustomModal
          open={openFollowers}
          handleClose={openFollowersFunction}
          modalTitle={`Followers of ${detail?.fullname}`}
          padding
          icon={<PersonIcon />}
          width={`60rem`}
        >
          {/* <ViewMembers data={detail} /> */}
          <ViewFollowerTable businessId={detail?.id} />
        </CustomModal>
        <CustomDeleteModal
          handleConfirm={handleConfirm}
          slug={detail?.slug}
          open={openDelete}
          isLoading={delete_business_loading}
          handleClose={deleteOpenFunction}
        />
        <CustomStatusModal
          open={openStatus}
          isLoading={business_status_loading}
          handleClose={statusOpenFunction}
          status={Number(detail?.status) === 1 ? "Active" : "Inactive"}
          id={detail?.slug}
          handleConfirm={handleStatusConfirm}
        />
        <CustomApproveModal
          open={openApprove}
          handleApprove={() => {}}
          handleReject={() => {}}
          handleClose={approveOpenFunction}
          row={detail}
        />
      </Box>
    </>
  );
};

export default Profile;
