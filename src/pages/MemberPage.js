import React from 'react';
import { UserStoreContext } from '../context/UserStoreContext';

const MemberPage = () => {
  const userStore = React.useContext(UserStoreContext);

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-12">
          <h1>For member only</h1>

          {userStore.profile && (
            <p>
              Welcome {userStore.profile.name} Email: {userStore.profile.email}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberPage;
