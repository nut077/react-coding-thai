import axios, { CancelToken } from 'axios';

export const fetchNews = async ({ queryKey }) => {
  const source = CancelToken.source();
  const id = queryKey[1]['id'];
  const promise = await axios.get(
    `https://api.codingthailand.com/api/category/${id}`,
    {
      cancelToken: source.token,
    }
  );
  promise.cancel = () => {
    source.cancel('Query was cancelled by React Query');
  };
  return promise;
};

export const fetchNewsAll = () => {
  const source = CancelToken.source();
  const promise = axios
    .get(`https://api.codingthailand.com/api/category`, {
      cancelToken: source.token,
    })
    .then((res) => res.data);
  promise.cancel = () => {
    source.cancel('Query was cancelled by React Query');
  };
  return promise;
};
