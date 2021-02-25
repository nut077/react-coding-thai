import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Image, Table } from 'react-bootstrap';
import axios from 'axios';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';
import TopBarProgress from 'react-topbar-progress-indicator';
import { BsEyeFill } from 'react-icons/bs';
import ErrorPage from './ErrorPage';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const cancelToken = useRef(null);

  const getProducts = async () => {
    try {
      setLoading(true);
      const products = await axios.get(
        'https://api.codingthailand.com/api/course',
        {
          cancelToken: cancelToken.current.token,
        }
      );
      setProducts(products.data.data);
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cancelToken.current = axios.CancelToken.source();
    getProducts();

    return () => {
      console.log('cancel product');
      cancelToken.current.cancel();
    };
  }, []);

  if (error) {
    return <ErrorPage error={error.response.data.message} />;
  }

  return (
    <>
      {loading && <TopBarProgress />}
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
                {products.map(({ id, title, detail, date, view, picture }) => (
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
    </>
  );
};

export default ProductPage;
