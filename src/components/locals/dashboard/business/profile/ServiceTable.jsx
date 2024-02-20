import CustomDeleteModal from "@/components/common/CustomModal/CustomDeleteModal";
import CustomModal from "@/components/common/CustomModal/CustomModal";
import CustomPopover from "@/components/common/CustomPopover/CustomPopover";
import CustomTable from "@/components/common/table";
import useToggle from "@/hooks/useToggle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBusinessService, getBusinessService } from "../redux/actions";
import ServiceFormEdit from "./ServiceFormEdit";
import View from "./ViewServices";
import { useStyles } from "./styles";

const ServiceTable = ({ serviceId }) => {
  const dispatch = useDispatch();
  const [openEdit, editOpenFunction] = useToggle(false);
  const [openDelete, deleteOpenFunction] = useToggle(false);
  const [openStatus, statusOpenFunction] = useToggle(false);
  const [openApprove, approveOpenFunction] = useToggle(false);
  const [openService, serviceOpenFunction] = useToggle(false);
  const [openView, viewOpenFunction] = useToggle(false);
  const [detail, setDetail] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [singleService, setSingleService] = useState();
  const classes = useStyles();

  const {
    business_service,
    get_business_service_loading,
    delete_business_service_loading,
  } = useSelector((state) => state.business);

  useEffect(() => {
    const data = {
      page: page + 1,
      pagination_limit: rowsPerPage,
      business_id: serviceId,
    };
    dispatch(getBusinessService(data));
  }, [serviceId]);

  useEffect(() => {
    const single = business_service?.data?.filter(
      (list) => list?.business_id == serviceId
    );
    setSingleService(single);
  }, [business_service?.data]);

  const tableHeads = [
    { title: "S.N.", type: "Index", minWidth: 20 },

    {
      title: "Business Service",
      minWidth: 200,
      field: (row) => {
        return (
          <Box>
            <Typography variant="body2">{row?.title}</Typography>
          </Box>
        );
      },
    },
    // {
    //   title: 'Description',
    //   minWidth: 120,
    //   field: (row) => {
    //     return (
    //       <Box>
    //         <Typography variant="body2">
    //           {row?.description?.length > 59
    //             ? `${row?.description?.substring(0, 60)}...`
    //             : row?.description}
    //         </Typography>
    //       </Box>
    //     );
    //   }
    // },
    {
      title: "Image",
      minWidth: 120,
      field: (row) => {
        return (
          <img
            src={row?.service_image}
            alt=""
            style={{
              width: "46px",
              height: "46px",
              objectFit: "contain",
            }}
          />
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
              <li onClick={() => handleEdit(row)}>Edit Services</li>
              <li onClick={() => handleView(row)}>View Details</li>
              <li onClick={() => handleDelete(row)}>Delete</li>
            </ul>
          </CustomPopover>
        );
      },
    },
  ];

  const business = [
    {
      name: "Scodus Innovations",
      address: "Dillibazar, Kathmandu",
      email: "info@scodus.com",
      phone: "9841587582",
      status: "Active",
      approve_by: "Yogen Bahadur Chhetri",
      created_by: "Bishwo Raj Raut",
      created_at: "20-Sep-2023",
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

  const handleConfirm = (slug) => {
    dispatch(deleteBusinessService(slug, deleteOpenFunction));
  };

  const handleStatus = (row) => {
    setDetail(row);
    statusOpenFunction();
  };

  const handleApprove = (row) => {
    setDetail(row);
    approveOpenFunction();
  };

  const handleService = (row) => {
    setDetail(row);
    serviceOpenFunction();
  };

  const handleView = (row) => {
    setDetail(row);
    viewOpenFunction();
  };

  return (
    <>
      <Box>
        {/* <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '15px'
          }}>
          <Box>Business</Box>
        </Box> */}
        <CustomTable
          tableHeads={tableHeads}
          tableData={business_service?.data}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          page={page}
          setPage={setPage}
          total={business_service?.meta?.total}
          padding
          loading={get_business_service_loading}
        />
        <CustomModal
          open={openEdit}
          handleClose={editOpenFunction}
          modalTitle={`Services of ${detail?.title}`}
          modalSubtitle=""
          icon={<PersonAddIcon />}
          width={`60rem`}
        >
          <ServiceFormEdit data={detail} handleClose={editOpenFunction} />
        </CustomModal>

        <CustomDeleteModal
          handleConfirm={handleConfirm}
          slug={detail?.slug}
          open={openDelete}
          isLoading={delete_business_service_loading}
          handleClose={deleteOpenFunction}
        />
        <CustomModal
          open={openView}
          handleClose={viewOpenFunction}
          modalTitle="News Details"
          icon={<PersonIcon />}
          width={`40rem`}
        >
          <View data={detail} />
        </CustomModal>
      </Box>
    </>
  );
};

export default ServiceTable;
