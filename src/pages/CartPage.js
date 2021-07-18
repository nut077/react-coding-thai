import { useSelector, useDispatch } from 'react-redux';
import { th } from 'date-fns/locale';
import { Button, Table } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { clearAllCart } from '../redux/actions/cartAction';

const CartPage = () => {
  const history = useHistory();
  const cart = useSelector((state) => state.cartReducer.cart);
  const total = useSelector((state) => state.cartReducer.total);
  const dispatch = useDispatch();

  const goPagePdf = () => {
    history.replace('/pdf');
  };

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-12">
          <h2>Shopping Cart {total} item</h2>
          <Button
            variant="danger"
            className="btn-sm mb-3"
            onClick={() => dispatch(clearAllCart())}
          >
            Clear item
          </Button>
          <Button
            variant="info"
            className="btn-sm mb-3 ml-4"
            onClick={goPagePdf}
          >
            Report PDF
          </Button>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No.</th>
                <th>Product ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((c, index) => (
                <tr key={c.id}>
                  <td>{index + 1}</td>
                  <td>{c.id}</td>
                  <td>{c.name}</td>
                  <td>{c.price}</td>
                  <td>{c.qty}</td>
                  <td>{c.price * c.qty}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
