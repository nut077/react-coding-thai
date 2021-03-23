import axios, { CancelToken } from 'axios';
import { useHistory } from 'react-router-dom';
import TopBarProgress from 'react-topbar-progress-indicator';
import ErrorPage from '../ErrorPage';
import { Button, Container, Table } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { BsPencil, BsTrash } from 'react-icons/bs';

const NewsPage = () => {
  const history = useHistory();
  const fetchNews = () => {
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

  const { isLoading, error, data } = useQuery('news', fetchNews);

  if (isLoading) {
    return <TopBarProgress />;
  }

  if (error) {
    return <ErrorPage error={error.message} />;
  }

  const goPage = (page) => {
    history.push(page);
  };

  const deleteNews = async (id) => {
    const isConfirm = window.confirm(`Do you want to delete news id ${id}?`);
    if (isConfirm === true) {
      const res = await axios.delete(
        `https://api.codingthailand.com/api/category/${id}`
      );
      alert(res.data.message);
    }
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
                <tr key={id}>
                  <td>{id}</td>
                  <td>{name}</td>
                  <td>
                    <Button
                      className="ml-2"
                      variant="outline-info"
                      size="sm"
                      onClick={() => goPage(`/news/edit/${id}`)}
                    >
                      <BsPencil />
                    </Button>
                    <Button
                      className="ml-2"
                      variant="outline-danger"
                      size="sm"
                      onClick={() => deleteNews(id)}
                    >
                      <BsTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </Container>
  );
};

export default NewsPage;
