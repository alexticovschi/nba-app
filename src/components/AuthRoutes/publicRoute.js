import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const PublicRoute = ({
    user,
    component: Component,
    ...rest
}) => {
    return <Route {...rest} component={(props) => {
                    return rest.restricted ?
                        ( // if the user is logged in, redirect the user to dashboard,
                          // else send user to sign-in page
                            user ? 
                                <Redirect to="/dashboard"/>
                            :
                                <Component {...props} user={user} />
                        )
                    :   // by default send user to whatever route they are trying to enter
                        <Component {...props} user={user} />
                }} 
            />
}


export default PublicRoute;