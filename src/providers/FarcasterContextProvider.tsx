'use client';
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import { ContextType, FrameContextType } from '@/types';
import sdk from '@farcaster/frame-sdk';

const Context = createContext<ContextType | undefined>(undefined);

export const ContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [context, setContext] = useState<FrameContextType | undefined>(
    undefined
  );

  const loadContext = async () => {
    const contextData = await sdk.context;
    setContext(contextData);
    sdk.actions.ready();
  };

  useEffect(() => {
    loadContext();
  }, []);
  return (
    <Context.Provider value={{ context, setContext }}>
      {children}
    </Context.Provider>
  );
};

export const useFrameContext = (): ContextType => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('No data found');
  }
  return context;
};
