import { useDispatch, useSelector } from 'react-redux';
import { getVersion } from '../redux/actions/authAction';
import { useQuery } from 'react-query';
import TopBarProgress from 'react-topbar-progress-indicator';
import ErrorPage from '../pages/ErrorPage';

const Footer = () => {
  const dispatch = useDispatch();
  const version = useSelector((state) => state.authReducer.version);

  const { isLoading, error } = useQuery('versionApi', () =>
    dispatch(getVersion())
  );

  if (isLoading) {
    return <TopBarProgress />;
  }

  if (error) {
    return <ErrorPage error={error.message} />;
  }

  return (
    <footer className="container-fluid fixed-bottom alert-light">
      <p>
        © Company 2017-{new Date().getFullYear()} API Version: {version}
      </p>
    </footer>
  );
};

export default Footer;
