import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Box, FormHelperText, Typography } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import style from './style';

const CustomEditor = ({ name, emailTemplate }) => {
  const classes = style();
  const {
    control,
    formState: { errors }
  } = useFormContext();
  return (
    <Box>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <div className={classes.richTextEditor}>
            <Typography className={classes.descriptionLable}>
              {emailTemplate ? emailTemplate : 'Description'}{' '}
            </Typography>
            <CKEditor
              onReady={(editor) => {
                //  editor.ui.view.editable.element.style.height = "200px";
              }}
              editor={ClassicEditor}
              data={value}
              onChange={(event, editor) => {
                const data = editor.getData();
                onChange(data);
              }}
              onBlur={(event, editor) => {}}
              onFocus={(event, editor) => {}}
            />
          </div>
        )}
      />
      {errors?.[name]?.message && (
        <FormHelperText
          // error={true}
          sx={{ fontSize: '10px', color: 'red', marginTop: '5px' }}>
          {errors?.[name].message}
        </FormHelperText>
      )}
    </Box>
  );
};

export default CustomEditor;
