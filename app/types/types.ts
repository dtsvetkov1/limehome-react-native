export type HeaderIconType = {
    colorScheme: 'light' | 'dark',
};

export interface IApartmentLocation {
    lat: number,
    lng: number,
    city: string,
    postalCode: string,
    countryCode: string,
    addressLine1: string,
    countryName: string,
}

export interface IApartmentImage {
    url: string,
    is_portrait: boolean,
}

export interface IApartment {
    id: number;
    location: IApartmentLocation;
    city_id: number,
    name: string,
    distance: number,
    images: IApartmentImage[],
}

export interface IExtendedApartment extends IApartment {
    description: string,
}
// export type
