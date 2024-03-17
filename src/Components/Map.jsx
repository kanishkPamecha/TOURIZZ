// import React from 'react';
// import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

// class MapComponent extends React.Component {
//   render() {
//     const { google, coordinates } = this.props;

//     return (
//       <Map
//         google={google}
//         style={{ width: '100%', height: '400px', position: 'relative' }}
//         initialCenter={coordinates}
//         zoom={14}
//       >
//         <Marker position={coordinates} />
//       </Map>
//     );
//   }
// }

// export default GoogleApiWrapper({
//   apiKey: 'YOUR_API_KEY' 
// })(MapComponent);
import React from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function SimpleMap(){
  const defaultProps = {
    center: {
      lat: 26.7654,
      lng:75.8537
    },
    zoom: 11
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{marginLeft:'70%' ,height: '60vh', width: '50vh' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
}