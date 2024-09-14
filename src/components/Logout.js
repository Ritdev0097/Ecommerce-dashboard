import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

let Logout = ()=>{

    let navigate = useNavigate();

    useEffect(()=>{
        let login = localStorage.clear();

        if(!login){
            navigate("/Login");
        }
    });
}

export default Logout;