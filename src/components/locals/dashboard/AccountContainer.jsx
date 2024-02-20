import { Roles } from 'constants/RoleConstant';
import { useSelector } from 'react-redux';

const AccountContainer = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      {user?.role_name !== Roles?.SuperAdmin &&
      user?.role_name !== Roles?.Admin &&
      user?.role_name !== Roles?.Member &&
      user?.role_name !== Roles?.NCC ? (
        <p>
          Your Registration has not been approved yet. Please contact NBNS Global for further
          Information
        </p>
      ) : (
        <p>Dashboard</p>
      )}
    </div>
  );
};

export default AccountContainer;
