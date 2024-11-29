import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import { CiVideoOn } from "react-icons/ci";

const Mark = ({ onClick }) => (
  <button className='border-2 rounded-full' onClick={onClick}>
    <CiVideoOn className='rounded-full bg-blue-400' size={28} color="black" />
  </button>
);

Mark.propTypes = {
  onClick: PropTypes.func.isRequired
};

const GoogleMap = ({ center = { lat: 10.99835602, lng: 77.01502627 }, zoom = 11, markers, onMarkerClick, onMapClick }) => {
  return (
    <div style={{ height: '82vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_MAPS_KEY }}
        defaultCenter={center}
        defaultZoom={zoom}
        onClick={({ lat, lng }) => onMapClick({ lat, lng })}
      >
        {markers.map((marker) => (
          <Mark
            key={marker.routeId}
            lat={marker.lat}
            lng={marker.lng}
            onClick={() => onMarkerClick(marker.routeId)}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
};

GoogleMap.propTypes = {
  center: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  }).isRequired,
  zoom: PropTypes.number,
  markers: PropTypes.arrayOf(PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
    routeId: PropTypes.string.isRequired
  })).isRequired,
  onMarkerClick: PropTypes.func.isRequired,
  onMapClick: PropTypes.func.isRequired
};

export default GoogleMap;