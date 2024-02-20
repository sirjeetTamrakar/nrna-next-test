import ExcelDownloadButton from "@/components/common/CustomExcelFileDownload";
import CustomTable from "@/components/common/table";
import { changeDateFormat } from "@/utils/dateUtils";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getParticipants } from "../redux/actions";

const Participants = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [page, setPage] = useState();
  const [rowsPerPage, setRowsPerPage] = useState();
  const { participants, participants_loading } = useSelector(
    (state) => state.question
  );
  const tableHeads = [
    { title: "S.N.", type: "Index", minWidth: 20 },

    {
      title: "Name",
      minWidth: 150,
      field: (row) => {
        return <Typography variant="body2">{row?.first_name}</Typography>;
      },
    },
    {
      title: "Email/Phone",
      minWidth: 100,
      field: (row) => {
        return (
          <Box>
            <Typography variant="body2">{row?.email}</Typography>
            <Typography variant="subtitle1">{row?.phone}</Typography>
          </Box>
        );
      },
    },

    {
      title: "Country of residence",
      minWidth: 120,
      field: (row) => {
        return (
          <Typography variant="body2">{` ${row?.country_of_residence}`}</Typography>
        );
      },
    },
    {
      title: "Participated Date",
      minWidth: 120,
      field: (row) => {
        return (
          <Typography variant="subtitle1">
            {changeDateFormat(row?.created_at)}
          </Typography>
        );
      },
    },
    {
      title: "Survey",
      minWidth: 100,
      field: (row) => {
        return (
          <Box>
            <Button
              variant="contained"
              color="success"
              sx={{ width: "100px" }}
              onClick={() =>
                navigate(`/dashboard/survey/result/participants/${row?.id}`, {
                  state: location,
                })
              }
            >
              View
            </Button>
          </Box>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(getParticipants(location?.state?.slug));
  }, []);

  return (
    <>
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
            // alignItems: 'center',
            marginBottom: "15px",
          }}
        >
          <ArrowBackIcon
            style={{
              cursor: "pointer",
              color: "#2196f3",
              marginBottom: "20px",
            }}
            onClick={() => navigate(-1)}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>Survey Participants</Box>
            <Box sx={{ marginRight: "20px" }}>
              <ExcelDownloadButton
                data={participants?.data}
                fileName="Participants Data"
              />
            </Box>
          </Box>
        </Box>
        <CustomTable
          tableHeads={tableHeads}
          tableData={participants?.data}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          page={page}
          setPage={setPage}
          loading={participants_loading}
          total={participants?.data?.length}
        />
      </Box>
    </>
  );
};

export default Participants;
