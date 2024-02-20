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
import { Box, Button, Typography } from "@mui/material";
import { Roles } from "constants/RoleConstant";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Edit from "./Edit";
import Register from "./Register";
import View from "./View";
import { deleteBanner, getBanner, updateBannerStatus } from "./redux/actions";
import { useStyles } from "./styles";

const SettingsBanner = () => {
  const dispatch = useDispatch();
  const [openForm, formOpenFunction] = useToggle(false);
  const [openEdit, editOpenFunction] = useToggle(false);
  const [openDelete, deleteOpenFunction] = useToggle(false);
  const [openStatus, statusOpenFunction] = useToggle(false);
  const [openView, viewOpenFunction] = useToggle(false);
  const [detail, setDetail] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const classes = useStyles();
  const {
    bannerData,
    banner_status_loading,
    delete_banner_loading,
    get_banner_loading,
  } = useSelector((state) => state.banner);
  const { user, admin_ncc_id_details, admin_role_details } = useSelector(
    (state) => state.auth
  );
  const storedValueRole = localStorage.getItem("nccRole");
  const storedValueID = Number(localStorage.getItem("nccRoleID"));

  const tableHeads = [
    { title: "S.N.", type: "Index", minWidth: 20 },

    {
      title: "Banner Title",
      minWidth: 250,
      field: "title",
    },
    {
      title: "Subtitle",
      minWidth: 250,
      field: (row) => {
        return (
          <Box>
            <Typography variant="body2">
              {row?.subtitle?.length > 59
                ? `${row?.subtitle?.substring(0, 60)}...`
                : row?.subtitle}
            </Typography>
          </Box>
        );
      },
      // field: 'subtitle'
    },
    {
      title: "Image",
      minWidth: 120,
      field: (row) => {
        return (
          <img
            src={row?.image}
            alt=""
            style={{
              width: "46px",
              height: "46px",
              objectFit: "contain",
            }}
          />
        );
      },
    },

    {
      title: "Status",
      minWidth: 100,
      field: (row) => {
        return (
          <Box>
            {row?.status == 1 ? (
              <Button
                variant="contained"
                color="success"
                onClick={() => handleStatus(row)}
              >
                Active
              </Button>
            ) : (
              <Button
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
              <li onClick={() => handleEdit(row)}>Edit Banner </li>
              <li onClick={() => handleView(row)}>View Details</li>
              <li onClick={() => handleDelete(row)}>Delete</li>
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

  const handleStatusConfirm = () => {
    dispatch(
      updateBannerStatus(
        detail?.id,
        { status: detail?.status == 1 ? 0 : 1 },
        statusOpenFunction
      )
    );
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteBanner(detail?.id, deleteOpenFunction));
  };

  // useEffect(() => {
  //   dispatch(getBanner());
  // }, []);

  const refetch = () => {
    const data = {
      page: page + 1,
      pagination_limit: rowsPerPage,
      bannerable_type: user?.role_name === Roles.NCC ? Roles.NCC : "",
      bannerable_id: user?.ncc?.id,
    };
    const adminData = {
      page: page + 1,
      pagination_limit: rowsPerPage,
      bannerable_type: "ncc",
      bannerable_id: storedValueID,
    };
    if (user?.role_name === Roles.SuperAdmin && storedValueRole === "ncc") {
      dispatch(getBanner(adminData));
    } else {
      dispatch(getBanner(data));
    }
  };

  useEffect(() => {
    refetch();
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
          <Box>Banner</Box>
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            display="flex"
            onClick={formOpenFunction}
          >
            Add Banner
          </Button>
        </Box>
        <CustomTable
          tableHeads={tableHeads}
          tableData={bannerData?.data}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          page={page}
          setPage={setPage}
          total={bannerData?.meta?.total}
          loading={get_banner_loading}
        />
        <CustomModal
          open={openForm}
          handleClose={formOpenFunction}
          modalTitle="Create Banner"
          modalSubtitle=""
          icon={<PersonAddIcon />}
          width={`60rem`}
        >
          <Register handleClose={formOpenFunction} />
        </CustomModal>
        <CustomModal
          open={openEdit}
          handleClose={editOpenFunction}
          modalTitle={`Update Banner`}
          modalSubtitle=""
          icon={<PersonAddIcon />}
          width={`60rem`}
        >
          <Edit data={detail} handleClose={editOpenFunction} />
        </CustomModal>
        <CustomModal
          open={openView}
          handleClose={viewOpenFunction}
          modalTitle="Banner detail"
          // modalSubtitle="Get full detail"
          icon={<PersonIcon />}
          width={`40rem`}
        >
          <View data={detail} />
        </CustomModal>
        <CustomDeleteModal
          open={openDelete}
          handleClose={deleteOpenFunction}
          handleConfirm={handleDeleteConfirm}
          isLoading={delete_banner_loading}
        />
        <CustomStatusModal
          open={openStatus}
          handleClose={statusOpenFunction}
          status={detail?.status == 1 ? "Active" : "Inactive"}
          handleConfirm={handleStatusConfirm}
          isLoading={banner_status_loading}
        />
      </Box>
    </>
  );
};

export default SettingsBanner;
