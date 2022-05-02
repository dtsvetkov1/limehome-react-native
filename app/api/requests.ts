import { Requests } from "../constants/requests";

const BASE_API_URL = Requests.BASE_API_URL;
const BERLIN_ID = '32';

type FetchWrapperProps = {
  // TODO replace with enums!
  path: string,
  method?: string,
}

const fetchWrapper = ({ path, method = 'GET' }: FetchWrapperProps) => {
  return fetch(`${BASE_API_URL}${path}`, {
    method,
  })
  .then(response => response.json());
}

export const fetchApartments = () => {
  // Hardcoded Berlin location here
  return fetchWrapper({ path: `${Requests.requests.apartments}?cityId=${BERLIN_ID}` });
}

export const fetchApartment = (id) => {
  return fetchWrapper({ path: `${Requests.requests.apartments}/${id}` });
}