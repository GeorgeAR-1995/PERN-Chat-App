
import { useState } from 'react';
import toast from 'react-hot-toast';

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

        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false)
        }
    };

    return { loading, signUp }

};

export default useSignup;

function handleInputErrors({ fullName, username, password, confirmPassword, gender }: SignUpParams) {

    if(!fullName || !username || !password || !confirmPassword || !gender) {
        toast.error('Please fill all the fields.')
        return false;
    }

    if(password !== confirmPassword) {
        toast.error('Make sure passwords match.')
        return false;
    }

    if(password.length <6) {
        toast.error('Password must be at least 6 characters.')
        return false;
    }
};