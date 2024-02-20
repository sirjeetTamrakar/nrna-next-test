import CustomModal from "@/components/common/CustomModal/CustomModal";
import CustomPopover from "@/components/common/CustomPopover/CustomPopover";
import CustomTable from "@/components/common/table";
import useToggle from "@/hooks/useToggle";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBusiness, getCategory } from "../redux/actions";
// import { changeNewsStatus, deleteNews, getNews } from './redux/actions';
import Register from "./Register";
import SecondaryNav from "./SecondaryNav";
import { useStyles } from "./styles";

const BusinessManagement = () => {
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
  const [filteredBusiness, setFilteredBusiness] = useState();
  const [allFilteredBusiness, setAllFilteredBusiness] = useState();
  const [selected, setSelected] = useState();
  const [search, setSearch] = useState("");

  const {
    businessData,
    businessOrderData,
    categoryData,
    get_business_loading,
    business_status_loading,
    delete_business_loading,
  } = useSelector((state) => state.business);

  const { user } = useSelector((state) => state.auth);

  const tableHeads = [
    { title: "S.N.", type: "Index", minWidth: 20 },

    {
      title: "Business",
      minWidth: 250,
      field: (row) => {
        return (
          <Box>
            <Typography variant="body2">{row?.fullname}</Typography>
          </Box>
        );
      },
    },

    {
      title: "Business order",
      minWidth: 120,
      field: (row) => {
        return (
          <Box>
            <Typography variant="body2">
              {row?.business_order?.order_number}
            </Typography>
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
              {/* <li onClick={() => handleEdit(row)}>Edit News </li> */}
              {/* <li onClick={() => handleView(row)}>View Details</li> */}
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

  // const handleConfirm = (slug) => {
  //   let typeData;
  //   if (user?.role_name == Roles?.Member) {
  //     typeData = { type: 'member', id: user?.id, page: 1, pagination_limit: 10 };
  //   } else if (user?.role_name == Roles?.NCC) {
  //     typeData = { type: 'ncc', id: user?.ncc?.id, page: 1, pagination_limit: 10 };
  //   }
  //   dispatch(deleteNewsOrder(slug, deleteOpenFunction, typeData));
  // };

  // const handleStatusConfirm = (slug) => {
  //   const finalData = {
  //     slug: slug,
  //     status: detail?.status === 0 ? 1 : 0,
  //     _method: 'PATCH'
  //   };
  //   let typeData;
  //   if (user?.role_name == Roles?.Member) {
  //     typeData = { type: 'member', id: user?.id, page: 1, pagination_limit: 10 };
  //   } else if (user?.role_name == Roles?.NCC) {
  //     typeData = { type: 'ncc', id: user?.ncc?.id, page: 1, pagination_limit: 10 };
  //   }
  //   dispatch(changeNewsStatus(finalData, statusOpenFunction, typeData));
  // };

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
  //     dispatch(getNews(data));
  //   } else if (user?.role_name == Roles?.NCC) {
  //     const data = {
  //       page: page + 1,
  //       pagination_limit: rowsPerPage,
  //       type: 'ncc',
  //       id: user?.ncc?.id
  //     };
  //     dispatch(getNews(data));
  //   } else {
  //     const data = { page: page + 1, pagination_limit: rowsPerPage };
  //     dispatch(getNews(data));
  //   }
  // };

  // useEffect(() => {
  //   user && refetch();
  // }, [page, rowsPerPage, user]);

  useEffect(() => {
    setSelected(
      location?.state ? location?.state : selected ? selected : "ALL"
    );
  }, [location?.state, categoryData]);

  useEffect(() => {
    dispatch(getBusiness());
    dispatch(getCategory());
  }, []);

  // useEffect(() => {
  //   if (businessData) {
  //     const allNewBusiness = businessData?.data?.filter((list) =>
  //       list?.title?.toLowerCase()?.includes(search?.toLowerCase())
  //     );
  //     setAllFilteredBusiness(allNewBusiness);
  //   }
  // }, [search, businessData]);

  useEffect(() => {
    if (businessData) {
      const newBusiness = businessData?.data?.filter(
        (list) =>
          list?.fullname?.toLowerCase()?.includes(search?.toLowerCase()) &&
          Number(list?.business_category_id) == Number(selected)
      );
      setFilteredBusiness(
        selected === "ALL" ? businessData?.data : newBusiness
      );
    }
  }, [search, businessData?.data, selected, categoryData]);

  return (
    <>
      <Box>
        <Box sx={{ marginBottom: "20px" }}>
          <SecondaryNav
            category={categoryData}
            setSelected={setSelected}
            selected={selected}
            setSearch={setSearch}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <Box>Business Management</Box>
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            display="flex"
            onClick={formOpenFunction}
          >
            Add Business Order
          </Button>
        </Box>
        <CustomTable
          tableHeads={tableHeads}
          tableData={filteredBusiness}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          page={page}
          setPage={setPage}
          total={filteredBusiness?.length}
          // total={newsData?.meta?.total}
          loading={get_business_loading ? true : false}
        />
        <CustomModal
          open={openForm}
          handleClose={formOpenFunction}
          modalTitle="Create Business Order"
          modalSubtitle=""
          icon={<PersonAddIcon />}
          width={`40rem`}
        >
          <Register handleClose={formOpenFunction} selected={selected} />
        </CustomModal>
        {/* <CustomModal
          open={openEdit}
          handleClose={editOpenFunction}
          modalTitle={`Update Business order`}
          modalSubtitle=""
          icon={<PersonAddIcon />}
          width={`40rem`}>
          <Edit data={detail} handleClose={editOpenFunction} />
        </CustomModal> */}
        {/* <CustomModal
          open={openView}
          handleClose={viewOpenFunction}
          modalTitle="News Details"
          icon={<PersonIcon />}
          width={`40rem`}>
          <View data={detail} />
        </CustomModal> */}
        {/* <CustomDeleteModal
          handleConfirm={handleConfirm}
          slug={detail?.slug}
          open={openDelete}
          isLoading={delete_business_loading}
          handleClose={deleteOpenFunction}
        />
        <CustomStatusModal
          open={openStatus}
          isLoading={business_status_loading}
          handleClose={statusOpenFunction}
          status={detail?.status == 1 ? 'Active' : 'Inactive'}
          id={detail?.slug}
          handleConfirm={handleStatusConfirm}
        />
        <CustomApproveModal open={openApprove} handleClose={approveOpenFunction} row={detail} /> */}
      </Box>
    </>
  );
};

export default BusinessManagement;
