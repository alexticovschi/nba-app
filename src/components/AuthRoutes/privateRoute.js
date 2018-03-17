import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const PrivateRoute = ({
    user,
    component: Dashboard,
    ...rest
}) => {
    console.log('user', user)
    return <Route {...rest} component={(props) => {
                    // if the user is authenticated, return the dashboard component
                    // else, redirect the user to the sign-in page
                    return user ? 
                        <Dashboard {...props} user={user} />
                    :
                        <Redirect to="/sign-in" />
                }} 
            />
}


export default PrivateRoute;
