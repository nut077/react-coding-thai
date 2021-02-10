import { useState, useEffect } from 'react';
import { Badge, Image, Table } from 'react-bootstrap';
import axios from 'axios';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';

const ProductPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get('https://api.codingthailand.com/api/course')
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
              </tr>
            </thead>
            <tbody>
              {products.map(({ id, title, detail, date, view, picture }) => (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{title}</td>
                  <td>{detail}</td>
                  <td>
                    {format(new Date(date), 'dd/MM/yyyy', { locale: th })}
                  </td>
                  <td>
                    <Badge variant="success">{view}</Badge>
                  </td>
                  <td>
                    <Image src={picture} thumbnail alt={title} width={100} />
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
