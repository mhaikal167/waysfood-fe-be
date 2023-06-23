import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import MarkerMap from "@Assets/images/marker.png";

export default function Map(props) {
  const { handleMapClick, selectedLat, selectedLng } = props;

  const icon = L.icon({
    iconUrl: MarkerMap,
    iconSize: [38, 36],
  });

  function MapEvents() {
    useMapEvents({
      click: handleMapClick,
    });

    return null;
  }
  const centerMap = [-6.17781214899621, 106.82685538905109];
  return (
    <>
      <div className="w-[50vw] h-[100%] border border-secondary">
        <MapContainer
          center={centerMap}
          zoom={14}
          scrollWheelZoom={true}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=J77uFt2uiTPaxmyhQdN4"
          />
          <MapEvents />
          {selectedLat && selectedLng && (
            <Marker
              position={[selectedLat, selectedLng]}
              draggable={true}
              animate={true}
              icon={icon}
            >
              <Popup>Hey ! you found me</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </>
  );
}
