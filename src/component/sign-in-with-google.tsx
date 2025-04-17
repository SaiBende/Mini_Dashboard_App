import React, { useState, useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import GoogleButton from 'react-google-button';

function SignInWithGoogle() {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Redirect to /dashboard if the user is already signed in
    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    const handleSignInWithGoogle = () => {
        setLoading(true);
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                if (user && user.uid) {
                    setUser(user);
                    localStorage.setItem("user", JSON.stringify(user));
                    toast.success(`Welcome, ${user.displayName || "User"}!`, {
                        position: "top-right",
                        autoClose: 2000,
                    });
                    navigate("/dashboard");
                } else {
                    throw new Error("Invalid user object");
                }
            })
            .catch((error) => {
                console.error("Error during sign-in:", error.message, error.code);
                toast.error("Sign in failed. Please try again.", {
                    position: "top-right",
                    autoClose: 2000,
                });
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="flex items-center justify-center  bg-gray-100">
            <div className="bg-white shadow-md rounded p-3">
                <h1 className="text-center text-2xl font-bold m-4">Sign In</h1>
                <GoogleButton
                    className="mx-auto"
                    onClick={handleSignInWithGoogle}
                    disabled={loading}
                />
            </div>
        </div>
    );
}

export default SignInWithGoogle;