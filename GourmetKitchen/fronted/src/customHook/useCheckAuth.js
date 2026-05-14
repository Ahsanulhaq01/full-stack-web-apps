import { useEffect , useState } from "react"
import axiosInstance from "../utils/axiosInstance";

export default function useCheckAuth(intialValue){
    const [isAuth , setIsAuth] = useState(intialValue);

    useEffect(()=>{
        async function checkAuth() {
        try {
            await axiosInstance.get('user/check-auth' , {withCredentials : true})
            setIsAuth(true)
        } catch (error) {
            console.log(error.message)
            setIsAuth(false)
        }
    }
        checkAuth();
    } ,[])

    return [isAuth , setIsAuth];
}