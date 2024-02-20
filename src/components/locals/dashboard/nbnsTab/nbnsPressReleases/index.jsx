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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changePressReleaseStatus,
  deletePressRelease,
  getPressRelease,
} from "../redux/actions";
import Edit from "./Edit";
import Register from "./Register";
import View from "./View";
import { useStyles } from "./styles";

const NBNSPressRelease = () => {
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

  // const {
  //   pressReleaseData,
  //   press_release_loading,
  //   get_press_release_loading,
  //   press_release_status_loading,
  //   delete_press_release_loading
  // } = useSelector((state) => state.nbns);
  const {
    pressReleaseData,
    get_press_release_loading,
    delete_press_release_loading,
    press_release_status_loading,
  } = useSelector((state) => state.nbns);

  const tableHeads = [
    { title: "S.N.", type: "Index", minWidth: 20 },

    {
      title: "Title",
      minWidth: 250,
      field: "title",
    },
    {
      title: "Decription",
      minWidth: 250,
      field: (row) => {
        return (
          <Box>
            <div
              dangerouslySetInnerHTML={{
                __html: row?.description?.substring(0, 70),
              }}
            />
          </Box>
        );
      },
    },
    {
      title: "Created at",
      minWidth: 120,
      field: (row) => {
        return (
          <Box>
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
              <li onClick={() => handleEdit(row)}>Edit Press Release </li>
              <li onClick={() => handleView(row)}>View Details</li>

              <li onClick={() => handleApprove(row)}>Approve Press Release</li>

              <li onClick={() => handleDelete(row)}>Delete</li>
            </ul>
          </CustomPopover>
        );
      },
    },
  ];

  const [inputValue, setInputValue] = useState(""); // Track the input field value

  const handleConfirm = (slug) => {
    const typeData = { page: 1, pagination_limit: 10 };

    dispatch(deletePressRelease(slug, deleteOpenFunction, typeData));
  };

  const handleStatusConfirm = (slug) => {
    const finalData = {
      slug: slug,
      status: detail?.status === "active" ? "inactive" : "active",
      _method: "PATCH",
    };

    const typeData = { page: 1, pagination_limit: 10 };

    dispatch(changePressReleaseStatus(finalData, statusOpenFunction, typeData));
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
    const typeData = { page: page + 1, pagination_limit: rowsPerPage };

    dispatch(getPressRelease(typeData));
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
          <Box>Press Release</Box>

          <Button
            startIcon={<AddIcon />}
            variant="contained"
            display="flex"
            onClick={formOpenFunction}
          >
            Add Press Release
          </Button>
        </Box>
        <CustomTable
          tableHeads={tableHeads}
          tableData={pressReleaseData?.data}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          page={page}
          setPage={setPage}
          total={pressReleaseData?.meta?.total}
          loading={get_press_release_loading}
        />
        <CustomModal
          open={openForm}
          handleClose={formOpenFunction}
          modalTitle="Create Press Release"
          modalSubtitle=""
          icon={<PersonAddIcon />}
          width={`60rem`}
        >
          <Register handleClose={formOpenFunction} />
        </CustomModal>
        <CustomModal
          open={openEdit}
          handleClose={editOpenFunction}
          modalTitle={`Update Press Release`}
          modalSubtitle=""
          icon={<PersonAddIcon />}
          width={`60rem`}
        >
          <Edit data={detail} handleClose={editOpenFunction} />
        </CustomModal>
        <CustomModal
          open={openView}
          handleClose={viewOpenFunction}
          modalTitle="Press Release Details"
          icon={<PersonIcon />}
          width={`40rem`}
        >
          <View data={detail} />
        </CustomModal>
        <CustomDeleteModal
          handleConfirm={handleConfirm}
          slug={detail?.slug}
          open={openDelete}
          isLoading={delete_press_release_loading}
          handleClose={deleteOpenFunction}
        />
        <CustomStatusModal
          open={openStatus}
          isLoading={press_release_status_loading}
          handleClose={statusOpenFunction}
          status={detail?.status == "active" ? "Active" : "Inactive"}
          id={detail?.slug}
          handleConfirm={handleStatusConfirm}
        />
      </Box>
    </>
  );
};

export default NBNSPressRelease;
