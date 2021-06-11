import React from 'react';
import { useToasts } from 'react-toast-notifications';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useMutation } from 'react-query';
import LoginForm from './shared/LoginForm';

// context
//import { UserStoreContext } from '../context/UserStoreContext';

// redux
import { useDispatch } from 'react-redux';
import { updateProfile } from '../redux/actions/authAction';

const LoginPage = () => {
  const { addToast } = useToasts();
  const history = useHistory();

  // context
  //const userStore = React.useContext(UserStoreContext);

  // call redux action
  const dispatch = useDispatch();

  const login = async ({ ...data }) => {
    try {
      const res = await axios.post('https://api.codingthailand.com/api/login', {
        ...data,
      });
      localStorage.setItem('token', JSON.stringify(res.data));

      const resProfile = await axios.get(
        'https://api.codingthailand.com/api/profile',
        {
          headers: {
            Authorization: 'Bearer ' + res.data.access_token,
          },
        }
      );
      localStorage.setItem(
        'profile',
        JSON.stringify(resProfile.data.data.user)
      );

      addToast('Login success', {
        appearance: 'success',
      });

      const profileValue = JSON.parse(localStorage.getItem('profile'));

      dispatch(updateProfile(profileValue));
      history.replace('/');
    } catch (err) {
      addToast(err.response.data.message, {
        appearance: 'error',
      });
    }
  };

  const { mutateAsync, isLoading, isError, error } = useMutation(login);
  const onFormSubmit = async (data) => {
    await mutateAsync({ ...data });
  };

  return (
    <LoginForm
      onFormSubmit={onFormSubmit}
      isLoading={isLoading}
      isError={isError}
      error={error}
    />
  );
};

export default LoginPage;
