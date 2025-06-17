import React, { useEffect } from 'react';

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [logout, setLogout] = React.useState(false);

  useEffect(() => {
    // ... existing code ...
  }, [logout]);

  return (
    <AuthContext.Provider value={{ logout, setLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth }; 