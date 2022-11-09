import React from 'react'
import { authService, signOut } from 'fbase';
import { useHistory } from 'react-router-dom';

const Profile = () => {
    const history = useHistory();
    const onLogOutClick = () => {
        signOut(authService);
        history.push('/');
    }
    
    return (
        <>
            <button onClick={onLogOutClick}>LogOut</button>
        </>
    )
}

export default Profile;
