import Auth from "../utils/auth";

const retrieveGroceryLists = async () => {
    try{
        const response = await fetch(`/api/lists`,{
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Auth.getToken()}`
            }
        }) 
        const data = await response.json();
        if (!response.ok){
            throw new Error("Invalid grocery list api response, check network tab")
        }
        return data;
    } catch (error){
        console.log ("Error from data retrieval", error)
        return [];
    }
}

export { retrieveGroceryLists };