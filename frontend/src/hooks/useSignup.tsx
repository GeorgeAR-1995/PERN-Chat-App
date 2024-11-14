
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

interface SignUpParams {
    fullName: string;
    username: string;
    password: string;
    confirmPassword: string;
    //this gender type is imported from prisma as it is not a string but an enum
    gender: string;
}

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const signUp = async(inputs: SignUpParams) => {
        // const success = handleInputErrors(inputs);
        // if (!success) return;

        try {
            setLoading(true);
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(inputs)
            });

            const data = await res.json();
            console.log(data)

            if(!res.ok) throw new Error(data.error);
            setAuthUser(data);
            
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false)
        }
    };

    return { loading, signUp }

};

export default useSignup;
