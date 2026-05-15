import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
export default function useGetUser(intialValue) {
  const [user, setUser] = useState(intialValue);



  useEffect(() => {
    async function getUser() {
      try {
        const response = await axiosInstance("user", { withCredentials: true });
        setUser(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    getUser();
  }, [user?.profileImage])
  return [user]
}