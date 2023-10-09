import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import InfoBox from './google-maps/InfoBox';
import MarkerClusterer from './google-maps/MarkerClusterer';
import Marker from './google-maps/Marker';
import StreetViewPanorma from './google-maps/StreetViewPanorma';
import ModuleNotification from '../../components/Widgets/Statistic/Notification';

import fetch from 'isomorphic-fetch';

const GoogleMaps = () => {
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        const url = [
            // Length issue
            `https://gist.githubusercontent.com`,
            `/farrrr/dfda7dd7fccfec5474d3`,
            `/raw/758852bbc1979f6c4522ab4e92d1c92cba8fb0dc/data.json`
        ].join('');

 ;

        return () => {
            setMarkers([]);
        };
    }, []);

    return (
        <div>data</div>
  
    );
};

export default GoogleMaps;
