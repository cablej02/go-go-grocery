import { useState, useEffect, useLayoutEffect } from "react";
import Login from "../components/Login.jsx";
import GroceryList from "../components/GroceryList.jsx"
import Error from "./Error";
import auth from '../utils/auth';
import { retrieveGroceryLists } from "../api/groceryListAPI.jsx"


const Home = () => {
    const [error, setError] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [lists, setLists] = useState([]);

    useLayoutEffect(() => {
        checkLogin();
    }, []);

    const checkLogin = () => {
        if(auth.loggedIn()){
            setLoggedIn(true);
        }
    };

    useEffect(()=> {
        if (loggedIn){
            fetchGroceryLists(); 
        }
    }, [loggedIn]);

    const fetchGroceryLists = async () => {
        try {
            const data = await retrieveGroceryLists();
            setLists(data);
        } catch (err) {
            console.error('Failed to retrieve tickets:', err);
            setError(true);
        }
    }
    
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
                    // load in grovery list
                    <GroceryList lists={lists}/>
                )}
        </>
    );
};

export default Home;
