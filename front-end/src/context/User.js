import React, { useMemo, useState, createContext } from 'react';
import PropTypes from 'prop-types';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [userData, setUserData] = useState({});

  const contextValue = useMemo(() => ({
    userData,
    setUserData,
  }), []);

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.instanceOf('Object'),
}.isRequired;
