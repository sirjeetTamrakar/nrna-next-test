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
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Edit from "./Edit";
import Register from "./Register";
import View from "./View";
import {
  changeDownloadStatus,
  deleteDownload,
  getDownload,
  setDownloadSearch,
} from "./redux/actions";
import { useStyles } from "./styles";

const Downloads = () => {
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

  const {
    downloadData,
    get_download_loading,
    download_status_loading,
    delete_download_loading,
    download_search,
  } = useSelector((state) => state.download);

  const { user, admin_role_details, admin_ncc_id_details } = useSelector(
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
      title: "Created by",
      minWidth: 120,
      field: (row) => {
        return (
          <Box>
            <Typography variant="body2">
              {row?.created_by?.full_name
                ? row?.created_by?.full_name
                : row?.created_by?.username}
            </Typography>
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
            {row?.status === "active" ? (
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
              <li onClick={() => handleEdit(row)}>Edit Download </li>
              <li onClick={() => handleView(row)}>View Details</li>
              {/* {(user?.role_name === Roles?.member?.SuperAdmin ||
                user?.role_name === Roles?.member?.Admin) && (
                <li onClick={() => handleApprove(row)}>Approve News</li>
              )} */}
              <li onClick={() => handleDelete(row)}>Delete</li>
            </ul>
          </CustomPopover>
        );
      },
    },
  ];

  const handleUserSearch = (e) => {
    setPage(0);
    dispatch(setDownloadSearch(inputValue));
    e.preventDefault();
  };
  const [inputValue, setInputValue] = useState(""); // Track the input field value

  const nameChangeHandler = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue); // Update the input field value
    const timeout = setTimeout(() => {
      dispatch(setDownloadSearch(e.target.value));
    }, [1000]);
    return () => clearTimeout(timeout);
  };

  const nameClearHandler = () => {
    setPage(0);
    setInputValue("");
    dispatch(setDownloadSearch(""));
  };

  const handleConfirm = (slug) => {
    let typeData;
    if (user?.role_name == Roles?.Member) {
      typeData = {
        type: "member",
        id: user?.id,
        page: 1,
        pagination_limit: 10,
      };
    } else if (user?.role_name == Roles?.NCC) {
      typeData = {
        type: "ncc",
        id: user?.ncc?.id,
        page: 1,
        pagination_limit: 10,
      };
    } else if (
      user?.role_name == Roles?.SuperAdmin &&
      admin_role_details === "ncc"
    ) {
      typeData = {
        type: "ncc",
        id: admin_ncc_id_details,
        page: 1,
        pagination_limit: 10,
      };
    } else if (
      user?.role_name == Roles?.SuperAdmin &&
      admin_role_details === "admin"
    ) {
      typeData = { page: 1, pagination_limit: 10 };
    }
    dispatch(deleteDownload(slug, deleteOpenFunction, typeData));
  };

  const handleStatusConfirm = (slug) => {
    const finalData = {
      slug: slug,
      status: detail?.status === "inactive" ? "active" : "inactive",
    };
    let typeData;
    if (user?.role_name == Roles?.Member) {
      typeData = {
        type: "member",
        id: user?.id,
        page: 1,
        pagination_limit: 10,
      };
    } else if (user?.role_name == Roles?.NCC) {
      typeData = {
        type: "ncc",
        id: user?.ncc?.id,
        page: 1,
        pagination_limit: 10,
      };
    } else if (
      user?.role_name == Roles?.SuperAdmin &&
      admin_role_details === "ncc"
    ) {
      typeData = {
        type: "ncc",
        id: admin_ncc_id_details,
        page: 1,
        pagination_limit: 10,
      };
    } else if (
      user?.role_name == Roles?.SuperAdmin &&
      admin_role_details === "admin"
    ) {
      typeData = { page: 1, pagination_limit: 10 };
    }
    dispatch(changeDownloadStatus(finalData, statusOpenFunction, typeData));
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

  // const refetch = () => {
  //   if (user?.role_name == Roles?.Member) {
  //     const data = { page: page + 1, pagination_limit: rowsPerPage, type: 'member', id: user?.id };
  //     dispatch(getDownload(data));
  //   } else if (user?.role_name == Roles?.NCC) {
  //     const data = {
  //       page: page + 1,
  //       pagination_limit: rowsPerPage,
  //       type: 'ncc',
  //       id: user?.ncc?.id
  //     };
  //     dispatch(getDownload(data));
  //   } else {
  //     const data = { page: page + 1, pagination_limit: rowsPerPage };
  //     dispatch(getDownload(data));
  //   }
  // };

  // useEffect(() => {
  //   user && refetch();
  // }, [page, rowsPerPage, user]);

  const filterDataMember = {
    page: page + 1,
    pagination_limit: rowsPerPage,
    type: "member",
    id: user?.id,
    search: download_search,
  };
  const filterDataNCC = {
    page: page + 1,
    pagination_limit: rowsPerPage,
    type: "ncc",
    id: user?.ncc?.id,
    search: download_search,
  };
  const filterDataHome = {
    // if(user?.role_name === "superadmin" && admin_role_details === "admin"){}
    page: page + 1,
    pagination_limit: 100,
    search: download_search,
    user_id: user?.id,
  };
  const filterDataHomeAdminNcc = {
    page: page + 1,
    pagination_limit: rowsPerPage,
    type: "ncc",
    id: admin_ncc_id_details,
    search: download_search,
  };

  const filterDataHomeAll = {
    page: page + 1,
    pagination_limit: 100,
    search: download_search,
  };

  useEffect(() => {
    if (user?.role_name === "member") {
      dispatch(getDownload(filterDataMember));
    } else if (user?.role_name === "ncc") {
      dispatch(getDownload(filterDataNCC));
    } else if (
      user?.role_name == "superadmin" &&
      admin_role_details === "ncc"
    ) {
      dispatch(getDownload(filterDataHomeAdminNcc));
    } else if (
      user?.role_name == "superadmin" &&
      admin_role_details === "admin"
    ) {
      dispatch(getDownload(filterDataHome));
    } else {
      dispatch(getDownload(filterDataHomeAll));
    }
  }, [JSON.stringify(filterDataMember)]);

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
            <Box>Downloads</Box>
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
                  placeholder="Search download"
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
            Add Files
          </Button>
        </Box>
        <CustomTable
          tableHeads={tableHeads}
          tableData={downloadData?.data}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          page={page}
          setPage={setPage}
          total={downloadData?.meta?.total}
          loading={get_download_loading ? true : false}
        />
        <CustomModal
          open={openForm}
          handleClose={formOpenFunction}
          modalTitle="Add Download Files"
          modalSubtitle=""
          icon={<PersonAddIcon />}
          width={`60rem`}
        >
          <Register handleClose={formOpenFunction} />
        </CustomModal>
        <CustomModal
          open={openEdit}
          handleClose={editOpenFunction}
          modalTitle={`Update Files`}
          modalSubtitle=""
          icon={<PersonAddIcon />}
          width={`60rem`}
        >
          <Edit data={detail} handleClose={editOpenFunction} />
        </CustomModal>
        <CustomModal
          open={openView}
          handleClose={viewOpenFunction}
          modalTitle="Download Details"
          icon={<PersonIcon />}
          width={`40rem`}
        >
          <View data={detail} />
        </CustomModal>
        <CustomDeleteModal
          handleConfirm={handleConfirm}
          slug={detail?.slug}
          open={openDelete}
          isLoading={delete_download_loading}
          handleClose={deleteOpenFunction}
        />
        <CustomStatusModal
          open={openStatus}
          isLoading={download_status_loading}
          handleClose={statusOpenFunction}
          status={detail?.status == 1 ? "Active" : "Inactive"}
          id={detail?.slug}
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

export default Downloads;
