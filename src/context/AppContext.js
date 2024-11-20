import React, { createContext, useState } from "react";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [loadingActive, setLoadingActive] = useState(false);

  const startLoading = () => setLoadingActive(true);
  const stopLoading = () => setLoadingActive(false);

  return (
    <AppContext.Provider
      value={{
        loadingActive,
        startLoading,
        stopLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
