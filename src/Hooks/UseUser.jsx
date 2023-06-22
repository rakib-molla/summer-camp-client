import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import UseAxiosSecure from "./UseAxiosSecure";


const UseUser = () => {
    const {user, loading} = UseAuth();
    const [axiosSecure] = UseAxiosSecure();

    const {data: isUser, isLoading: isUserLoading} = useQuery({
        queryKey: ['isUser', user?.email],
        enabled: !loading,
        queryFn: async ()=>{
            const res = await axiosSecure.get(`users/${user?.email}`);
            return res.data.user;
        }
    })
    return [isUser, isUserLoading]
};

export default UseUser;