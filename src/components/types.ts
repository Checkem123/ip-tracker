import { LatLngExpression } from "leaflet";

export interface Fetch {
    ip: string;
    location: {
        country: string;
        region: string;
        city: string;
        lat: number;
        lng: number;
        postalCode: string;
        timezone: string;
        geonameId: number;
    };
    domains: [string, string, string, string, string];
    as: {
        asn: number;
        name: string;
        route: string;
        domain: string;
        type: string;
    };
    isp: string;
}

export interface HeaderProps {
    fetchData: (input: string) => void;
    data: Fetch | null;
}

export type MarkerType = {
    geocode: LatLngExpression;
    popUp: string;
};

export interface MapProps {
    data: Fetch | null;
}
