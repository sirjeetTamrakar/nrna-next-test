import CustomDeleteModal from "@/components/common/CustomModal/CustomDeleteModal";
import CustomModal from "@/components/common/CustomModal/CustomModal";
import CustomPopover from "@/components/common/CustomPopover/CustomPopover";
import CustomTable from "@/components/common/table";
import useToggle from "@/hooks/useToggle";
import { changeDateFormat } from "@/utils/dateUtils";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonIcon from "@mui/icons-material/Person";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import View from "./View";
import { deleteAdvice, getAdvice } from "./redux/actions";
import { useStyles } from "./styles";

const Advice = () => {
  const dispatch = useDispatch();
  const [openView, viewOpenFunction] = useToggle(false);

  const [openDelete, deleteOpenFunction] = useToggle(false);
  const [detail, setDetail] = useState();
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // useEffect(() => {
  //   dispatch(getAdvice());
  // }, []);

  const { adviceData, get_advice_loading, delete_advice_loading } = useSelector(
    (state) => state.advice
  );

  const tableHeads = [
    { title: "S.N.", type: "Index", minWidth: 20 },

    {
      title: "Advice",
      minWidth: 250,
      field: (row) => {
        return (
          <Box>
            <Typography variant="body2">
              {row?.advice?.length > 79
                ? `${row?.advice?.substring(0, 80)}...`
                : row?.advice}
            </Typography>
          </Box>
        );
      },
    },
    {
      title: "Name",
      minWidth: 100,

      field: "name",
    },
    {
      title: "Email",
      minWidth: 100,

      field: "email",
    },
    {
      title: "Date",
      minWidth: 100,

      field: (row) => {
        return changeDateFormat(row?.created_at);
      },
    },

    {
      title: "Actions",
      minWidth: 85,
      field: (row) => {
        return (
          <CustomPopover ButtonComponent={<MoreVertIcon />}>
            <ul className={classes.listWrapper}>
              <li onClick={() => handleView(row)}>View Details</li>
              <li onClick={() => handleDelete(row)}>Delete</li>
            </ul>
          </CustomPopover>
        );
      },
    },
  ];

  const handleView = (row) => {
    setDetail(row);
    viewOpenFunction();
  };

  const handleDelete = (row) => {
    setDetail(row);
    deleteOpenFunction();
  };

  const handleConfirm = (slug) => {
    dispatch(deleteAdvice(slug, deleteOpenFunction));
  };

  const refetch = () => {
    const data = { page: page + 1, pagination_limit: rowsPerPage };
    dispatch(getAdvice(data));
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
          <Box>Advice</Box>
        </Box>
        <CustomTable
          tableHeads={tableHeads}
          tableData={adviceData?.data}
          loading={get_advice_loading ? true : false}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          page={page}
          setPage={setPage}
          total={adviceData?.meta?.total}
        />
        <CustomModal
          open={openView}
          handleClose={viewOpenFunction}
          modalTitle={`Advice Details`}
          // modalSubtitle="Get full detail"
          icon={<PersonIcon />}
          width={`40rem`}
        >
          <View data={detail} />
        </CustomModal>
        <CustomDeleteModal
          open={openDelete}
          handleClose={deleteOpenFunction}
          handleConfirm={handleConfirm}
          slug={detail?.id}
          isLoading={delete_advice_loading}
        />
      </Box>
    </>
  );
};

export default Advice;
