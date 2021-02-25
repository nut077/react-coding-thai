import { useEffect, useState } from 'react';
import axios from 'axios';
import TopBarProgress from 'react-topbar-progress-indicator';
import ErrorPage from '../ErrorPage';
import { th } from 'date-fns/locale';
import { Table } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';

const pageSize = 10;

const HospitalPage = () => {
  const [hospital, setHospital] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const getHospital = async (page) => {
    try {
      setLoading(true);
      const hospital = await axios.get(
        `https://api.codingthailand.com/api/hospital2?page=${page}&page_size=${pageSize}`
      );
      setHospital(hospital.data.data);
      setPageCount(hospital.data.meta.pagination.total_pages);
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHospital(page);
  }, [page]);

  const setPagination = (data) => {
    const page = data.selected + 1;
    setPage(page);
    getHospital(page);
  };

  if (error) {
    return <ErrorPage error={error.response.data.message} />;
  }

  return (
    <>
      {loading && <TopBarProgress />}
      <div className="container">
        <div className="row mt-4">
          <div className="col-md-12">
            <h2>Hospital</h2>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Code</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {hospital.map(({ id, code, h_name }) => (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>{code}</td>
                    <td>{h_name}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
        <ReactPaginate
          previousLabel={'← Previous'}
          nextLabel={'Next →'}
          pageCount={pageCount}
          marginPagesDisplayed={3}
          onPageChange={setPagination}
          containerClassName={'pagination'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          disabledClassName={'disabled'}
          activeClassName={'active'}
          breakClassName={'page-item'}
          breakLinkClassName={'page-link'}
        />
      </div>
    </>
  );
};

export default HospitalPage;
