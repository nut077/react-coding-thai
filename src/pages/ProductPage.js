import { Link } from 'react-router-dom';
import { Badge, Button, Image, Table } from 'react-bootstrap';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';
import TopBarProgress from 'react-topbar-progress-indicator';
import { BsEyeFill } from 'react-icons/bs';
import ErrorPage from './ErrorPage';
import { useQuery } from 'react-query';
import axios, { CancelToken } from 'axios';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/actions/cartAction';

const ProductPage = () => {
  // redux
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartReducer.cart);
  const total = useSelector((state) => state.cartReducer.total);

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

  const addCart = (p) => {
    const product = {
      id: p.id,
      name: p.title,
      price: p.view, // สมมติ p.view คือราคา
      qty: 1, // fix ค่าเอาไว้
    };
    dispatch(addToCart(product, cart));
  };

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-12">
          <h2>สินค้า</h2>
          {total > 0 && <h4>bought {total}</h4>}
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
              {data.data.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.title}</td>
                  <td>{product.detail}</td>
                  <td>
                    {format(new Date(product.date), 'dd MMM yyyy', {
                      locale: th,
                    })}
                  </td>
                  <td>
                    <Badge variant="success">{product.view}</Badge>
                  </td>
                  <td>
                    <Image
                      src={product.picture}
                      thumbnail
                      alt={product.title}
                      width={100}
                    />
                  </td>
                  <td>
                    <Link to={`/detail/${product.id}/title/${product.title}`}>
                      <BsEyeFill />
                    </Link>
                    <Button
                      variant="outline-success"
                      onClick={() => addCart(product)}
                    >
                      Take
                    </Button>
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
