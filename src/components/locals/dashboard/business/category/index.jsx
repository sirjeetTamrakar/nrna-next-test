import logo from "@/assets/images/nrna.png";
import CustomDeleteModal from "@/components/common/CustomModal/CustomDeleteModal";
import CustomModal from "@/components/common/CustomModal/CustomModal";
import CustomStatusModal from "@/components/common/CustomModal/CustomStatusModal";
import CustomPopover from "@/components/common/CustomPopover/CustomPopover";
import CustomTable from "@/components/common/table";
import useToggle from "@/hooks/useToggle";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCategoryStatus,
  deleteCategory,
  getCategory,
} from "../redux/actions";
import Edit from "./Edit";
import Register from "./Register";
import { useStyles } from "./styles";

const Category = () => {
  const dispatch = useDispatch();
  const [openForm, formOpenFunction] = useToggle(false);
  const [openEdit, editOpenFunction] = useToggle(false);
  const [openDelete, deleteOpenFunction] = useToggle(false);
  const [openStatus, statusOpenFunction] = useToggle(false);
  const [detail, setDetail] = useState();
  const [page, setPage] = useState();
  const [rowsPerPage, setRowsPerPage] = useState();
  const classes = useStyles();

  const {
    categoryData,
    get_category_loading,
    category_status_loading,
    delete_category_loading,
  } = useSelector((state) => state.business);

  useEffect(() => {
    dispatch(getCategory());
  }, []);

  const tableHeads = [
    { title: "S.N.", type: "Index", minWidth: 20 },

    {
      title: "Title",
      minWidth: 250,
      field: (row) => {
        return (
          <Box>
            <Typography variant="body2">{row?.title}</Typography>
          </Box>
        );
      },
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
      title: "Parent category",
      minWidth: 250,
      field: (row) => {
        const findCategoryTitle = categoryData?.find(
          (item) => item?.id === Number(row?.title)
        );
        return (
          <Box>
            <Typography variant="body2">
              {row?.title ? findCategoryTitle?.title : "-"}
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
            {row?.status === "Active" ? (
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
              <li onClick={() => handleEdit(row)}>Edit Category </li>
              <li onClick={() => handleDelete(row)}>Delete</li>
            </ul>
          </CustomPopover>
        );
      },
    },
  ];

  const category = [
    {
      title: "IT Company",
      feature_image: logo,
      status: "Active",
      slug: "it_company",
    },
  ];

  const handleConfirm = (slug) => {
    dispatch(deleteCategory(slug, deleteOpenFunction));
  };

  const handleStatusConfirm = (slug) => {
    const finalData = {
      slug: slug,
      status: detail?.status === "Active" ? "inactive" : "active",
      _method: "PATCH",
    };
    dispatch(changeCategoryStatus(finalData, statusOpenFunction));
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
          <Box>Business Category</Box>
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
        <CustomStatusModal
          open={openStatus}
          isLoading={category_status_loading}
          handleClose={statusOpenFunction}
          status={detail?.status === "Active" ? "Active" : "Inactive"}
          id={detail?.slug}
          handleConfirm={handleStatusConfirm}
        />
      </Box>
    </>
  );
};

export default Category;
