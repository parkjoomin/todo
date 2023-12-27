// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const navigate = useNavigate();
//   const [loginError, setLoginError] = useState(null);

//   const handleLogin = async () => {
//     try {
//       // Replace with your actual login API endpoint
//       const response = await fetch('http://localhost:8000/accounts/login/', {
//         method: 'POST',
//         // Include credentials (cookies) for the Django authentication to work
//         credentials: 'include',
//       });

//       if (response.ok) {
//         // Successful login, navigate to the calendar page
//         navigate('/calendar');

//       } else {
//         // Handle login error
//         setLoginError('Login failed. Please check your credentials.');
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       setLoginError('An error occurred during login. Please try again.');
//     }
//   };

//   return (
//     <div>
//       <h1>로그인</h1>
//       <button onClick={handleLogin}>로그인</button>
//       {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
//     </div>
//   );
// };


// export default Login;
