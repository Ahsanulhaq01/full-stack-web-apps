import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
// export default function useGetUser(intialValue) {
//   const [user, setUser] = useState(intialValue);



//   useEffect(() => {
//     async function getUser() {
//       try {
//         const response = await axiosInstance.get("user/current_user");
//         setUser(response.data.data)
//       } catch (error) {
//         console.log(error)
//       }
//     }
//     getUser();
//   }, [user?.profileImage])
//   return [user]
// }


export default function useGetUser(id) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      setLoading(true);
      try {
        const url = id
          ? `/user/profile/${id}` // another user's profile
          : `/user/current_user`; // logged-in user's profile

        const response = await axiosInstance.get(url);

        setUser(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getUser();
  }, [id]);

  return [user, setUser, loading];
}