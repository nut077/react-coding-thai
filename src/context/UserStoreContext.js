import React, { useState } from 'react';

export const UserStoreContext = React.createContext(null);

const UserStoreProvider = ({ children }) => {
  const [profile, setProfile] = useState();

  const userStore = {
    profile: profile,
    updateProfile: (profile) => setProfile(profile),
  };

  return (
    <UserStoreContext.Provider value={userStore}>
      {children}
    </UserStoreContext.Provider>
  );
};

export default UserStoreProvider;
