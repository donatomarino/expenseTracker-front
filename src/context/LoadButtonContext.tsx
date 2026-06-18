import React, { createContext, useState } from 'react';
import type { LoadButtonContextType, LoadButtonProviderProps } from '../types/types';

// Creamos el contexto
export const LoadButtonContext = createContext<LoadButtonContextType | undefined>(undefined);

// Creamos el proveedor del contexto
export const LoadButtonProvider = ({ children }: LoadButtonProviderProps) => {
  const [loadButton, setLoadButton] = useState<boolean>(false); // Estado inicial

  // Función para desabilidar los buttons
  const disabledButton = (): void => {
    setLoadButton(prev => !prev);
  };

  return (
    <LoadButtonContext.Provider value={{ loadButton, disabledButton }}>
      {children}
    </LoadButtonContext.Provider>
  );
};