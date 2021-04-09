import { useHistory } from 'react-router-dom';
import { useMutation } from 'react-query';
import NewsForm from '../shared/NewsForm';
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';

const CreateNews = () => {
  const history = useHistory();
  const { addToast } = useToasts();

  const createNews = async ({ ...data }) => {
    const res = await axios.post(
      'https://api.codingthailand.com/api/category',
      {
        ...data,
      }
    );
    addToast(res.data.message, {
      appearance: 'success',
    });
  };

  const { mutateAsync, isLoading, isError, error } = useMutation(createNews);

  const onFormSubmit = async (data) => {
    await mutateAsync({ ...data });
    history.push('/news');
  };

  return (
    <NewsForm
      onFormSubmit={onFormSubmit}
      isLoading={isLoading}
      isError={isError}
      error={error}
    />
  );
};

export default CreateNews;
