import { useState, useEffect } from "react";
import { useNavigate} from "react-router-dom";
import axios from "axios";

 
const PrivateScreen = () => {
    const [privateData,setPrivateData] = useState("");
    const [error, setError] = useState("");
    const nav = useNavigate();
    
    useEffect(()=>{
        const GetPrivateData = async () => {      
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                  },
            }   
            try {
                const {data} = await axios.get("http://localhost:10625/api/priv",config);
                console.log(data);
                setPrivateData(data.data)

            } catch (error) {
                localStorage.removeItem("authToken");
                setError("You need to be logged for access to this page")
            }

        }
            GetPrivateData();
    },[nav])

    const logoutHandler = () => {
        localStorage.removeItem("authToken");
        nav("/login")
    }
  return (
     error ? (<span className="error-message" >{error}</span>) : (
     <>
     <div style={{background: "green",color: "white"}}>{privateData}</div>
     <button onClick={logoutHandler}> Logout </button>
     </>
     ))
}

export default PrivateScreen
