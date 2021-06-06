import RegisterForm from './shared/RegisterForm';
import { useMutation } from 'react-query';
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';
import { useHistory } from 'react-router-dom';

const RegisterPage = () => {
  const { addToast } = useToasts();
  const history = useHistory();

  const createUser = async ({ ...data }) => {
    try {
      const res = await axios.post(
        'https://api.codingthailand.com/api/register',
        {
          ...data,
        }
      );
      addToast(res.data.message, {
        appearance: 'success',
      });
      history.push('/login');
    } catch (err) {
      addToast(err.response.data.errors.email[0], {
        appearance: 'error',
      });
    }
  };

  const { mutateAsync, isLoading, isError, error } = useMutation(createUser);
  const onFormSubmit = async (data) => {
    await mutateAsync({ ...data });
  };

  return (
    <RegisterForm
      onFormSubmit={onFormSubmit}
      isLoading={isLoading}
      isError={isError}
      error={error}
    />
  );
};

export default RegisterPage;
