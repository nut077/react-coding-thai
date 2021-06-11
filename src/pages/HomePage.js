import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios, { CancelToken } from 'axios';
import TopBarProgress from 'react-topbar-progress-indicator';
import ErrorPage from './ErrorPage';
import { Container } from 'react-bootstrap';

// redux
import { useSelector } from 'react-redux';

const HomePage = () => {
  // redux
  const profileRedux = useSelector((state) => state.authReducer.profile);

  const fetchNews = () => {
    const source = CancelToken.source();
    const promise = axios
      .get('https://api.codingthailand.com/api/news?page=1', {
        cancelToken: source.token,
      })
      .then((res) => res.data);
    promise.cancel = () => {
      source.cancel('Query was cancelled by React Query');
    };
    return promise;
  };

  const { isLoading, error, data } = useQuery('HomePage', () => fetchNews());

  if (isLoading) {
    return <TopBarProgress />;
  }

  if (error) {
    return <ErrorPage error={error.message} />;
  }

  return (
    <>
      <div className="jumbotron">
        <div className="container">
          <h1 className="display-3">welcome {profileRedux?.name}</h1>
          <p>Create with React</p>
          <p>
            <Link
              to="/product"
              className="btn btn-primary btn-lg"
              role="button"
            >
              สินค้า »
            </Link>
          </p>
        </div>
      </div>

      <Container>
        <div className="row">
          {data.data.map(({ id, topic, detail }) => (
            <div key={id} className="col-md-4">
              <h2>{topic}</h2>
              <p>{detail}</p>
            </div>
          ))}
        </div>
        <hr />
      </Container>
    </>
  );
};

export default HomePage;
