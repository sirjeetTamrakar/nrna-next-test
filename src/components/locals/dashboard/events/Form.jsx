import CustomEditor from "@/components/common/CustomEditor";
import CustomLoader from "@/components/common/CustomLoader/CustomLoader";
import CustomAutoComplete from "@/components/common/Form/CustomAutoComplete";
import CustomDatePicker from "@/components/common/Form/CustomDataPicker/CustomDatePicker";
import FileUploader from "@/components/common/Form/CustomFileUpload";
import CustomInput from "@/components/common/Form/CustomInput";
import { Box, Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "./redux/actions";
import { useStyles } from "./styles";

const EventForm = ({ image }) => {
  const dispatch = useDispatch();
  const { categoryData, get_category_loading } = useSelector(
    (state) => state.events
  );
  const classes = useStyles();
  const eventCategory = categoryData?.map((item) => ({
    label: item?.title,
    value: item?.id,
  }));

  useEffect(() => {
    dispatch(getCategory());
  }, []);

  return (
    <Box className={classes.root}>
      {get_category_loading ? (
        <CustomLoader />
      ) : (
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <CustomInput name="title" label="Title" required />
          </Grid>
          <Grid item sm={6}>
            <CustomAutoComplete
              placeholder="Event Category"
              name="event_category_id"
              label="Event Category"
              options={eventCategory ?? []}
              required
            />
          </Grid>
          <Grid item sm={6}>
            <CustomInput
              name="contact_email"
              type="email"
              label="Contact email"
            />
          </Grid>
          <Grid item sm={6}>
            <CustomInput name="contact_phone" label="Contact phone" />
          </Grid>
          <Grid item sm={6}>
            <CustomInput name="location" label="location" />
          </Grid>
          <Grid item sm={6}>
            <CustomInput name="venue" label="Venue" />
          </Grid>
          <Grid item sm={12}>
            <CustomInput name="map_url" label="Map Url" />
            <div className={classes.example}>
              Eg: Insert Embeded Iframe
              {/* https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.4571106444496!2d85.3242159761745!3d27.703169425674513!2m3!1f0!2f0!3f0 */}
            </div>
          </Grid>
          <Grid item sm={12}>
            <CustomInput
              name="youtube_url"
              label="Youtube Url"
              placeholder="iaUspumK5ZU"
            />
            <div className={classes.example}>
              Eg: https://www.youtube.com/embed/
              <span style={{ color: "#2196F3" }}>iaUspumK5ZU</span> | Add
              highlighted portion only
            </div>
          </Grid>
          <Grid item sm={6}>
            {/* <CustomInput
            name="event_date"
            label="Event date"
            type="date"
            inputProps={{
              inputProps: { min: todayDate }
            }}
          /> */}
            <CustomDatePicker
              // control={control}
              name={"event_date"}
              label={"Event date"}
              // errors={errors}
              disablePast={true}
              format="YYYY-MM-DD"
            />
          </Grid>
          <Grid item sm={6}>
            <CustomInput name="event_time" label="Event time" type="time" />
          </Grid>
          <Grid item sm={12}>
            <FileUploader
              title="Event Image"
              imageText="Resolution: height: 1024 x width: 768"
              name="feature_image"
              image={image}
              label="Select Photo"
              widthFull
            />
          </Grid>
          <Grid item sm={12}>
            <CustomEditor name="description" />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default EventForm;
