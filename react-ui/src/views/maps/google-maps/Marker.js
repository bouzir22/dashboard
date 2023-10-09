import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { compose } from 'recompose';

const MapWithAMarker = compose(
    withScriptjs,
    withGoogleMap
)((props) => (
    <div></div>
 
));

export default MapWithAMarker;
