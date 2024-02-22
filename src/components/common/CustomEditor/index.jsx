import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Box, FormHelperText, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import style from "./style";

const CustomEditor = ({ name, emailTemplate }) => {
  const classes = style();
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const editorRef = useRef(null);
  const [editorLoaded, setEditorLoaded] = useState(false);

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  return (
    <>
      {editorLoaded && (
        <Box>
          <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => (
              <div className={classes.richTextEditor}>
                <Typography className={classes.descriptionLable}>
                  {emailTemplate ? emailTemplate : "Description"}{" "}
                </Typography>
                <CKEditor
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
              sx={{ fontSize: "10px", color: "red", marginTop: "5px" }}
            >
              {errors?.[name].message}
            </FormHelperText>
          )}
        </Box>
      )}
    </>
  );
};

export default CustomEditor;
