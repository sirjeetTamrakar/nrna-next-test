import CustomTable from "@/components/common/table";
import { getPublicDownload } from "@/components/locals/dashboard/downloads/redux/actions";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { Box, Button } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Downloads = () => {
  // const { settings } = useSelector((state) => state.homepage);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useDispatch();
  const { downloadData, get_download_loading } = useSelector(
    (state) => state.download
  );

  useEffect(() => {
    // dispatch(getDownload({type:}));
    dispatch(getPublicDownload({}));
  }, []);

  const tableHeads = [
    { title: "S.N.", type: "Index", minWidth: 20 },

    {
      title: "Title",
      minWidth: 200,
      field: (row) => {
        return (
          <Box
            sx={{
              "& a": {
                textDecoration: "none",
                color: (theme) => theme.palette.text.main,
              },
            }}
          >
            <Link
              href={`${row?.id}`}
              state={{
                title: row?.title,
                file_src: row?.file,
                updatedDate: row?.updated_at,
                description: row?.description,
              }}
            >
              {row?.title}
            </Link>
          </Box>
        );
      },
    },
    {
      title: "Action",
      minWidth: 200,
      field: (row) => {
        return (
          <>
            <a
              href={row.file}
              target="_blank"
              download={"download.pdf"}
              rel="noreferrer"
            >
              <Button
                variant="text"
                sx={{
                  p: "10px !important",
                  ml: "-10px",
                  color: (theme) => theme.palette.text.main,
                }}
                startIcon={<FileDownloadOutlinedIcon />}
              >
                Download
              </Button>
            </a>
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className="main_content">
        <section className="all_events">
          <div className="container">
            <div className="about_title" style={{ fontSize: "20px" }}>
              Downloads
            </div>
            {downloadData?.data?.length ? (
              <CustomTable
                tableHeads={tableHeads}
                tableData={downloadData?.data}
                loading={get_download_loading}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                page={page}
                setPage={setPage}
                total={downloadData?.data?.length}
              />
            ) : (
              <div className="col-md-12 mt-5 mb-5">
                <h3 className="text-center">No resources available</h3>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Downloads;
