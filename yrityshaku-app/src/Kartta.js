import React from "react";
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import Geocode from "react-geocode";

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

class Kartta extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isMarkerShown: false,
      lat: 63.057522,
      lng: 26.207678
    }
  }

  // haetaan koordinaatit osoitteen perusteella Googlen Geocoding api:lla (react-geocode)
  getLocation() {
    Geocode.setApiKey(API_KEY);
    Geocode.setLanguage("fi");
    Geocode.setRegion("fi");
    Geocode.enableDebug();
    Geocode.fromAddress(this.props.address + this.props.city).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
        // console.log(response.results[0].geometry.location);
        this.setState(
          { lat: parseFloat(lat), lng: parseFloat(lng) }
        )
      },
      error => {
        console.error(error);
      }
    );
  }

  render() {
    this.getLocation();
    return (
      // kutsutaan MapComponenttia, jolle viedään yrityksen koordinaatit
      <MapComponent
        lat={this.state.lat}
        lng={this.state.lng}
      />
    )
  }
}

// Komponentti piirtää kartan ja laittaa markerin annettuun koordinaattiin eli yrityksen osoitteen kohdalle (react-google-maps)
const MapComponent = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key='+API_KEY+'&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `500px` }} />,
    mapElement: <div style={{ height: `100%` }} />,

  }),

  withScriptjs,
  withGoogleMap
)((props) =>

  <GoogleMap
    defaultZoom={6}
    defaultCenter={{ lat: 63.057522, lng: 26.207678 }}
    center={{ lat: props.lat, lng: props.lng }}
    zoom={14}>
    <Marker position={{ lat: props.lat, lng: props.lng }} />
  </GoogleMap>
)

export default Kartta;
