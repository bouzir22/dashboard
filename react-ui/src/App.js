import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import  { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { LOGOUT } from './store/actions';
import routes, { renderRoutes } from './routes';
import { BASENAME } from './config/constant';
const App = () => {

    const dispatch = useDispatch();

    // Add an event listener for the beforeunload event
    useEffect(() => {
      const handleBeforeUnload = (e) => {
        // Trigger the logout action when the user is about to leave the page
        dispatch(LOGOUT);
        // Show a confirmation message to the user (optional)
        e.returnValue = ''; // This message will be displayed to the user, e.g., "Changes you made may not be saved."
      };
  
      window.addEventListener('beforeunload', handleBeforeUnload);
  
      // Cleanup the event listener when the component unmounts
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }, [dispatch]);

    return (
        <React.Fragment>
          
            <Router basename={BASENAME}>{renderRoutes(routes)}</Router>
        </React.Fragment>
    );
};

export default App;
 