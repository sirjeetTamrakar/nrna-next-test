import CustomApproveModal from "@/components/common/CustomModal/CustomApproveModal";
import CustomDeleteModal from "@/components/common/CustomModal/CustomDeleteModal";
import CustomModal from "@/components/common/CustomModal/CustomModal";
import CustomStatusModal from "@/components/common/CustomModal/CustomStatusModal";
import CustomPopover from "@/components/common/CustomPopover/CustomPopover";
import CustomTable from "@/components/common/table";
import useToggle from "@/hooks/useToggle";
import { changeDateFormat } from "@/utils/dateUtils";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Box, Button, Typography } from "@mui/material";
import { Roles } from "constants/RoleConstant";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Edit from "./Edit";
import Register from "./Register";
import View from "./View";
import { changeEventsStatus, deleteEvents, getEvents } from "./redux/actions";
import { useStyles } from "./styles";

const Events = () => {
  const dispatch = useDispatch();
  const [openForm, formOpenFunction] = useToggle(false);
  const [openEdit, editOpenFunction] = useToggle(false);
  const [openDelete, deleteOpenFunction] = useToggle(false);
  const [openStatus, statusOpenFunction] = useToggle(false);
  const [openApprove, approveOpenFunction] = useToggle(false);
  const [openView, viewOpenFunction] = useToggle(false);
  const [detail, setDetail] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const classes = useStyles();
  const storedValueID = Number(localStorage.getItem("nccRoleID"));
  const storedValueRole = localStorage.getItem("nccRole");

  const {
    eventsData,
    get_events_loading,
    events_status_loading,
    delete_events_loading,
  } = useSelector((state) => state.events);

  const { user, admin_role_details, admin_ncc_id_details } = useSelector(
    (state) => state.auth
  );

  const tableHeads = [
    { title: "S.N.", type: "Index", minWidth: 20 },

    {
      title: "Title",
      minWidth: 200,

      field: "title",
    },
    {
      title: "Location / Date",
      minWidth: 150,

      field: (row) => {
        return (
          <Box>
            <Typography variant="body2">{row?.location}</Typography>
            <Typography variant="subtitle1">{`${row?.event_date} ${row?.event_time}`}</Typography>
          </Box>
        );
      },
    },

    {
      title: "Created at",
      minWidth: 150,

      field: (row) => {
        return (
          <Box>
            <Typography variant="body2">{row?.created_by?.name}</Typography>
            <Typography variant="subtitle1">
              {changeDateFormat(row?.created_at)}
            </Typography>
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
      title: "Approved by",
      minWidth: 100,
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
              <li onClick={() => handleEdit(row)}>Edit Event </li>
              <li onClick={() => handleView(row)}>View Details</li>
              {(user?.role_name === Roles.SuperAdmin ||
                user?.role_name === Roles.Admin) && (
                <li onClick={() => handleApprove(row)}>Approve Events</li>
              )}
              <li onClick={() => handleDelete(row)}>Delete</li>
            </ul>
          </CustomPopover>
        );
      },
    },
  ];

  const handleConfirm = (slug) => {
    let typeData;
    if (user?.role_name == Roles?.NCC) {
      typeData = {
        id: user?.ncc?.id,
        page: page + 1,
        pagination_limit: rowsPerPage,
      };
    } else {
      typeData = { page: page + 1, pagination_limit: rowsPerPage };
    }
    dispatch(deleteEvents(slug, deleteOpenFunction, typeData));
  };

  const handleStatusConfirm = (slug) => {
    const finalData = {
      slug: slug,
      status: detail?.status === 0 ? 1 : 0,
      _method: "PATCH",
    };
    let typeData;
    if (user?.role_name == Roles?.NCC) {
      typeData = {
        id: user?.ncc?.id,
        page: page + 1,
        pagination_limit: rowsPerPage,
      };
    } else {
      typeData = { page: page + 1, pagination_limit: rowsPerPage };
    }
    dispatch(changeEventsStatus(finalData, statusOpenFunction, typeData));
  };

  const handleEdit = (row) => {
    setDetail(row);
    editOpenFunction();
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

  const refetch = () => {
    let typeData;
    if (user?.role_name == Roles?.NCC) {
      typeData = {
        id: user?.ncc?.id,
        page: page + 1,
        pagination_limit: rowsPerPage,
      };
    } else if (
      user?.role_name == Roles?.SuperAdmin &&
      storedValueRole === "ncc"
    ) {
      typeData = {
        type: "ncc",
        id: storedValueID,
        page: 1,
        pagination_limit: 10,
      };
    } else if (
      user?.role_name == Roles?.SuperAdmin &&
      storedValueRole === "admin"
    ) {
      typeData = { page: 1, pagination_limit: 10 };
    } else {
      typeData = { page: page + 1, pagination_limit: rowsPerPage };
    }
    dispatch(getEvents(typeData));
  };

  useEffect(() => {
    user && refetch();
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
          <Box>Event</Box>
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            display="flex"
            onClick={formOpenFunction}
          >
            Add Event
          </Button>
        </Box>
        <CustomTable
          tableHeads={tableHeads}
          tableData={eventsData?.data}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          page={page}
          setPage={setPage}
          total={eventsData?.meta?.total}
          loading={get_events_loading ? true : false}
        />
        <CustomModal
          open={openForm}
          handleClose={formOpenFunction}
          modalTitle="Create Event"
          modalSubtitle=""
          icon={<PersonAddIcon />}
          width={`60rem`}
        >
          <Register handleClose={formOpenFunction} />
        </CustomModal>
        <CustomModal
          open={openEdit}
          handleClose={editOpenFunction}
          modalTitle={`Update Event`}
          modalSubtitle=""
          icon={<PersonAddIcon />}
          width={`60rem`}
        >
          <Edit data={detail} handleClose={editOpenFunction} />
        </CustomModal>
        <CustomModal
          open={openView}
          handleClose={viewOpenFunction}
          modalTitle="Events Details"
          // modalSubtitle="Get full detail "
          icon={<PersonIcon />}
          width={`40rem`}
        >
          <View data={detail} />
        </CustomModal>
        <CustomDeleteModal
          handleConfirm={handleConfirm}
          slug={detail?.slug}
          open={openDelete}
          handleClose={deleteOpenFunction}
          isLoading={delete_events_loading}
        />
        <CustomStatusModal
          open={openStatus}
          handleClose={statusOpenFunction}
          status={detail?.status === 1 ? "Active" : "Inactive"}
          id={detail?.slug}
          isLoading={events_status_loading}
          handleConfirm={handleStatusConfirm}
        />
        <CustomApproveModal
          open={openApprove}
          handleClose={approveOpenFunction}
          row={detail}
        />
      </Box>
    </>
  );
};

export default Events;
