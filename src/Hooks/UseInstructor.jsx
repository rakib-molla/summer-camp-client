import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import UseAxiosSecure from "./UseAxiosSecure";


const UseInstructor = () => {
    const {user, loading} = UseAuth();
    const [axiosSecure] = UseAxiosSecure();

    const {data: isInstructor, isLoading: isInstructorLoading} = useQuery({
        queryKey: ['isInstructor', user?.email],
        enabled: !loading,
        queryFn: async()=>{
            const res = await axiosSecure.get(`users/${user?.email}`);
            return res.data.instructor;
        }
    })
    return [isInstructor, isInstructorLoading]
};

export default UseInstructor;