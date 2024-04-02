import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression, Icon } from "leaflet";
import markerIcon from "../assets/icon-location.svg";
import MarkerClusterGroup from "react-leaflet-cluster";
import { MarkerType } from "./types";
import { MapProps } from "./types";

const Map = ({ data }: MapProps) => {
    const marker: MarkerType[] = [
        {
            geocode: [
                data?.location.lat,
                data?.location.lng,
            ] as LatLngExpression,
            popUp: `${data?.location.city}`,
        },
    ];

    const customIcon = new Icon({
        iconUrl: markerIcon,
        iconSize: [28, 38],
    });
    return (
        <MapContainer
            center={[
                data ? data?.location.lat : 37.40599,
                data ? data?.location.lng : -122.078514,
            ]}
            zoom={6}
        >
            {/* Basic map */}
            {/* <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                /> */}

            {/* Skin map */}
            <TileLayer
                attribution='<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"
            />

            <MarkerClusterGroup chunkedLoading>
                {marker.map((marker, index) => (
                    <Marker
                        key={index}
                        position={marker.geocode}
                        icon={customIcon}
                    >
                        <Popup>
                            <h2>{marker.popUp}</h2>
                        </Popup>
                    </Marker>
                ))}
            </MarkerClusterGroup>
        </MapContainer>
    );
};

export default Map;
