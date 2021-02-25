import PropTypes from 'prop-types';

const ErrorPage = ({ error }) => (
  <div className="text-center mt-5">
    <p>เกิดข้อผิดพลาดจาก Server กรุณาลองใหม่</p>
    <p>{error}</p>
  </div>
);

ErrorPage.propTypes = {
  error: PropTypes.string.isRequired,
};

export default ErrorPage;
