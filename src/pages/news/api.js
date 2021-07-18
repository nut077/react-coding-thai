import axios, { CancelToken } from 'axios';

export const fetchNews = async ({ queryKey }) => {
  const id = queryKey[1]['id'];
  const res = await axios.get(
    `https://api.codingthailand.com/api/category/${id}`
  );
  return res.data;
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
