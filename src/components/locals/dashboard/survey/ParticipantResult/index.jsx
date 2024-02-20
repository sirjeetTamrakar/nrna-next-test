import CustomTable from "@/components/common/table";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getParticipants, getParticipantsResult } from "../redux/actions";
const ParticipantResult = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { participant_id } = useParams();
  const [page, setPage] = useState();
  const [rowsPerPage, setRowsPerPage] = useState();
  const [name, setName] = useState();
  const { participant_result, participant_result_loading, participants } =
    useSelector((state) => state.question);
  const tableHeads = [
    { title: "S.N.", type: "Index", minWidth: 20 },

    {
      title: "Question",
      minWidth: 150,
      field: (row) => {
        return <Typography variant="body2">{row?.question}</Typography>;
      },
    },
    {
      title: "Selected Option",
      minWidth: 100,
      field: (row) => {
        const selectedOption = row?.options?.find(
          (list) => list?.id == row?.selected_option_id
        );
        return (
          <Typography variant="body2">
            {selectedOption?.option ? (
              selectedOption?.option
            ) : (
              <Typography variant="body2" color="error">
                Not Attempted
              </Typography>
            )}
          </Typography>
        );
      },
    },
  ];

  useEffect(() => {
    participant_id &&
      dispatch(
        getParticipantsResult(location?.state?.state?.slug, participant_id)
      );
    if (participant_id) {
      const participantName = participants?.data?.find(
        (list) => list?.id == participant_id
      )?.first_name;
      setName(participantName);
    }
  }, [participant_id]);

  useEffect(() => {
    if (participants?.length == 0) {
      dispatch(getParticipants());
    }
  }, []);

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
          <Box display="flex" columnGap={2}>
            <ArrowBackIcon
              style={{ cursor: "pointer", color: "#2196f3" }}
              onClick={() => navigate(-1)}
            />
            Participant Survey Result of{" "}
            <Typography color="primary" fontWeight="600">
              {name}
            </Typography>
          </Box>
        </Box>
        <CustomTable
          tableHeads={tableHeads}
          tableData={participant_result}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          page={page}
          setPage={setPage}
          total={30}
          loading={participant_result_loading}
        />
      </Box>
    </>
  );
};

export default ParticipantResult;
