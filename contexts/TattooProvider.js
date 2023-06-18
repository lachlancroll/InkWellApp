import React, { useState } from 'react';
import TattooContext from './TattooContext';

export const TattooProvider = ({ children }) => {
  const [tattooUri, setTattooUri] = useState(null);

  return (
    <TattooContext.Provider value={{ tattooUri, setTattooUri }}>
      {children}
    </TattooContext.Provider>
  );
};
