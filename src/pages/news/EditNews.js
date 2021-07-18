import { useHistory, useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import NewsForm from '../shared/NewsForm';
import { fetchNews } from './api';
import TopBarProgress from 'react-topbar-progress-indicator';
import ErrorPage from '../ErrorPage';
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';

const EditNews = () => {
  const { id } = useParams();
  const history = useHistory();
  const { addToast } = useToasts();

  const editNews = async ({ id, ...data }) => {
    const res = await axios.put('https://api.codingthailand.com/api/category', {
      id,
      ...data,
    });
    addToast(res.data.message, {
      appearance: 'success',
    });
  };

  const { data, error, isLoading, isError } = useQuery(
    ['news', { id }],
    fetchNews,
    { cacheTime: 0 }
  );
  const {
    mutateAsync,
    isLoading: isMutatingLoading,
    isError: isMutatingError,
    error: errorMutation,
  } = useMutation(editNews);

  const onFormSubmit = async (data) => {
    await mutateAsync({ id, ...data });
    history.push('/news');
  };

  if (isLoading) {
    return <TopBarProgress />;
  }

  if (isError) {
    return <ErrorPage error={error.message} />;
  }

  if (data) {
    return (
      <NewsForm
        defaultValues={data}
        onFormSubmit={onFormSubmit}
        isLoading={isMutatingLoading}
        isError={isMutatingError}
        error={errorMutation}
      />
    );
  }
};

export default EditNews;
