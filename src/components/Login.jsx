// import React from 'react'
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import app from '../Firebase/firebase.config';
// import { getAuth } from "firebase/auth";
// import App from '../App';


// const Login = () => {
//     const auth = getAuth();
// const GoogleProvider = new GoogleAuthProvider();

// const handleLogin = () => {
//     signInWithPopup(auth, GoogleProvider).then((result) => {
        
   
//         const user = result.user;
//         console.log(user);
//         if (user) {
//             // User is signed in, redirect to the dashboard or another page
//             return(

//                 <App />
//             )
//           }
      
//         // ...
//       }).catch((error) => {
    
//         const errorMessage = error.message;
//         // The email of the user's account used.
//         const email = error.customData.email;
//         // The AuthCredential type that was used.
//         const credential = GoogleAuthProvider.credentialFromError(error);
//         // ...
//       });
// }

//   return (
   

//     <div className='h-screen w-full flex items-center justify-center'>
//         <button className='bg-blue px-8 py-2 text-white' onClick={handleLogin}>Login</button>
      
//     </div>
//   )
// }

// export default Login


// src/components/Login.js
// import { trusted } from 'mongoose';
// 

// 

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!email || !password) {
            setError('Please fill in all fields');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json(); // Await response before parsing JSON

            if (response.ok) { // Check if response is successful
                // Store the token in local storage
                localStorage.setItem('token', data.token);
                navigate('/'); // Redirect to a dashboard or home page
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setError('An error occurred. Please try again.');
        }

        setLoading(false);
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
                <div className="mb-4">
                    <label className="block mb-1">Email</label>
                    <input
                        type="email"
                        className="w-full p-2 border rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Password</label>
                    <input
                        type="password"
                        className="w-full p-2 border rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue text-white p-2 rounded"
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default Login;
