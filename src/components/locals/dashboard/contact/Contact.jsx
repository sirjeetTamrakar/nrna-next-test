import CustomDeleteModal from "@/components/common/CustomModal/CustomDeleteModal";
import CustomModal from "@/components/common/CustomModal/CustomModal";
import CustomPopover from "@/components/common/CustomPopover/CustomPopover";
import CustomTable from "@/components/common/table";
import { Roles } from "@/constants/RoleConstant";
import useToggle from "@/hooks/useToggle";
import { deleteContact, getContact } from "@/redux/homepage/actions";
import { changeDateFormat } from "@/utils/dateUtils";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonIcon from "@mui/icons-material/Person";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import View from "./View";
import { useStyles } from "./styles";

const Contact = () => {
  const dispatch = useDispatch();
  const [openDelete, deleteOpenFunction] = useToggle(false);
  const [openView, viewOpenFunction] = useToggle(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { user, admin_role_details, admin_ncc_id_details } = useSelector(
    (state) => state.auth
  );

  const [detail, setDetail] = useState();
  const classes = useStyles();
  const { contact, contact_loading, contact_delete_loading } = useSelector(
    (state) => state.homepage
  );

  const tableHeads = [
    { title: "S.N.", type: "Index", minWidth: 20 },

    {
      title: "Subject",
      minWidth: 200,
      field: (row) => {
        return (
          <Box>
            <Typography variant="body2">
              {row?.subject?.length > 49
                ? `${row?.subject?.substring(0, 50)}...`
                : row?.subject}
            </Typography>
          </Box>
        );
      },
      // field: 'subject'
    },
    {
      title: "Name",
      minWidth: 150,

      field: "name",
    },
    {
      title: "Email",
      minWidth: 150,

      field: "email",
    },
    {
      title: "Date",
      minWidth: 150,

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

  const confirmDelete = () => {
    let typeData;
    if (user?.role_name == Roles?.Member) {
      typeData = {
        type: "member",
        id: user?.id,
        page: page + 1,
        pagination_limit: rowsPerPage,
      };
    } else if (user?.role_name == Roles?.NCC) {
      typeData = {
        type: "ncc",
        id: user?.id,
        page: page + 1,
        pagination_limit: rowsPerPage,
      };
    } else if (
      user?.role_name == Roles?.SuperAdmin &&
      admin_role_details === "ncc"
    ) {
      typeData = {
        type: "ncc",
        id: admin_ncc_id_details,
        page: page + 1,
        pagination_limit: rowsPerPage,
      };
    }
    dispatch(deleteContact(detail?.id, deleteOpenFunction, typeData));
  };

  const refetch = () => {
    let data;
    if (user?.role_name == Roles?.Member) {
      data = {
        type: "member",
        id: user?.id,
        page: page + 1,
        pagination_limit: rowsPerPage,
      };
    } else if (user?.role_name == Roles?.NCC) {
      data = {
        type: "ncc",
        id: user?.id,
        page: page + 1,
        pagination_limit: rowsPerPage,
      };
    } else if (
      user?.role_name == Roles?.SuperAdmin &&
      admin_role_details === "ncc"
    ) {
      data = {
        type: "ncc",
        id: admin_ncc_id_details,
        page: page + 1,
        pagination_limit: rowsPerPage,
      };
    } else {
      data = { page: page + 1, pagination_limit: rowsPerPage };
    }
    dispatch(getContact(data));
  };

  useEffect(() => {
    user && refetch();
  }, [page, rowsPerPage, user]);

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
          <Box>Contact</Box>
        </Box>
        <CustomTable
          tableHeads={tableHeads}
          tableData={contact?.data}
          loading={contact_loading}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          page={page}
          setPage={setPage}
          total={contact?.meta?.total}
        />
        <CustomModal
          open={openView}
          handleClose={viewOpenFunction}
          modalTitle={`Contact Details`}
          icon={<PersonIcon />}
          width={`40rem`}
        >
          <View data={detail} />
        </CustomModal>
        <CustomDeleteModal
          open={openDelete}
          handleClose={deleteOpenFunction}
          handleConfirm={confirmDelete}
          isLoading={contact_delete_loading}
        />
      </Box>
    </>
  );
};

export default Contact;
