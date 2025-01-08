import Auth from "../utils/auth";

const retrieveGroceryLists = async (user_id) => {
    try{
        const response = await fetch (`/api/lists?owner_id=${user_id}`,{
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Auth.getToken()}`
            }
        }) 
        const data = await response.json();
        if (!response.ok){
            throw new Error("invalid grocery list api response, check network tab")
        }
        return data 
    } catch (error){
        console.log ("error from data retrieval", error)
        return []
    }
}