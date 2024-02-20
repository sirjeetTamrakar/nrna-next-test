import { Chip } from '@mui/material';

const CustomChip = ({ params }) => {
  return (
    <>
      <Chip
        variant="outlined"
        size="small"
        label={String(params?.row?.status)?.toUpperCase()}
        color={String(params?.row?.status)?.toLowerCase() === 'pending' ? 'warning' : 'success'}
        style={{
          height: '25px',
          borderRadius: '4px',
          width: '75px',
          fontSize: '11px',
          border: 'none',
          textAlign: 'left'
        }}
      />
    </>
  );
};

export default CustomChip;
