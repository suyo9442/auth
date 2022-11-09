import React, {useState} from 'react';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Auth from 'routes/Auth';
import Home from 'routes/Home';
import Profile from 'routes/Profile';
import Navigation from 'components/Navigation';

const AppRouter = ({isLoggedIn}) => {
    console.log(isLoggedIn)
    return (
        <Router>
            {/* isLoggedIn이 true 일 때 Navigation 활성화 */}
            {isLoggedIn && <Navigation/>}
            
            <Switch>
                {/* 로그인이 안됐으면 로그인화면 / 됐으면 홈화면 */}
                {isLoggedIn ? 
                (
                    <>
                        <Route path='/'><Home/></Route>
                        <Route path='/profile'><Profile/></Route>
                        {/* <Redirect from="*" to="/" /> */}
                    </>
                
                
                ) : 
                (
                    <>
                        <Route path='/'><Auth/></Route>
                        {/* <Redirect from="*" to="/" /> */}
                    </>
                )
                }
            </Switch>
        </Router>
    )
}

export default AppRouter;