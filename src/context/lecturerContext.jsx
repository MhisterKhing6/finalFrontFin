import { createContext, useState } from "react";
import { getFromBackend } from "../utils/backendCalls";
import { token } from "../utils/config";
import { getToken } from "../utils/localstorage";

const LecturerContext = createContext()

const  loadDetails = async (setData, lecturer, setLoading, setAuth, redirect) => {
    let userToken = getToken(token.lecturerTokenKey)
    if(lecturer.name) {
        setLoading(false)
        return true
    }
    if(userToken){
        let response = await getFromBackend("/user/lecturer/me",userToken)
        if(response.status === 403) {
            response = await postToBackend("/auth/lecturer/refresh/token",{refresh_token: getToken(token.lecturerRefresh)})
            //save new tokens
            if(response.status === 200) {
            saveToken(token.lecturerTokenKey, response.data.token)
            saveToken(token.lecturerRefresh, response.data.refresh_token)
            //use token to get new data
            response = await getFromBackend("/user/lecturer/me",getToken(token.lecturerTokenKey))
            }
        }
        if(response.status === 200) {
            setData({...response.data})
            setAuth(true)
            setLoading(false)
            console.log(lecturer)
            return true
        }
         else {
            setLoading(false)
            return redirect("/auth/login/lecturer")
         }
         
    }else {
        setLoading(false)
        return redirect("/auth/login/lecturer")
    }
    
}

const loadAssignment = async (assignment, setAssignment, setLoading) =>{
    if(true) {
        //do the loading here
        let url = '/coder/lecturer/assignments'
        let response = await getFromBackend(url, getToken(token.lecturerTokenKey))
        //check if there is error
        console.log(response)
        if(response.status !== 200)
            {
                alert(response.data.message)
            }
        else {
            let close = 0;
            let open  = 0;
            let future = 0;
            const options = {
                year: 'numeric',
                month: 'short',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true, // Use 12-hour time format
              };
              // Convert to desired format
                let assDetails = response.data.map((ass => {
                    let startDate = new Date(ass.startDate)
                    let endDate = new Date(ass.endDate)
                    let now = new Date()
                    //check if date is close
                    if(startDate <= now && endDate >= now){
                        ass.status = "Open"
                        open += 1
                    }
                    //check if assignment is close
                    if(now > endDate) {
                        ass.status = "Close"
                        close += 1
                    }
                    //check if future
                    if(startDate > now) {
                        ass.status = "Future"
                        future += 1
                    }
                    ass.startDate = startDate.toLocaleString('en-GB', options).replace(',', '')
                    ass.endDate = endDate.toLocaleString('en-GB', options).replace(',', '')
                    ass.class = {name: ass.Class.className}
                    return ass
                }))
                let total = close + future + open
                let assObject = {total, close, future, open, assignments:assDetails}
                setAssignment(assObject)
        }

    }
    setLoading(false)
}

const LecturerContextProvider = ({children}) => {
    let [lecturer, setLecturer] = useState({})
    let [assignment, setAssignment] = useState({"open": 0, close:0, future:0, total:0, assignments:[]})
    let [authenticated, setAuthenticated] = useState(getToken(token.lecturerTokenKey)? true : false)
    

    return (<LecturerContext.Provider value={{loadAssignment,assignment, setAssignment,lecturer,authenticated, setAuthenticated, loadDetails, setLecturer}}>
            {children}
            </LecturerContext.Provider>)
}

export { LecturerContext, LecturerContextProvider };
