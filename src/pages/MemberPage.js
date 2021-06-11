import React from 'react';
import { useSelector } from 'react-redux';

const MemberPage = () => {
  const profileRedux = useSelector((state) => state.authReducer.profile);
  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-12">
          <h1>For member only</h1>

          {profileRedux && (
            <p>
              Welcome {profileRedux.name} Email: {profileRedux.email}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberPage;
