import CustomDeleteModal from "@/components/common/CustomModal/CustomDeleteModal";
import CustomModal from "@/components/common/CustomModal/CustomModal";
import CustomPopover from "@/components/common/CustomPopover/CustomPopover";
import CustomTable from "@/components/common/table";
import useToggle from "@/hooks/useToggle";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Box, Button } from "@mui/material";
import { Roles } from "constants/RoleConstant";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Edit from "./Edit";
import Register from "./Register";
import { deleteDepartment, getDepartment } from "./redux/actions";
import { useStyles } from "./styles";

const Department = () => {
  const dispatch = useDispatch();
  const [openForm, formOpenFunction] = useToggle(false);
  const [openEdit, editOpenFunction] = useToggle(false);
  const [openDelete, deleteOpenFunction] = useToggle(false);
  const [detail, setDetail] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const classes = useStyles();

  const { departmentData, get_department_loading, delete_department_loading } =
    useSelector((state) => state.department);
  const { user, admin_ncc_id_details, admin_role_details } = useSelector(
    (state) => state.auth
  );

  const tableHeads = [
    { title: "S.N.", type: "Index", minWidth: 20 },

    {
      title: "Department Name",
      minWidth: 400,
      field: "title",
    },

    {
      title: "Actions",
      minWidth: 85,
      field: (row) => {
        return (
          <CustomPopover ButtonComponent={<MoreVertIcon />}>
            <ul className={classes.listWrapper}>
              <li onClick={() => handleEdit(row)}>Edit Team </li>
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
    } else {
      typeData = { page: page + 1, pagination_limit: rowsPerPage };
    }
    dispatch(deleteDepartment(slug, deleteOpenFunction, typeData));
  };

  const handleEdit = (row) => {
    setDetail(row);
    editOpenFunction();
  };

  const handleDelete = (row) => {
    setDetail(row);
    deleteOpenFunction();
  };

  const refetch = () => {
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
    dispatch(getDepartment(typeData));
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
          <Box>Our Department</Box>
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            display="flex"
            onClick={formOpenFunction}
          >
            Add Department
          </Button>
        </Box>
        <CustomTable
          tableHeads={tableHeads}
          tableData={departmentData?.data}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          page={page}
          setPage={setPage}
          total={departmentData?.meta?.total}
          loading={get_department_loading}
        />
        <CustomModal
          open={openForm}
          handleClose={formOpenFunction}
          modalTitle="Create Department"
          modalSubtitle=""
          icon={<PersonAddIcon />}
          width={`25rem`}
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

        <CustomDeleteModal
          handleConfirm={handleConfirm}
          slug={detail?.slug}
          open={openDelete}
          isLoading={delete_department_loading}
          handleClose={deleteOpenFunction}
        />
      </Box>
    </>
  );
};

export default Department;
