import { useState, useLayoutEffect } from "react";
import GroceryList from "../components/GroceryList.jsx"
import Error from "./Error";
import auth from '../utils/auth';
import { retrieveGroceryLists } from "../api/groceryListAPI.jsx"

const Home = () => {
    const [error, setError] = useState(false);
    const [lists, setLists] = useState([]);

    useLayoutEffect(() => {
        checkLogin();
    }, []);

    const checkLogin = () => {
        if(!auth.loggedIn()){
            window.location.assign('/login');
        }else{
            fetchGroceryLists();
        }
    };

    const fetchGroceryLists = async () => {
        try {
            const data = await retrieveGroceryLists();
            setLists(data);
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
            <GroceryList lists={lists}/>
        </>
    );
};

export default Home;
