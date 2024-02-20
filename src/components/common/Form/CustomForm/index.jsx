import { useFormContext } from 'react-hook-form';

const CustomForm = ({ onSubmit, children }) => {
  const { handleSubmit } = useFormContext();
  return <form onSubmit={handleSubmit(onSubmit)}>{children}</form>;
};

export default CustomForm;
