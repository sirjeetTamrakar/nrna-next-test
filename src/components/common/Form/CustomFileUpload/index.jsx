import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box, Button, FormHelperText, InputLabel, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Controller, useFormContext } from 'react-hook-form';
import styles from './styles';

const FileUploader = ({
  title,
  name,
  defaultValue = '',
  classnames = '',
  clearErrors,
  required,
  widthFull,
  imageText,
  image
}) => {
  const {
    watch,
    setValue,
    control,
    formState: { errors }
  } = useFormContext();
  const imageLink = watch(name);
  const [imagePreview, setImagePreview] = useState(image || '');
  useEffect(() => {
    if (imageLink?.length > 0) {
      const newImageLink = URL?.createObjectURL(imageLink?.[0]);
      setImagePreview(newImageLink);
    }
  }, [imageLink]);

  const onDrop = (acceptedFiles) => {
    // register value in react hook form
    setValue(name, acceptedFiles);

    // set image preview url
    const reader = new FileReader();
    reader.readAsDataURL(acceptedFiles[0]);
    reader.addEventListener('load', () => {
      setImagePreview(reader.result);
    });

    // clear required errors if file is uploaded
    if (errors?.type === 'required') {
      clearErrors(name);
    }
  };

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
    accept: { 'image/png': ['.jpeg', '.jpg', '.png', '.webp'] }
  });

  const classes = styles();

  return (
    <Box className={`${classnames} file-input`}>
      <Controller
        control={control}
        errors={errors}
        name={name}
        defaultValue={defaultValue}
        render={({ field }) => (
          <>
            {title && (
              <Box sx={{ display: 'flex', columnGap: '0.1rem', mb: '5px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <InputLabel className={classes.labels}>{title}</InputLabel>
                  <InputLabel
                    sx={{
                      color: 'red',
                      fontSize: '10px',
                      marginLeft: '10px',
                      marginBottom: '-1px'
                    }}>
                    {imageText && imageText}
                  </InputLabel>
                </Box>
                <InputLabel style={{ color: 'red' }}>{required && ' *'}</InputLabel>
              </Box>
            )}
            <div
              className={`${widthFull ? classes.inputFileWrapFull : classes.inputFileWrap} ${
                isDragActive ? 'drag-active' : ''
                //   imagePreview ? 'image-preview' : ''
              } `}
              {...getRootProps()}>
              <input {...getInputProps()} name={name} />
              {imagePreview ? (
                <Tooltip title="Click to change image">
                  <Box className="image-container" onClick={open}>
                    {/* <ClearIcon onClick={removePreview} /> */}
                    <img src={imagePreview} alt="Preview" />
                  </Box>
                </Tooltip>
              ) : (
                <>
                  <CloudUploadIcon />
                  <div className="title">Drag and drop to upload</div>
                  <div className="or">or</div>
                  <Button variant="contained" onClick={open}>
                    Browse
                  </Button>
                </>
              )}
            </div>
          </>
        )}></Controller>

      {errors?.[name]?.message && (
        <FormHelperText sx={{ fontSize: '10px', color: 'red', marginTop: '5px' }}>
          {errors?.[name].message}
        </FormHelperText>
      )}
    </Box>
  );
};

export default FileUploader;
