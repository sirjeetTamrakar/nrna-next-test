import CustomButton from "@/components/common/CustomButton/CustomButton";
import CustomForm from "@/components/common/Form/CustomForm";
import CustomFormProvider from "@/components/common/Form/CustomFormProvider";
import useYupValidationResolver from "@/hooks/useYupValidationResolver";
import { Box } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NCCForm from "./Form";
import { editValidationSchema } from "./ValidationSchema";
import { updateNCC } from "./redux/actions";
import { useStyles } from "./styles";

const EditForm = ({ handleClose, detail }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { update_ncc_loading } = useSelector((state) => state.ncc);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("country_name", data?.country_name);
    formData.append("subtitle", data?.subtitle);
    formData.append("admin_id", data?.admin_id);
    formData.append("_method", "PUT");

    let obj = {};
    data?.regions?.forEach((item, index) => {
      const fieldName = `regions[${index}][region_id]`;
      obj[fieldName] = item;
    });

    Object.keys(obj)?.map((key) => {
      formData.append(key, obj?.[key]);
    });

    formData.append("color", data?.color ? data?.color : "#276FC4");
    if (data?.logo?.length > 0) {
      formData.append("logo", data?.logo[0]);
    }
    const typeData = { page: page + 1, pagination_limit: rowsPerPage };

    dispatch(updateNCC(formData, detail?.slug, typeData, handleClose));
  };

  return (
    <CustomForm onSubmit={onSubmit}>
      <NCCForm logo={detail?.logo} data={detail} />
      <Box className={classes.footerRoot}>
        <CustomButton buttonName="Update" loading={update_ncc_loading} />
      </Box>
    </CustomForm>
  );
};

const Edit = ({ data, handleClose }) => {
  const defaultValues = {
    country_name: data?.country_name,
    admin_id: data?.admin?.id,
    color: data?.color,
    subtitle: data?.subtitle,
  };

  return (
    <>
      <CustomFormProvider
        defaultValues={defaultValues}
        resolver={useYupValidationResolver(editValidationSchema)}
      >
        <EditForm detail={data} handleClose={handleClose} />
      </CustomFormProvider>
    </>
  );
};

export default Edit;
