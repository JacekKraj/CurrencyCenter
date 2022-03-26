import React from 'react';

import AuthContextProvider from './providers/AuthContextProvider';

interface Props {
  children: React.ReactNode;
}

const GlobalContexts: React.FC<Props> = ({ children }) => {
  return <AuthContextProvider>{children}</AuthContextProvider>;
};

export default GlobalContexts;
