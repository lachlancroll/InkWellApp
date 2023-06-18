import React, { useState } from 'react';
import PhotoContext from './PhotoContext';

export const PhotoProvider = ({ children }) => {
  const [photoUri, setPhotoUri] = useState(null);

  return (
    <PhotoContext.Provider value={{ photoUri, setPhotoUri }}>
      {children}
    </PhotoContext.Provider>
  );
};
