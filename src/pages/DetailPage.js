import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import TopBarProgress from 'react-topbar-progress-indicator';
import { Button, Card, CardDeck } from 'react-bootstrap';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';
import ErrorPage from './ErrorPage';

const DetailPage = () => {
  const { id, title } = useParams();
  const history = useHistory();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const cancelToken = useRef(null);

  const getProducts = async (id) => {
    try {
      setLoading(true);
      const products = await axios.get(
        `https://api.codingthailand.com/api/course/${id}`,
        {
          cancelToken: cancelToken.current.token,
        }
      );
      setProduct(products.data.data);
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cancelToken.current = axios.CancelToken.source();
    getProducts(id);

    return () => {
      cancelToken.current.cancel();
    };
  }, [id]);

  if (loading) {
    return <TopBarProgress />;
  }

  if (error) {
    return <ErrorPage error={error.response.data.message} />;
  }

  const goBack = () => {
    history.goBack();
  };

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-12">
          <Button variant="secondary" onClick={goBack}>
            Back
          </Button>
          <h2>
            {title} - {id}
          </h2>
          <div className="row">
            {product.length > 0 ? (
              <CardDeck>
                {product.map((p) => (
                  <div className="col-md-4" key={p.ch_id}>
                    <Card className="mb-4 shadow-sm">
                      <Card.Body>
                        <Card.Title>{p.ch_title}</Card.Title>
                        <Card.Text>
                          {format(new Date(p.ch_dateadd), 'dd MMM yyyy', {
                            locale: th,
                          })}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </CardDeck>
            ) : (
              <div className="mx-auto">Data not found</div>
            )}
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
