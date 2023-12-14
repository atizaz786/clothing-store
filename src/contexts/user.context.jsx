import { createContext, useEffect, useState } from "react";

import { onAuthStateChangedListener } from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
currentUser: null,
setCurrentUser: () => null,
});  //null is the default value of the context

export const UserProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };


    useEffect(() => {
       const unsubscribe =  onAuthStateChangedListener( (user) => {
        console.log(user)
            // if (user) {
            //     setCurrentUser(user);
            // }
            // else {
            //     setCurrentUser(null);
            // }
        }
        )
        return unsubscribe
    }, []);
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}