import { useState, useEffect, useLayoutEffect } from "react";
import Login from "../components/Login.jsx";
import Error from "./Error";
import auth from '../utils/auth';

const Home = () => {
    const [error, setError] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    useLayoutEffect(() => {
        checkLogin();
    }, []);

    const checkLogin = () => {
        if(auth.loggedIn()){
            setLoggedIn(true);
        }
    };

    // const fetchUser = async (id) => {
    //     try {
    //         const data = await retrieveUser(id);
    //         setUser(data)
    //     } catch (err) {
    //         console.error('Failed to retrieve tickets:', err);
    //         setError(true);
    //     }
    // }

    if (error) {
        return <Error />;
    }

    return (
        <>
            {
                !loggedIn ? (
                    <Login />
                ) : (
                    
                    <p>logged in</p>
                )}
        </>
    );
};

export default Home;
