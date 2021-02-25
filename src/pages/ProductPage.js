import { Link } from 'react-router-dom';
import { Badge, Image, Table } from 'react-bootstrap';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';
import TopBarProgress from 'react-topbar-progress-indicator';
import { BsEyeFill } from 'react-icons/bs';
import ErrorPage from './ErrorPage';
import { useQuery } from 'react-query';
import axios, { CancelToken } from 'axios';

const ProductPage = () => {
  const fetchProduct = () => {
    const source = CancelToken.source();
    const promise = axios
      .get('https://api.codingthailand.com/api/course', {
        cancelToken: source.token,
      })
      .then((res) => res.data);
    promise.cancel = () => {
      source.cancel('Query was cancelled by React Query');
    };
    return promise;
  };

  const { isLoading, error, data } = useQuery('ProductPage', () =>
    fetchProduct()
  );

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
          <h2>สินค้า</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Course name</th>
                <th>Detail</th>
                <th>Created date</th>
                <th>View</th>
                <th>Picture</th>
                <th>Tool</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map(({ id, title, detail, date, view, picture }) => (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{title}</td>
                  <td>{detail}</td>
                  <td>
                    {format(new Date(date), 'dd MMM yyyy', { locale: th })}
                  </td>
                  <td>
                    <Badge variant="success">{view}</Badge>
                  </td>
                  <td>
                    <Image src={picture} thumbnail alt={title} width={100} />
                  </td>
                  <td>
                    <Link to={`/detail/${id}/title/${title}`}>
                      <BsEyeFill />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
