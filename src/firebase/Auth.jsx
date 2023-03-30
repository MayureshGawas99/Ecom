// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile} from "firebase/auth"
import { useState,useEffect } from "react";
import { createContext,useContext } from "react";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDr7Oj64kM7BqsGixA-z9PHFuuC18WbFrg",
  authDomain: "ecomm-c8d30.firebaseapp.com",
  projectId: "ecomm-c8d30",
  storageBucket: "ecomm-c8d30.appspot.com",
  messagingSenderId: "136639738659",
  appId: "1:136639738659:web:f71780b49f36a6b0a0d296"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const AuthContext = createContext(null);

const AuthProvider = ({children}) =>{
    const auth = useProvideAuth();
    return <AuthContext.Provider value={auth}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);

function useProvideAuth(){
    const [user,setUser] = useState();

    const signUp = (email,password,displayName) => createUserWithEmailAndPassword(auth,email,password).then(({user})=>{
        updateProfile(user,{displayName});
        setUser(user);
        return user;
    });

    const signIn = (email,password) => signInWithEmailAndPassword(auth,email,password).then(({user})=> {
        setUser(user);
        return user;
    })

    const signOutUser = ()=> signOut(auth).then(()=>setUser(null));

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,(user)=>{
            user? setUser(user): setUser(null)
        });
        return ()=> unsubscribe();
    })

    return{
        signIn,signUp,signOut:signOutUser,user
    }

}

export default AuthProvider;