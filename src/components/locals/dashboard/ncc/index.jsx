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
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Edit from "./Edit";
import Register from "./Register";
import View from "./View";
import ViewMembersTable from "./ViewMembersTable";
import { changeNCCStatus, deleteNCC, getNCC } from "./redux/actions";
import { useStyles } from "./styles";

const NCC = () => {
  const dispatch = useDispatch();
  const [openForm, formOpenFunction] = useToggle(false);
  const [openEdit, editOpenFunction] = useToggle(false);
  const [openMembers, openMembersFunction] = useToggle(false);
  const [openDelete, deleteOpenFunction] = useToggle(false);
  const [openStatus, statusOpenFunction] = useToggle(false);
  const [openView, viewOpenFunction] = useToggle(false);
  const [detail, setDetail] = useState();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const classes = useStyles();

  // useEffect(() => {
  //   dispatch(getNCC());
  // }, []);

  const tableHeads = [
    { title: "S.N.", type: "Index", minWidth: 20 },

    {
      title: "Country",
      minWidth: 100,

      field: "country_name",
    },
    {
      title: "Member",
      minWidth: 100,

      field: (row) => {
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleShowMembers(row)}
          >
            {row?.members?.length}
          </Button>
        );
      },
    },

    {
      title: "Committee",
      minWidth: 100,

      field: (row) => {
        return (
          <Button variant="contained" color="primary">
            {row?.committee}
          </Button>
        );
      },
    },
    {
      title: "Created At",
      minWidth: 80,
      field: (row) => {
        return changeDateFormat(row?.created_at);
      },
    },

    {
      title: "Status",
      minWidth: 100,
      field: (row) => {
        return (
          <Box>
            {row?.status == "1" ? (
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
              <li onClick={() => handleEdit(row)}>Edit NCC </li>
              <li onClick={() => handleView(row)}>View Details</li>
              <li onClick={() => handleDelete(row)}>Delete</li>
            </ul>
          </CustomPopover>
        );
      },
    },
  ];

  const { nccData, get_ncc_loading } = useSelector((state) => state.ncc);

  // const refetch = () => {
  //   dispatch(getNCC());
  // };

  const handleConfirm = (slug) => {
    dispatch(deleteNCC(slug, refetch));
    deleteOpenFunction();
  };

  const handleEdit = (row) => {
    setDetail(row);
    editOpenFunction();
  };

  const handleShowMembers = (row) => {
    setDetail(row);
    openMembersFunction();
  };

  const handleStatusConfirm = (slug) => {
    const finalData = {
      slug: slug,
      status: detail?.status == 0 ? 1 : 0,
      _method: "PATCH",
    };
    dispatch(changeNCCStatus(finalData, statusOpenFunction));
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
    const data = { page: page + 1, pagination_limit: rowsPerPage };
    dispatch(getNCC(data));
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
          <Box>NCC</Box>
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            display="flex"
            onClick={formOpenFunction}
          >
            Add NCC
          </Button>
        </Box>
        <CustomTable
          tableHeads={tableHeads}
          tableData={nccData?.data}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          page={page}
          setPage={setPage}
          total={nccData?.meta?.total}
          loading={get_ncc_loading ? true : false}
        />
        <CustomModal
          open={openForm}
          handleClose={formOpenFunction}
          modalTitle="Create NCC"
          modalSubtitle=""
          icon={<PersonAddIcon />}
          width={`40rem`}
        >
          <Register handleClose={formOpenFunction} />
        </CustomModal>
        <CustomModal
          open={openEdit}
          handleClose={editOpenFunction}
          modalTitle={`Update NCC`}
          modalSubtitle=""
          icon={<PersonAddIcon />}
          width={`40rem`}
        >
          <Edit data={detail} handleClose={editOpenFunction} />
        </CustomModal>
        <CustomModal
          open={openView}
          handleClose={viewOpenFunction}
          modalTitle={`NCC Details`}
          icon={<PersonIcon />}
          width={`40rem`}
        >
          <View data={detail} />
        </CustomModal>
        <CustomModal
          open={openMembers}
          handleClose={openMembersFunction}
          modalTitle={`NCC`}
          padding
          icon={<PersonIcon />}
          width={`60rem`}
        >
          {/* <ViewMembers data={detail} /> */}
          <ViewMembersTable countrySlug={detail?.country_name} />
        </CustomModal>
        <CustomDeleteModal
          handleConfirm={handleConfirm}
          slug={detail?.slug}
          open={openDelete}
          handleClose={deleteOpenFunction}
        />
        <CustomStatusModal
          open={openStatus}
          handleClose={statusOpenFunction}
          status={detail?.status == "1" ? "Active" : "Inactive"}
          id={detail?.slug}
          handleConfirm={handleStatusConfirm}
        />
      </Box>
    </>
  );
};

export default NCC;
