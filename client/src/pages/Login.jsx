import  { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Illustration from '../assets/illustration.jpg'; // Replace with the path to your image

const LoginSection = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Add login logic here
    navigate('/Home');
  };

  return (
    <div className="flex w-full h-screen">
      {/* Left side with illustration */}
      <div className="hidden lg:block w-1/2" style={{ backgroundImage: `url(${Illustration})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        {/* You can put additional content over your image here if needed */}
      </div>

      {/* Right side with form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center ">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <div className="mb-4">
            <h2 className="text-3xl font-bold text-gray-800 mt-2 py-2">Hello There!</h2>
            <p className="text-gray-500">Welcome, you’ve been missed!</p>
          </div>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <input 
                type="text" 
                placeholder="Enter username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-6">
              <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded"
              />
            </div>
            <div className="flex justify-between items-center mb-6">
              <button 
                type="submit" 
                className="bg-red-500 text-white rounded py-2 px-4 hover:bg-red-600 focus:outline-none w-full"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginSection;
