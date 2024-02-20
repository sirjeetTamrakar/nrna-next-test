import CustomDeleteModal from "@/components/common/CustomModal/CustomDeleteModal";
import CustomModal from "@/components/common/CustomModal/CustomModal";
import CustomPopover from "@/components/common/CustomPopover/CustomPopover";
import CustomTable from "@/components/common/table";
import useToggle from "@/hooks/useToggle";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, getCategory } from "../redux/actions";
import Edit from "./Edit";
import Register from "./Register";
import { useStyles } from "./styles";

const Category = () => {
  const dispatch = useDispatch();
  const [openForm, formOpenFunction] = useToggle(false);
  const [openEdit, editOpenFunction] = useToggle(false);
  const [openDelete, deleteOpenFunction] = useToggle(false);
  const [detail, setDetail] = useState();
  const [page, setPage] = useState();
  const [rowsPerPage, setRowsPerPage] = useState();
  const classes = useStyles();

  const { categoryData, get_category_loading, delete_category_loading } =
    useSelector((state) => state.business);

  useEffect(() => {
    dispatch(getCategory());
  }, []);

  const tableHeads = [
    { title: "S.N.", type: "Index", minWidth: 20 },

    {
      title: "Title",
      minWidth: 250,
      field: "title",
    },
    {
      title: "Image",
      minWidth: 120,
      field: (row) => {
        return (
          <Box>
            <img src={row?.image} height="40px" width="40px" />
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
              <li onClick={() => handleEdit(row)}>Edit Category </li>
              <li onClick={() => handleDelete(row)}>Delete</li>
            </ul>
          </CustomPopover>
        );
      },
    },
  ];

  const handleConfirm = (slug) => {
    dispatch(deleteCategory(slug, deleteOpenFunction));
  };

  const handleEdit = (row) => {
    setDetail(row);
    editOpenFunction();
  };

  const handleDelete = (row) => {
    setDetail(row);
    deleteOpenFunction();
  };

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
          <Box>Events Category</Box>
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            display="flex"
            onClick={formOpenFunction}
          >
            Add Category
          </Button>
        </Box>
        <CustomTable
          tableHeads={tableHeads}
          tableData={categoryData}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          page={page}
          setPage={setPage}
          total={30}
          loading={get_category_loading}
        />
        <CustomModal
          open={openForm}
          handleClose={formOpenFunction}
          modalTitle="Create Business Category"
          modalSubtitle=""
          icon={<PersonAddIcon />}
          width={`30rem`}
        >
          <Register handleClose={formOpenFunction} />
        </CustomModal>
        <CustomModal
          open={openEdit}
          handleClose={editOpenFunction}
          modalTitle={`Update Category`}
          modalSubtitle=""
          icon={<PersonAddIcon />}
          width={`30rem`}
        >
          <Edit data={detail} handleClose={editOpenFunction} />
        </CustomModal>

        <CustomDeleteModal
          handleConfirm={handleConfirm}
          slug={detail?.slug}
          open={openDelete}
          isLoading={delete_category_loading}
          handleClose={deleteOpenFunction}
        />
      </Box>
    </>
  );
};

export default Category;
