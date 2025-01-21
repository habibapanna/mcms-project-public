import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    signInWithPopup,
    GoogleAuthProvider,
    updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import { setItem } from "localforage";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic()

    // Create user with email, password, name, and photo
    const createUser = async (email, password, name, photo) => {
        setLoading(true);
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            const newUser = result.user;

            // Update user profile with name and photo
            await updateProfile(newUser, {
                displayName: name,
                photoURL: photo,
            });

            // Update the state with the new user details
            setUser({
                ...newUser,
                displayName: name,
                photoURL: photo,
            });

            return result;
        } catch (error) {
            console.error("Error creating user:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const googleLogIn = () => {
        setLoading(true);
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            // console.log("current user", currentUser);
            if(currentUser){
                // get token and store client
                const userInfo = { email: currentUser.email };
                axiosPublic.post('/jwt', userInfo)
                  .then(res =>{
                    if(res.data.token) {
                       localStorage.setItem('access-token', res.data.token);
                    }
                  })
            }
            else{
                // TODO: remove token
                localStorage.removeItem('access-token');
            }
            setLoading(false);
        });
        return () => {
            return unsubscribe();
        };
    }, [axiosPublic]);

    const authInfo = {
        user,
        loading,
        createUser,
        login,
        googleLogIn,
        logOut,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
