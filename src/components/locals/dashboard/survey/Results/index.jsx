import CollapseTable from "@/components/common/CollapseableTable";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getSurveyResult } from "../redux/actions";
import OverallResult from "./OverallResult";
import { useStyles } from "./styles";

const Results = () => {
  const [page, setPage] = useState();
  const [rowsPerPage, setRowsPerPage] = useState();
  const { result, result_loading } = useSelector((state) => state.question);
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState();
  const [singleSurveyQuestion, setSingleSurveyQuestion] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const tableHeads = [
    { title: "S.N.", type: "Index", minWidth: 20 },

    {
      title: "Question",
      minWidth: 300,

      field: "question",
    },
    {
      title: "Attempted",
      minWidth: "100",
      field: (row) => {
        return (
          <Typography color="primary" variant="h6">
            {row?.total}
          </Typography>
        );
      },
    },
  ];

  useEffect(() => {
    if (result) {
      const newArray = result?.filter(
        (item) => Number(item?.survey_id) === location?.state?.id
      );
      setSingleSurveyQuestion(newArray);
    }
  }, [result]);

  useEffect(() => {
    dispatch(getSurveyResult());
  }, []);

  useEffect(() => {
    const arrangedData = singleSurveyQuestion?.map((list) => {
      const value = list?.options?.reduce(
        (acc, value) => acc + Number(value?.survey_answers_count),
        0
      );
      return { ...list, total: value || 0 };
    });
    setTableData(arrangedData);
  }, [singleSurveyQuestion]);

  return (
    <>
      <Box>
        <ArrowBackIcon
          style={{ cursor: "pointer", color: "#2196f3", marginBottom: "20px" }}
          onClick={() => navigate(-1)}
        />
        <OverallResult />
        <CollapseTable
          tableHeads={tableHeads}
          tableData={tableData}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          loading={result_loading}
          page={page}
          setPage={setPage}
          total={30}
          ChildComponent={ChildComponent}
        />
      </Box>
    </>
  );
};

export default Results;

const ChildComponent = ({ row }) => {
  const classes = useStyles();
  const getPercentage = (count) => {
    if (row?.total) {
      const calculatedValue = (count / row?.total) * 100;
      return calculatedValue?.toFixed(2);
    } else {
      return 0;
    }
  };
  return (
    <Box className={classes.childRoot}>
      {row?.options?.map((list, index) => (
        <Box
          className={classes.childList}
          style={{
            background: `linear-gradient(90deg, #a9e2ff ${getPercentage(
              list?.survey_answers_count
            )}%, transparent ${getPercentage(list?.survey_answers_count)}% )`,
          }}
          key={index}
        >
          <Box display="flex" alignItems="center" columnGap="15px">
            <Box className={classes.count}>{list?.survey_answers_count}</Box>
            {list?.option}
          </Box>
          <Box className={classes.count}>
            {getPercentage(list?.survey_answers_count)} %
          </Box>
        </Box>
      ))}
    </Box>
  );
};
