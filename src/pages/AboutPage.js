import { useQuery } from 'react-query';
import TopBarProgress from 'react-topbar-progress-indicator';
import ErrorPage from './ErrorPage';
import axios, { CancelToken } from 'axios';

const AboutPage = () => {
  const fetchVersion = () => {
    const source = CancelToken.source();
    const promise = axios
      .get('https://api.codingthailand.com/api/version', {
        cancelToken: source.token,
      })
      .then((res) => res.data);
    promise.cancel = () => {
      source.cancel('Query was cancelled by React Query');
    };
    return promise;
  };
  const { isLoading, error, data } = useQuery('AboutPage', fetchVersion);

  if (isLoading) {
    return <TopBarProgress />;
  }

  if (error) {
    return <ErrorPage error={error.message} />;
  }

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-12">
          <h2>เกี่ยวกับเรา</h2>
          <p>Backend API version {data.data.version}</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
