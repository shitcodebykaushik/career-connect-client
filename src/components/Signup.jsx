// src/components/Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();




    // function handleChange(e) {
    //     console.log(user);
    //     setUser((prevState) => ({
    //       ...prevState,
    //       [e.target.name]: e.target.value,
    //     }));
    //   }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        if (!name || !email || !password) {
            setError('Please fill in all fields');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });
            // fetch(`http://localhost:5000/update-job/${id}`, {
            //     method: "PATCH",
            //     headers: { "Content-Type": "application/json"},
            //   body: JSON.stringify(data) ,
            //   })

            const data = await response.json();

            if (response.ok) {
                alert('Registration successful. Please login.');
                navigate('/login');
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error('Error signing up:', error);
            setError('An error occurred. Please try again.');
        }

        setLoading(false);
    };
    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
                <div className="mb-4">
                    <label className="block mb-1">Name</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
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
                    onClick={handleSubmit}
                    className="w-full bg-blue text-white p-2 rounded"
                    disabled={loading}
                >
                    {loading ? 'Signing up...' : 'Sign Up'}
                </button>
            </form>
        </div>
    );
};

export default Signup;
