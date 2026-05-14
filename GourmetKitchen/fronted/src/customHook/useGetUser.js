import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
export default function useGetUser(intialValue){
    const [user , setUser] = useState(intialValue);

    async function getUser() {
    try {
      const response = await axiosInstance("user" , {withCredentials : true});
      setUser(response.data.data[0])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getUser();
  } , [])
    return [user]
}