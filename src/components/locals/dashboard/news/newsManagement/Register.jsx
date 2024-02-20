import CustomButton from "@/components/common/CustomButton/CustomButton";
import CustomForm from "@/components/common/Form/CustomForm";
import CustomFormProvider from "@/components/common/Form/CustomFormProvider";
import useYupValidationResolver from "@/hooks/useYupValidationResolver";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { postNewsOrder } from "../redux/actions";
import NewsManagementForm from "./Form";
import { validationSchema } from "./ValidationSchema";
import { useStyles } from "./styles";

const Register = ({ handleClose, selected }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const defaultValues = { created_by: user?.id };
  const classes = useStyles();
  const { news_order_loading, get_news_loading } = useSelector(
    (state) => state.news
  );
  const onSubmit = (data) => {
    if (selected === "ALL") {
      dispatch(postNewsOrder(data, handleClose));
    } else {
      const finalData = {
        ...data,
        category_id: selected,
      };
      dispatch(postNewsOrder(finalData, handleClose));
    }
  };

  return (
    <>
      <CustomFormProvider
        defaultValues={defaultValues}
        resolver={useYupValidationResolver(validationSchema)}
      >
        <CustomForm onSubmit={onSubmit}>
          <NewsManagementForm />
          {!get_news_loading && (
            <Box className={classes.footerRoot}>
              <CustomButton buttonName="Submit" loading={news_order_loading} />
            </Box>
          )}
        </CustomForm>
      </CustomFormProvider>
    </>
  );
};

export default Register;
