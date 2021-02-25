import { useState } from 'react';
import axios, { CancelToken } from 'axios';
import TopBarProgress from 'react-topbar-progress-indicator';
import ErrorPage from '../ErrorPage';
import { th } from 'date-fns/locale';
import { Container, Table } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { useQuery } from 'react-query';

const pageSize = 10;

const HospitalPage = () => {
  const [page, setPage] = useState(1);

  const fetchHospital = (page) => {
    const source = CancelToken.source();
    const promise = axios
      .get(
        `https://api.codingthailand.com/api/hospital2?page=${page}&page_size=${pageSize}`,
        {
          cancelToken: source.token,
        }
      )
      .then((res) => res.data);
    promise.cancel = () => {
      source.cancel('Query was cancelled by React Query');
    };
    return promise;
  };

  const { isLoading, isFetching, error, data } = useQuery(
    ['hospitals', page],
    () => fetchHospital(page),
    { keepPreviousData: true }
  );

  const setPagination = (data) => {
    const page = data.selected + 1;
    setPage(page);
  };

  if (isLoading) {
    return <TopBarProgress />;
  }

  if (error) {
    return <ErrorPage error={error.response.data.message} />;
  }

  return (
    <Container>
      {isFetching && <TopBarProgress />}
      <div className="row mt-4">
        <div className="col-md-12">
          <h2>Hospital</h2>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th style={{ width: '10%' }}>Id</th>
                <th style={{ width: '10%' }}>Code</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map(({ id, code, h_name }) => (
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
        pageCount={data.meta.pagination.total_pages}
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
    </Container>
  );
};

export default HospitalPage;
