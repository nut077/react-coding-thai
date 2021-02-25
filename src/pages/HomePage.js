import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import TopBarProgress from 'react-topbar-progress-indicator';
import ErrorPage from './ErrorPage';
import { Container } from 'react-bootstrap';

const HomePage = () => {
  const { isLoading, error, data } = useQuery('repoData', () =>
    fetch('https://api.codingthailand.com/api/news?page=3').then((res) =>
      res.json()
    )
  );

  if (isLoading) return <TopBarProgress />;

  if (error) return <ErrorPage error={error.message} />;

  return (
    <main role="main">
      <div className="jumbotron">
        <div className="container">
          <h1 className="display-3">welcome !!</h1>
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
    </main>
  );
};

export default HomePage;
