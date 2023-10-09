const { compose, withProps } = require('recompose');

const { withScriptjs, withGoogleMap, GoogleMap, StreetViewPanorama, OverlayView } = require('react-google-maps');

const getPixelPositionOffset = (width, height) => ({
    x: -(width / 2),
    y: -(height / 2)
});

const StreetViewPanormaWithAnOverlayView = compose(
    withProps({
        googleMapURL:
            'https://maps.googleapis.com/maps/api/js?key=AIzaSyAChufWiMfwsmyX3Se1dRaN4t31z0xmIMo&v=3.exp&libraries=geometry,drawing,places',
  
    }),
    withScriptjs,
    withGoogleMap
)((props) => (
    <div></div>
 
));

export default StreetViewPanormaWithAnOverlayView;
