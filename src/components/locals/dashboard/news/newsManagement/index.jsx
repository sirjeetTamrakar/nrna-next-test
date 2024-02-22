import CustomApproveModal from "@/components/common/CustomModal/CustomApproveModal";
import CustomDeleteModal from "@/components/common/CustomModal/CustomDeleteModal";
import CustomModal from "@/components/common/CustomModal/CustomModal";
import CustomStatusModal from "@/components/common/CustomModal/CustomStatusModal";
import CustomPopover from "@/components/common/CustomPopover/CustomPopover";
import CustomTable from "@/components/common/table";
import { Roles } from "@/constants/RoleConstant";
import useToggle from "@/hooks/useToggle";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeNewsStatus,
  deleteNewsOrder,
  getCategory,
  getNews,
} from "../redux/actions";
import Edit from "./Edit";
// import { changeNewsStatus, deleteNews, getNews } from './redux/actions';
import Register from "./Register";
import SecondaryNav from "./SecondaryNav";
import { useStyles } from "./styles";

const NewsManagement = () => {
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
  const [filteredNews, setFilteredNews] = useState();
  const [allFilteredNews, setAllFilteredNews] = useState();
  const [selected, setSelected] = useState();
  const [search, setSearch] = useState("");
  const storedValueRole = localStorage.getItem("nccRole");
  const storedValueID = Number(localStorage.getItem("nccRoleID"));

  const {
    newsData,
    newsOrderData,
    categoryData,
    get_news_loading,
    news_status_loading,
    delete_news_loading,
  } = useSelector((state) => state.news);

  const { user, admin_role_details, admin_ncc_id_details } = useSelector(
    (state) => state.auth
  );

  const tableHeads = [
    { title: "S.N.", type: "Index", minWidth: 20 },

    {
      title: "News",
      minWidth: 250,
      field: "title",
    },

    {
      title: "News order",
      minWidth: 120,
      field: (row) => {
        return (
          <Box>
            <Typography variant="body2">
              {row?.news_order?.order_number}
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
    }
    dispatch(deleteNewsOrder(slug, deleteOpenFunction, typeData));
  };

  const handleStatusConfirm = (slug) => {
    const finalData = {
      slug: slug,
      status: detail?.status === 0 ? 1 : 0,
      _method: "PATCH",
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
    }
    dispatch(changeNewsStatus(finalData, statusOpenFunction, typeData));
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

  const filterDataMember = {
    page: page + 1,
    pagination_limit: rowsPerPage,
    type: "member",
    id: user?.id,
  };
  const filterDataNCC = {
    page: page + 1,
    pagination_limit: rowsPerPage,
    type: "ncc",
    id: user?.ncc?.id,
  };
  const filterDataHome = {
    // if(user?.role_name === "superadmin" && admin_role_details === "admin"){}
    page: page + 1,
    pagination_limit: 100,
    // user_id: user?.id
  };
  const filterDataHomeAdminNcc = {
    page: page + 1,
    pagination_limit: rowsPerPage,
    type: "ncc",
    id: storedValueID,
  };

  const filterDataHomeAll = {
    // if(user?.role_name === "superadmin" && admin_role_details === "admin"){}
    page: page + 1,
    pagination_limit: 100,
  };

  useEffect(() => {
    if (user?.role_name === "ncc") {
      dispatch(getNews(filterDataNCC));
    } else if (user?.role_name == "superadmin" && storedValueRole === "ncc") {
      dispatch(getNews(filterDataHomeAdminNcc));
    } else if (user?.role_name == "superadmin" && storedValueRole === "admin") {
      dispatch(getNews(filterDataHome));
    } else {
      dispatch(getNews());
    }
    // dispatch(getNews());
    dispatch(getCategory());
  }, []);

  useEffect(() => {
    if (newsData) {
      const newNews = newsData?.data?.filter(
        (list) =>
          list?.title?.toLowerCase()?.includes(search?.toLowerCase()) &&
          list?.news_category_id == Number(selected)
      );
      setFilteredNews(selected === "ALL" ? newsData?.data : newNews);
    }
  }, [search, newsData, selected, categoryData]);

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
          <Box>News Management</Box>
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            display="flex"
            onClick={formOpenFunction}
          >
            Add News Order
          </Button>
        </Box>
        <CustomTable
          tableHeads={tableHeads}
          tableData={filteredNews}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          page={page}
          setPage={setPage}
          total={filteredNews?.length}
          // total={newsData?.meta?.total}
          loading={get_news_loading ? true : false}
        />
        <CustomModal
          open={openForm}
          handleClose={formOpenFunction}
          modalTitle="Create News Order"
          modalSubtitle=""
          icon={<PersonAddIcon />}
          width={`40rem`}
        >
          <Register handleClose={formOpenFunction} selected={selected} />
        </CustomModal>
        <CustomModal
          open={openEdit}
          handleClose={editOpenFunction}
          modalTitle={`Update News order`}
          modalSubtitle=""
          icon={<PersonAddIcon />}
          width={`40rem`}
        >
          <Edit data={detail} handleClose={editOpenFunction} />
        </CustomModal>
        {/* <CustomModal
          open={openView}
          handleClose={viewOpenFunction}
          modalTitle="News Details"
          icon={<PersonIcon />}
          width={`40rem`}>
          <View data={detail} />
        </CustomModal> */}
        <CustomDeleteModal
          handleConfirm={handleConfirm}
          slug={detail?.slug}
          open={openDelete}
          isLoading={delete_news_loading}
          handleClose={deleteOpenFunction}
        />
        <CustomStatusModal
          open={openStatus}
          isLoading={news_status_loading}
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

export default NewsManagement;
