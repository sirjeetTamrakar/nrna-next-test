import CustomEditor from "@/components/common/CustomEditor";
import CustomAutoComplete from "@/components/common/Form/CustomAutoComplete";
import CustomInput from "@/components/common/Form/CustomInput";
import { Box, Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBusiness } from "../../business/redux/actions";
import { useStyles } from "./styles";

const BusinessTemplateForm = ({ banner_image }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { businessData } = useSelector((state) => state.business);
  useEffect(() => {
    dispatch(getBusiness());
  }, []);
  const businessCategory = businessData?.data?.map((item) => ({
    label: item?.fullname,
    value: item?.id,
  }));

  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        <Grid item sm={12}>
          <CustomInput name="title" label="Email template title" required />
        </Grid>
        <Grid item sm={12}>
          <CustomAutoComplete
            placeholder="Business Category"
            name="business_id"
            label="Select Business"
            options={businessCategory ?? []}
            required
          />
        </Grid>
        <Grid item sm={12}>
          {/* <CustomTextArea name="description" label="Description" /> */}
          <CustomEditor emailTemplate={"Email Template"} name="description" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default BusinessTemplateForm;
