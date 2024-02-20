import CustomDeleteModal from "@/components/common/CustomModal/CustomDeleteModal";
import CustomModal from "@/components/common/CustomModal/CustomModal";
import CustomStatusModal from "@/components/common/CustomModal/CustomStatusModal";
import CustomPopover from "@/components/common/CustomPopover/CustomPopover";
import CustomTable from "@/components/common/table";
import useToggle from "@/hooks/useToggle";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEmailTemplate,
  emailTemplateRemoveStatus,
  emailTemplateSetStatus,
  getEmailTemplate,
} from "../redux/actions";
import Edit from "./Edit";
import Register from "./Register";
import View from "./View";
import { useStyles } from "./styles";

const BusinessTemplate = () => {
  const dispatch = useDispatch();
  const [openForm, formOpenFunction] = useToggle(false);
  const [openEdit, editOpenFunction] = useToggle(false);
  const [openDelete, deleteOpenFunction] = useToggle(false);
  const [openStatus, statusOpenFunction] = useToggle(false);
  const [openView, viewOpenFunction] = useToggle(false);
  const [detail, setDetail] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const classes = useStyles();
  const { businessData } = useSelector((state) => state.business);
  const {
    email_templateData,
    get_email_template_loading,
    delete_email_template_loading,
    email_template_status_loading,
  } = useSelector((state) => state.emailTemplate);
  const { user, admin_ncc_id_details, admin_role_details } = useSelector(
    (state) => state.auth
  );

  const tableHeads = [
    { title: "S.N.", type: "Index", minWidth: 20 },

    {
      title: "Template Title",
      minWidth: 250,
      field: "title",
    },
    {
      title: "Business",
      minWidth: 250,
      field: (row) => {
        return (
          <Box>
            <Typography variant="body2">{row?.business?.fullname}</Typography>
          </Box>
        );
      },
    },
    {
      title: "Template decription",
      minWidth: 250,
      field: (row) => {
        return (
          <Box>
            <div
              dangerouslySetInnerHTML={{
                __html: row?.description?.substring(0, 70),
              }}
            />
          </Box>
        );
      },
    },

    {
      title: "Default Template",
      minWidth: 250,
      field: (row) => {
        return (
          <Box>
            {row?.default_description === "true" ? (
              <Button
                sx={{ width: "100px" }}
                variant="contained"
                color="success"
                onClick={() => handleStatus(row)}
              >
                True
              </Button>
            ) : (
              <Button
                sx={{ width: "100px" }}
                variant="contained"
                color="error"
                onClick={() => handleStatus(row)}
              >
                False
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
              <li onClick={() => handleEdit(row)}>Edit Template </li>
              <li onClick={() => handleView(row)}>View Details</li>
              <li onClick={() => handleDelete(row)}>Delete</li>
            </ul>
          </CustomPopover>
        );
      },
    },
  ];

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

  const handleView = (row) => {
    setDetail(row);
    viewOpenFunction();
  };

  const handleStatusConfirm = (slug) => {
    if (detail?.default_description === "false") {
      const finalData = {
        id: slug,
        _method: "PATCH",
      };
      const typeData = {
        page: 1,
        pagination_limit: 10,
        email_type: "business",
      };
      dispatch(emailTemplateSetStatus(finalData, statusOpenFunction, typeData));
    }
    if (detail?.default_description === "true") {
      const finalData = {
        id: slug,
        _method: "PATCH",
      };
      const typeData = {
        page: 1,
        pagination_limit: 10,
        email_type: "business",
      };
      dispatch(
        emailTemplateRemoveStatus(finalData, statusOpenFunction, typeData)
      );
    }
  };

  const handleDeleteConfirm = () => {
    const data = {
      page: 1,
      pagination_limit: 10,
      email_type: "business",
    };
    dispatch(deleteEmailTemplate(detail?.id, data, deleteOpenFunction));
  };

  const refetch = () => {
    const data = {
      page: 1,
      pagination_limit: 10,
      email_type: "business",
    };
    dispatch(getEmailTemplate(data));
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
          <Box>Business Email Template</Box>
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            display="flex"
            onClick={formOpenFunction}
          >
            Add template
          </Button>
        </Box>
        <CustomTable
          tableHeads={tableHeads}
          tableData={email_templateData?.data}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          page={page}
          setPage={setPage}
          total={email_templateData?.meta?.total}
          loading={get_email_template_loading}
        />
        <CustomModal
          open={openForm}
          handleClose={formOpenFunction}
          modalTitle="Create email template"
          modalSubtitle=""
          icon={<PersonAddIcon />}
          width={`60rem`}
        >
          <Register handleClose={formOpenFunction} />
        </CustomModal>
        <CustomModal
          open={openEdit}
          handleClose={editOpenFunction}
          modalTitle={`Update email template`}
          modalSubtitle=""
          icon={<PersonAddIcon />}
          width={`60rem`}
        >
          <Edit data={detail} handleClose={editOpenFunction} />
        </CustomModal>
        <CustomModal
          open={openView}
          handleClose={viewOpenFunction}
          modalTitle="Business email template details"
          // modalSubtitle="Get full detail"
          icon={<PersonIcon />}
          width={`40rem`}
        >
          <View data={detail} />
        </CustomModal>
        <CustomDeleteModal
          open={openDelete}
          handleClose={deleteOpenFunction}
          handleConfirm={handleDeleteConfirm}
          isLoading={delete_email_template_loading}
        />
        <CustomStatusModal
          open={openStatus}
          isLoading={email_template_status_loading}
          handleClose={statusOpenFunction}
          status={detail?.default_description === "true" ? "true" : "false"}
          id={detail?.id}
          handleConfirm={handleStatusConfirm}
        />
      </Box>
    </>
  );
};

export default BusinessTemplate;
