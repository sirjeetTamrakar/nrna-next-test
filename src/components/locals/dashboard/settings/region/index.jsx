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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Edit from "./Edit";
import Register from "./Register";
import View from "./View";
import { deleteRegion, getRegion, updateRegionStatus } from "./redux/actions";
import { useStyles } from "./styles";

const SettingsRegion = () => {
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
    regionData,
    region_status_loading,
    delete_region_loading,
    get_region_loading,
  } = useSelector((state) => state.region);
  const { user, admin_ncc_id_details, admin_role_details } = useSelector(
    (state) => state.auth
  );

  const tableHeads = [
    { title: "S.N.", type: "Index", minWidth: 20 },

    {
      title: "Region Title",
      minWidth: 250,
      field: "name",
    },

    {
      title: "Image",
      minWidth: 120,
      field: (row) => {
        return row?.region_image ? (
          <img
            src={row?.region_image}
            alt=""
            style={{
              width: "46px",
              height: "46px",
              objectFit: "contain",
            }}
          />
        ) : (
          "No image"
        );
      },
    },

    {
      title: "Status",
      minWidth: 100,
      field: (row) => {
        return (
          <Box>
            {row?.status == "active" ? (
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
    const typeData = {
      page: page + 1,
      pagination_limit: rowsPerPage,
    };
    const finalData = {
      slug: detail?.slug,
      status: detail?.status === "active" ? "inactive" : "active",
      _method: "PATCH",
    };
    dispatch(updateRegionStatus(finalData, typeData, statusOpenFunction));
  };

  const handleDeleteConfirm = () => {
    const typeData = {
      page: page + 1,
      pagination_limit: rowsPerPage,
    };
    dispatch(deleteRegion(detail?.slug, typeData, deleteOpenFunction));
  };

  // useEffect(() => {
  //   dispatch(getRegion());
  // }, []);

  const refetch = () => {
    const data = {
      page: page + 1,
      pagination_limit: rowsPerPage,
    };

    dispatch(getRegion(data));
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
          <Box>Region</Box>
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            display="flex"
            onClick={formOpenFunction}
          >
            Add Region
          </Button>
        </Box>
        <CustomTable
          tableHeads={tableHeads}
          tableData={regionData?.data}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          page={page}
          setPage={setPage}
          total={regionData?.meta?.total}
          loading={get_region_loading}
        />
        <CustomModal
          open={openForm}
          handleClose={formOpenFunction}
          modalTitle="Create Region"
          modalSubtitle=""
          icon={<PersonAddIcon />}
          width={`60rem`}
        >
          <Register handleClose={formOpenFunction} />
        </CustomModal>
        <CustomModal
          open={openEdit}
          handleClose={editOpenFunction}
          modalTitle={`Update Region`}
          modalSubtitle=""
          icon={<PersonAddIcon />}
          width={`60rem`}
        >
          <Edit data={detail} handleClose={editOpenFunction} />
        </CustomModal>
        <CustomModal
          open={openView}
          handleClose={viewOpenFunction}
          modalTitle="Region detail"
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
          isLoading={delete_region_loading}
          slug={detail?.slug}
        />
        <CustomStatusModal
          open={openStatus}
          handleClose={statusOpenFunction}
          status={detail?.status == "active" ? "Active" : "Inactive"}
          handleConfirm={handleStatusConfirm}
          isLoading={region_status_loading}
          id={detail?.slug}
        />
      </Box>
    </>
  );
};

export default SettingsRegion;
