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
  const editorRef = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, //Added .CKEditor
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setEditorLoaded(true);
  }, []);
  return (
    <>
      {editorLoaded ? (
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
              sx={{ fontSize: "10px", color: "red", marginTop: "5px" }}
            >
              {errors?.[name].message}
            </FormHelperText>
          )}
        </Box>
      ) : (
        <></>
      )}
    </>
  );
};

export default CustomEditor;

// import { Box, FormHelperText, Typography } from "@mui/material";
// import { useEffect, useRef, useState } from "react";
// import { Controller, useFormContext } from "react-hook-form";
// import style from "./style";

// const CustomEditor = ({ name, emailTemplate }) => {
//   const classes = style();
//   const {
//     control,
//     formState: { errors },
//   } = useFormContext();
//   const editorRef = useRef();
//   const [editorLoaded, setEditorLoaded] = useState(false);
//   const { CKEditor, ClassicEditor } = editorRef.current || {};

//   useEffect(() => {
//     // Dynamically import CKEditor and ClassicEditor
//     const loadEditors = async () => {
//       const { CKEditor: importedCKEditor } = await import(
//         "@ckeditor/ckeditor5-react"
//       );
//       const { default: importedClassicEditor } = await import(
//         "@ckeditor/ckeditor5-build-classic"
//       );
//       editorRef.current = {
//         CKEditor: importedCKEditor,
//         ClassicEditor: importedClassicEditor,
//       };
//       setEditorLoaded(true);
//     };

//     loadEditors();
//   }, []);

//   return (
//     <>
//       {editorLoaded && CKEditor && ClassicEditor && (
//         <Box>
//           <Controller
//             name={name}
//             control={control}
//             render={({ field: { onChange, value } }) => (
//               <div className={classes.richTextEditor}>
//                 <Typography className={classes.descriptionLable}>
//                   {emailTemplate ? emailTemplate : "Description"}{" "}
//                 </Typography>
//                 <CKEditor
//                   onReady={(editor) => {
//                     //  editor.ui.view.editable.element.style.height = "200px";
//                   }}
//                   editor={ClassicEditor}
//                   data={value}
//                   onChange={(event, editor) => {
//                     const data = editor.getData();
//                     onChange(data);
//                   }}
//                   onBlur={(event, editor) => {}}
//                   onFocus={(event, editor) => {}}
//                 />
//               </div>
//             )}
//           />
//           {errors?.[name]?.message && (
//             <FormHelperText
//               // error={true}
//               sx={{ fontSize: "10px", color: "red", marginTop: "5px" }}
//             >
//               {errors?.[name].message}
//             </FormHelperText>
//           )}
//         </Box>
//       )}
//     </>
//   );
// };

// export default CustomEditor;
