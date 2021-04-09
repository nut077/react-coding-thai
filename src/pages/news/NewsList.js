import { useHistory } from 'react-router-dom';
import TopBarProgress from 'react-topbar-progress-indicator';
import ErrorPage from '../ErrorPage';
import { Button, Container, Table } from 'react-bootstrap';
import { useQuery } from 'react-query';
import News from './News';
import { fetchNewsAll } from './api';

const NewsList = () => {
  const history = useHistory();
  const { data, isLoading, isError, error } = useQuery('news', fetchNewsAll);

  if (isLoading) {
    return <TopBarProgress />;
  }

  if (isError) {
    return <ErrorPage error={error.message} />;
  }

  const goPage = (page) => {
    history.push(page);
  };

  return (
    <Container>
      <div className="row mt-4">
        <div className="col-md-12">
          <Button
            className="mb-3"
            variant="success"
            onClick={() => goPage('/news/create')}
          >
            Add News
          </Button>
          <h2>News</h2>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th style={{ width: '10%' }}>Id</th>
                <th>Category</th>
                <th>Tools</th>
              </tr>
            </thead>
            <tbody>
              {data.map(({ id, name }) => (
                <News key={id} id={id} name={name} goPage={goPage} />
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </Container>
  );
};

export default NewsList;
