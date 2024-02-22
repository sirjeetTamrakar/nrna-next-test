import CustomDeleteModal from "@/components/common/CustomModal/CustomDeleteModal";
import CustomModal from "@/components/common/CustomModal/CustomModal";
import CustomStatusModal from "@/components/common/CustomModal/CustomStatusModal";
import CustomPopover from "@/components/common/CustomPopover/CustomPopover";
import CustomTable from "@/components/common/table";
import { Roles } from "@/constants/RoleConstant";
import useToggle from "@/hooks/useToggle";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteHomeData,
  getHomeData,
  updateHomeDataStatus,
} from "../../redux/actions";
import Edit from "./Edit";
import Register from "./Register";
import View from "./View";
import { useStyles } from "./styles";

const HomeData = () => {
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
    home_data,
    banner_home_data_loading,
    delete_home_data_loading,
    get_home_data_loading,
  } = useSelector((state) => state.settings);
  const { user, admin_ncc_id_details, admin_role_details } = useSelector(
    (state) => state.auth
  );

  const tableHeads = [
    { title: "S.N.", type: "Index", minWidth: 20 },

    {
      title: "Title",
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
      title: "Description",
      minWidth: 250,
      field: (row) => {
        return (
          <Box>
            <Typography variant="body2">
              {row?.description?.length > 59
                ? `${row?.description?.substring(0, 60)}...`
                : row?.subtitle}
            </Typography>
          </Box>
        );
      },
    },
    // {
    //   title: 'Image',
    //   minWidth: 120,
    //   field: (row) => {
    //     return (
    //       <img
    //         src={row?.image}
    //         alt=""
    //         style={{
    //           width: '46px',
    //           height: '46px',
    //           objectFit: 'contain'
    //         }}
    //       />
    //     );
    //   }
    // },

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
              <li onClick={() => handleEdit(row)}>Edit Home data </li>
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

  // const handleStatusConfirm = () => {
  //   dispatch(
  //     updateHomeDataStatus(detail?.id, { status: detail?.status == 1 ? 0 : 1 }, statusOpenFunction)
  //   );
  // };

  const handleStatusConfirm = (slug) => {
    const finalData = {
      slug: slug,
      status: detail?.status === 0 ? 1 : 0,
      _method: "PATCH",
    };
    let typeData;
    if (user?.role_name == Roles?.NCC) {
      typeData = {
        type: "ncc",
        id: user?.ncc?.id,
        page: 1,
        pagination_limit: 10,
      };
    }
    if (user?.role_name === Roles.SuperAdmin && admin_role_details === "ncc") {
      typeData = {
        type: "ncc",
        id: admin_ncc_id_details,
        page: 1,
        pagination_limit: 10,
      };
    }
    dispatch(updateHomeDataStatus(finalData, statusOpenFunction, typeData));
  };

  const handleDeleteConfirm = (slug) => {
    let typeData;
    if (user?.role_name == Roles?.NCC) {
      typeData = {
        type: "ncc",
        id: user?.ncc?.id,
        page: 1,
        pagination_limit: 10,
      };
    }
    if (user?.role_name === Roles.SuperAdmin && admin_role_details === "ncc") {
      typeData = {
        type: "ncc",
        id: admin_ncc_id_details,
        page: 1,
        pagination_limit: 10,
      };
    }
    dispatch(deleteHomeData(slug, deleteOpenFunction, typeData));
  };

  // useEffect(() => {
  //   dispatch(getHomeData());
  // }, []);

  const refetch = () => {
    const data = {
      page: page + 1,
      pagination_limit: rowsPerPage,
      homedataable_type: user?.role_name === Roles.NCC ? Roles.NCC : "",
      homedataable_id: user?.ncc?.id,
    };
    const adminData = {
      page: page + 1,
      pagination_limit: rowsPerPage,
      homedataable_type: "ncc",
      homedataable_id: admin_ncc_id_details,
    };
    if (user?.role_name === Roles.SuperAdmin && admin_role_details === "ncc") {
      dispatch(getHomeData(adminData));
    } else {
      dispatch(getHomeData(data));
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
          <Box>Home Data</Box>
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            display="flex"
            onClick={formOpenFunction}
          >
            Add Home Data
          </Button>
        </Box>
        <CustomTable
          tableHeads={tableHeads}
          tableData={home_data?.data}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          page={page}
          setPage={setPage}
          total={home_data?.meta?.total}
          loading={get_home_data_loading}
        />
        <CustomModal
          open={openForm}
          handleClose={formOpenFunction}
          modalTitle="Create Home data"
          modalSubtitle=""
          icon={<PersonAddIcon />}
          width={`60rem`}
        >
          <Register handleClose={formOpenFunction} />
        </CustomModal>
        <CustomModal
          open={openEdit}
          handleClose={editOpenFunction}
          modalTitle={`Update Home data`}
          modalSubtitle=""
          icon={<PersonAddIcon />}
          width={`60rem`}
        >
          <Edit data={detail} handleClose={editOpenFunction} />
        </CustomModal>
        <CustomModal
          open={openView}
          handleClose={viewOpenFunction}
          modalTitle="Home data detail"
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
          isLoading={delete_home_data_loading}
          slug={detail?.id}
        />
        <CustomStatusModal
          open={openStatus}
          handleClose={statusOpenFunction}
          status={detail?.status == 1 ? "Active" : "Inactive"}
          handleConfirm={handleStatusConfirm}
          isLoading={banner_home_data_loading}
          id={detail?.id}
        />
      </Box>
    </>
  );
};

export default HomeData;
