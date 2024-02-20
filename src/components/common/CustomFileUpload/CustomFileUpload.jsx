import { FileUploadOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useRef } from 'react';
import { Controller } from 'react-hook-form';
const CustomFileUpload = ({ name, control, disabled, buttonName, isMultiple, variant }) => {
  const fileRef = useRef();
  return (
    <div>
      <Button
        variant={variant || 'blue'}
        onClick={() => fileRef.current.click()}
        startIcon={<FileUploadOutlined />}>
        {buttonName || 'Upload'}
      </Button>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <input
            ref={fileRef}
            type={'file'}
            multiple={isMultiple}
            onChange={(e) => onChange(e.target.files)}
            disabled={disabled}
            hidden
          />
        )}
      />
    </div>
  );
};

export default CustomFileUpload;
