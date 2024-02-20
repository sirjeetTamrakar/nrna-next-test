import CustomDeleteModal from "@/components/common/CustomModal/CustomDeleteModal";
import CustomModal from "@/components/common/CustomModal/CustomModal";
import CustomPopover from "@/components/common/CustomPopover/CustomPopover";
import CustomTable from "@/components/common/table";
import useToggle from "@/hooks/useToggle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonIcon from "@mui/icons-material/Person";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button/Button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBusinessContact, getBusinessContact } from "../redux/actions";
import ContactTable from "./ContactTable";
import View from "./View";
import { useStyles } from "./styles";

const Contact = () => {
  const dispatch = useDispatch();
  const [openDelete, deleteOpenFunction] = useToggle(false);
  const [openView, viewOpenFunction] = useToggle(false);
  const [openContactTable, contactTableOpenFunction] = useToggle(false);

  const { user } = useSelector((state) => state.auth);
  const [detail, setDetail] = useState();
  const classes = useStyles();

  useEffect(() => {
    const finalData = {
      user_id: user?.id,
    };
    dispatch(getBusinessContact({ finalData }));
  }, []);

  const { contact, contact_loading, delete_business_contact_loading } =
    useSelector((state) => state.business);

  const handleContactTable = (row) => {
    setDetail(row);
    contactTableOpenFunction();
  };

  const tableHeads = [
    { title: "S.N.", type: "Index", minWidth: 20 },
    {
      title: "Business",
      minWidth: 150,

      field: "fullname",
    },

    // {
    //   title: 'Subject',
    //   minWidth: 250,

    //   field: 'subject'
    // },
    // {
    //   title: 'Name',
    //   minWidth: 100,

    //   field: 'name'
    // },
    // {
    //   title: 'Email',
    //   minWidth: 100,

    //   field: 'email'
    // },
    {
      title: "Total contacts",
      minWidth: 200,
      field: (row) => {
        return (
          <Box>
            <Typography variant="body2">
              {row?.business_contact?.length}
            </Typography>
          </Box>
        );
      },
    },
    {
      title: "View contacts",
      minWidth: 100,
      field: (row) => {
        return (
          <Box display={"flex"} columnGap={"10px"}>
            <Button
              sx={{ width: "40px" }}
              variant="contained"
              onClick={() => handleContactTable(row)}
            >
              <VisibilityIcon />
            </Button>
          </Box>
        );
      },
    },
    // {
    //   title: 'Date',
    //   minWidth: 100,

    //   field: (row) => {
    //     return changeDateFormat(row?.created_at);
    //   }
    // },

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

  const confirmDelete = (id) => {
    dispatch(deleteBusinessContact(id, deleteOpenFunction));
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
          <Box>Business Contact</Box>
        </Box>
        <CustomTable
          tableHeads={tableHeads}
          tableData={contact}
          loading={contact_loading}
        />
        <CustomModal
          open={openView}
          handleClose={viewOpenFunction}
          modalTitle={`Business Details`}
          icon={<PersonIcon />}
          width={`40rem`}
        >
          <View data={detail} />
        </CustomModal>
        <CustomModal
          open={openContactTable}
          handleClose={contactTableOpenFunction}
          modalTitle={`${detail?.fullname}' contact details`}
          modalSubtitle=""
          // icon={<PersonAddIcon />}
          width={`60rem`}
        >
          <ContactTable
            serviceId={detail?.id}
            data={detail?.business_contact}
          />{" "}
        </CustomModal>
        <CustomDeleteModal
          handleConfirm={confirmDelete}
          slug={detail?.id}
          open={openDelete}
          isLoading={delete_business_contact_loading}
          handleClose={deleteOpenFunction}
        />
      </Box>
    </>
  );
};

export default Contact;
