import { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { fetchApartments } from '../api/requests';
import { useStore, useStoreActions } from '../store';
import { getPortraitPhoto } from '../utils/utils';

import { IApartment } from '../types/types';

type PropertiesAPIType = {
  message: string,
  success: true,
  payload: IApartment[],
}

export const useApartments = () => {
  const { apartmentsList } = useStore();
  const { setApartmentsList, setApartments } = useStoreActions();

  const apartments = apartmentsList;
  // const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApartments().then((response: PropertiesAPIType) => {
      setLoading(false);
      setApartmentsList(response.payload);

      const apartmentsObj = response.payload.reduce((acc, curr) => {
        return { ...acc, [curr.id]: curr };
      }, {});
      setApartments(apartmentsObj);

      response.payload.forEach((apartment) => {
        const uri = getPortraitPhoto(apartment.images);
        Image.prefetch(uri);
      });
    });
  }, [setApartments, setApartmentsList]);

  return { loading, apartments };
};
