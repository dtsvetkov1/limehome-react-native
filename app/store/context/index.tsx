import React, {
  useContext, useMemo, useState,
} from 'react';
import { IApartment, IExtendedApartment } from '../../types/types';

interface IStore {
  apartmentsList: IApartment[],
  apartments: {
    [id: number]: IExtendedApartment,
  },
  setApartmentsList: (apartments: IApartment[]) => void;
  setApartments: (value: {[id: number]: IExtendedApartment}) => void,
}

const defaultStore: IStore = {
  apartmentsList: [],
  apartments: {},
  setApartmentsList: ([]) => null,
  setApartments: ({}) => null,
};

export const StoreContext = React.createContext(defaultStore);

export function StoreProvider(props: { children: React.ReactNode}) {
  const [apartmentsList, setApartmentsList] = useState(defaultStore.apartmentsList);
  const [apartments, setApartments] = useState(defaultStore.apartments);

  const contextValue = useMemo(() => ({
    apartmentsList,
    setApartmentsList,
    apartments,
    setApartments,
  }), [apartmentsList, apartments]);

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
}

export function StoreConsumer(props: { children: React.ReactNode}) {
  return (
    <StoreContext.Consumer>
      {props.children}
    </StoreContext.Consumer>
  );
}

export function useStoreContext() {
  const storeContext = useContext(StoreContext);
  return storeContext;
}

export function useStore() {
  const { apartments, apartmentsList } = useContext(StoreContext);
  return { apartments, apartmentsList };
}

export function useStoreActions() {
  const { setApartments, setApartmentsList } = useContext(StoreContext);
  return { setApartments, setApartmentsList };
}
