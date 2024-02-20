import CustomDeleteModal from "@/components/common/CustomModal/CustomDeleteModal";
import CustomModal from "@/components/common/CustomModal/CustomModal";
import CustomStatusModal from "@/components/common/CustomModal/CustomStatusModal";
import CustomPopover from "@/components/common/CustomPopover/CustomPopover";
import CustomTable from "@/components/common/table";
import useToggle from "@/hooks/useToggle";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Box, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Roles } from "constants/RoleConstant";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNCC } from "../ncc/redux/actions";
import Edit from "./Edit";
import Register from "./Register";
import View from "./View";
import { changeTeamsStatus, deleteTeams, getTeams } from "./redux/actions";
import { useStyles } from "./styles";

const OurTeam = () => {
  const dispatch = useDispatch();
  const [openForm, formOpenFunction] = useToggle(false);
  const [openEdit, editOpenFunction] = useToggle(false);
  const [openDelete, deleteOpenFunction] = useToggle(false);
  const [openStatus, statusOpenFunction] = useToggle(false);
  const [openView, viewOpenFunction] = useToggle(false);
  const [detail, setDetail] = useState();
  const [nccInfo, setNccInfo] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const classes = useStyles();

  const { teamsData, get_teams_loading, delete_teams_loading } = useSelector(
    (state) => state.teams
  );
  const { user, admin_role_details, admin_ncc_id_details } = useSelector(
    (state) => state.auth
  );
  const { nccData, get_ncc_loading } = useSelector((state) => state.ncc);

  useEffect(() => {
    const data = { page: page + 1, pagination_limit: rowsPerPage };
    dispatch(getNCC(data));
  }, []);

  useEffect(() => {
    const newArray = nccData?.data?.filter(
      (item) => item?.id === admin_ncc_id_details
    );
    const newObj = {};

    newArray?.forEach((item, index) => {
      newObj[`nccInfo${index + 1}`] = item;
    });
    setNccInfo(newObj);
  }, [nccData?.data]);

  const tableHeads = [
    { title: "S.N.", type: "Index", minWidth: 20 },

    {
      title: "Name",
      minWidth: 180,
      field: (row) => {
        return (
          <Box>
            <Typography variant="body2">
              {row?.member?.full_name
                ? row?.member?.full_name
                : row?.member?.username}
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
            <Typography variant="body2">{row?.member?.email}</Typography>
            <Typography variant="subtitle1">{row?.member?.phone}</Typography>
          </Box>
        );
      },
    },

    {
      title: "Address",
      minWidth: 100,
      field: (row) => {
        return (
          <Typography variant="body2">{`${row?.member?.country_of_residence}`}</Typography>
        );
      },
    },
    {
      title: "Designation",
      minWidth: 100,
      field: "designation",
    },
    {
      title: "Order",
      minWidth: 100,
      field: "order",
    },
    {
      title: "Status",
      minWidth: 100,
      field: (row) => {
        return (
          <Box>
            {row?.status == 1 ? (
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
      title: "Actions",
      minWidth: 85,
      field: (row) => {
        return (
          <CustomPopover ButtonComponent={<MoreVertIcon />}>
            <ul className={classes.listWrapper}>
              <li onClick={() => handleEdit(row)}>Edit Team </li>
              <li onClick={() => handleView(row)}>View Details</li>
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
        id: user?.id,
        page: page + 1,
        pagination_limit: rowsPerPage,
      };
    } else if (
      user?.role_name == Roles?.SuperAdmin &&
      admin_role_details === "ncc"
    ) {
      typeData = {
        id: admin_ncc_id_details,
        page: page + 1,
        pagination_limit: rowsPerPage,
      };
    } else {
      typeData = { page: page + 1, pagination_limit: rowsPerPage };
    }
    dispatch(deleteTeams(slug, deleteOpenFunction, typeData));
  };

  const handleStatusConfirm = (slug) => {
    const finalData = {
      slug: slug,
      status: detail?.status == 0 ? 1 : 0,
      _method: "PATCH",
    };
    let typeData;
    if (user?.role_name == Roles?.NCC) {
      typeData = {
        id: user?.id,
        page: page + 1,
        pagination_limit: rowsPerPage,
      };
    } else if (
      user?.role_name == Roles?.SuperAdmin &&
      admin_role_details === "ncc"
    ) {
      typeData = {
        id: admin_ncc_id_details,
        page: page + 1,
        pagination_limit: rowsPerPage,
      };
    } else {
      typeData = { page: page + 1, pagination_limit: rowsPerPage };
    }
    dispatch(changeTeamsStatus(finalData, statusOpenFunction, typeData));
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

  const handleView = (row) => {
    setDetail(row);
    viewOpenFunction();
  };

  const refetch = () => {
    let typeData;
    if (user?.role_name == Roles?.NCC) {
      typeData = {
        id: user?.ncc?.id,
        country: user?.ncc?.country_name,
        page: page + 1,
        pagination_limit: rowsPerPage,
      };
    } else if (
      user?.role_name == Roles?.SuperAdmin &&
      admin_role_details === "ncc"
    ) {
      typeData = {
        id: admin_ncc_id_details,
        country: nccInfo?.nccInfo1?.country_name,
        page: page + 1,
        pagination_limit: rowsPerPage,
      };
    } else {
      typeData = { page: page + 1, pagination_limit: rowsPerPage };
    }
    dispatch(getTeams(typeData));
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
          <Box>Our Teams</Box>
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            display="flex"
            onClick={formOpenFunction}
          >
            Add Our Team
          </Button>
        </Box>
        <CustomTable
          tableHeads={tableHeads}
          tableData={teamsData?.data}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          page={page}
          setPage={setPage}
          total={teamsData?.meta?.total}
          loading={get_teams_loading}
        />
        <CustomModal
          open={openForm}
          handleClose={formOpenFunction}
          modalTitle="Create Our Team"
          modalSubtitle=""
          icon={<PersonAddIcon />}
          width={`40rem`}
        >
          <Register handleClose={formOpenFunction} />
        </CustomModal>
        <CustomModal
          open={openEdit}
          handleClose={editOpenFunction}
          modalTitle={`Update Our Team`}
          modalSubtitle=""
          icon={<PersonAddIcon />}
          width={`40rem`}
        >
          <Edit data={detail} handleClose={editOpenFunction} />
        </CustomModal>
        <CustomModal
          open={openView}
          handleClose={viewOpenFunction}
          modalTitle="Get Teams detail"
          icon={<PersonIcon />}
          width={`40rem`}
        >
          <View data={detail} />
        </CustomModal>
        <CustomDeleteModal
          handleConfirm={handleConfirm}
          slug={detail?.id}
          open={openDelete}
          isLoading={delete_teams_loading}
          handleClose={deleteOpenFunction}
        />
        <CustomStatusModal
          open={openStatus}
          handleClose={statusOpenFunction}
          status={detail?.status == 1 ? "Active" : "Inactive"}
          id={detail?.id}
          handleConfirm={handleStatusConfirm}
        />
      </Box>
    </>
  );
};

export default OurTeam;
