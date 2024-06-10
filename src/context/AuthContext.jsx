// context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import jwtDecode from 'jwt-decode'; // Import jwt-decode
import axios from 'axios';
import { Cookies } from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check for token in local storage
        const token = Cookies.get('token');
        if (token) {
            const decodedUser = jwtDecode(token);
            // Fetch user data with the token
           const res =  axios.get(`${process.env.NEXT_PUBLIC_SERVER}/user/${decodedUser.user_id}`)
               if(res.status === 200){
                   setUser(res.data.data);
                   setLoading(false);
               }
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
