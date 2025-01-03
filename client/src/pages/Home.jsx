import { useState, useEffect, useLayoutEffect } from "react";
import { retrieveUser, retrieveUserByEmail, updateUser } from "../api/userAPI";
import Error from "./Error";
import UserList from '../components/Users';
import auth from '../utils/auth';

const Home = () => {

    const [user, setUser] = useState([]);
    const [error, setError] = useState(false);
    const [loginCheck, setLoginCheck] = useState(false);

    useEffect(() => {
        if (loginCheck) {
            fetchUser(1);
        }
    }, [loginCheck]);

    useLayoutEffect(() => {
        checkLogin();
    }, []);

    const checkLogin = () => {
        if (auth.loggedIn()) {
            setLoginCheck(true);
        }
    };

    const fetchUser = async (id) => {
        try {
            const data = await retrieveUser(id);
            setUser(data)
        } catch (err) {
            console.error('Failed to retrieve tickets:', err);
            setError(true);
        }
    }

    if (error) {
        return <Error />;
    }

    return (
        <>
            {
                !loginCheck ? (
                    <div className='login-notice'></div>
                ) : (
                    
                    <UserList user={user} />
                )}
        </>
    );
};

export default Home;
