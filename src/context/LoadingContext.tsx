import React, { createContext, useState } from 'react';
import type { LoadingContextType, LoadingProviderProps } from '../types/types';

// Create context
export const LoadingContext = createContext<LoadingContextType>({
  loadButton: false,
  disabledButton: () => { },
  reload: false,
  triggerReload: () => { },
});

// Create provider of context
export const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [loadButton, setLoadButton] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);

  const disabledButton = (): void => {
    setLoadButton(prev => !prev);
  };

  const triggerReload = (): void => {
    setReload(prev => !prev);
  }

  return (
    <LoadingContext.Provider value={{ loadButton, disabledButton, reload, triggerReload }}>
      {children}
    </LoadingContext.Provider>
  );
};