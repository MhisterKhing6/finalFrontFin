import { createContext, useEffect, useState } from "react";
import { getFromBackend, postToBackend } from "../utils/backendCalls";
import { token } from "../utils/config";
import { getToken, saveToken } from "../utils/localstorage";


const StudentContext = createContext()

const  loadDetails = async (setData, student, setLoading, setAuth, redirect) => {
    let userToken = getToken(token.studentTokenKey)
    if(student.name) {
        setLoading(false)
        return true
    }
    if(userToken){
        let response = await getFromBackend("/user/student/me",getToken(token.studentTokenKey))
        if(response.status === 403) {
            response = await postToBackend("/auth/student/refresh/token",{refresh_token: getToken(token.studentRefresh)})
            //save new tokens
            saveToken(token.studentTokenKey, response.data.token)
            saveToken(token.studentRefresh, response.data.refresh_token)
            //use token to get new data
            response = await getFromBackend("/user/student/me",getToken(token.studentTokenKey))
        }
        if(response.status === 200) {
            setData({...response.data})
            setAuth(true)
            setLoading(false)
            return true
        }
         else {
            alert(response.data.reason)
            setLoading(false)
            return redirect("/auth/login/student")
         }
         
    }else {
        setLoading(false)
        return redirect("/auth/login/student")
    }
    
}


const StudentContextProvider = ({children}) => {
    const [student, setStudent] = useState({})
    const [loading, setLoading] = useState(true)
    const [authenticated, setAuthenticated] = useState(getToken(token.studentTokenKey)? true : false)
    
    return (<StudentContext.Provider value={{loadDetails, authenticated, setAuthenticated,student, setStudent, loading, setLoading}}>
            {children}
            </StudentContext.Provider>)
}

export { StudentContextProvider, StudentContext };
