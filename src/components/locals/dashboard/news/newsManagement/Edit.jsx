import CustomButton from "@/components/common/CustomButton/CustomButton";
import CustomForm from "@/components/common/Form/CustomForm";
import CustomFormProvider from "@/components/common/Form/CustomFormProvider";
import useYupValidationResolver from "@/hooks/useYupValidationResolver";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import NewsManagementForm from "./Form";
import { editValidationSchema } from "./ValidationSchema";
import { useStyles } from "./styles";

const EditForm = ({ detail, handleClose }) => {
  const classes = useStyles();

  const { update_news_loading, get_news_loading } = useSelector(
    (state) => state.news
  );

  const onSubmit = (data) => {
    // const formData = new FormData();
    // formData.append('title', data?.title);
    // formData.append('description', data?.description);
    // formData.append('created_by', data?.created_by);
    // formData.append('_method', 'PUT');
    // formData.append('news_category_id', data?.news_category_id);
    // if (data?.feature_image?.length > 0) {
    //   formData.append('feature_image', data?.feature_image?.[0]);
    // }
    // dispatch(updateNews(formData, detail?.slug, handleClose, typeData));
    // dispatch(updateNews({ ...data, _method: 'PATCH' }, detail?.slug, handleClose));
  };
  // useEffect(() => {
  //   if (user?.role_name == Roles?.Member) {
  //     setTypeData({ type: 'member', id: user?.id, page: 1, pagination_limit: 10 });
  //   } else if (user?.role_name == Roles?.NCC) {
  //     setTypeData({ type: 'ncc', id: user?.ncc?.id, page: 1, pagination_limit: 10 });
  //   }
  // }, []);

  return (
    <CustomForm onSubmit={onSubmit}>
      <NewsManagementForm featureImage={detail?.feature_image} />
      {!get_news_loading && (
        <Box className={classes.footerRoot}>
          <CustomButton buttonName="Update" loading={update_news_loading} />
        </Box>
      )}
    </CustomForm>
  );
};
const Edit = ({ data, handleClose }) => {
  const defaultValues = {
    order_number: data?.order_number,
    news_id: data?.news_id,
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
