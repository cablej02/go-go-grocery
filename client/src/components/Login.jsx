import { useState} from "react";
import Auth from '../utils/auth';
import { login, createUser } from "../api/authAPI";


const Login = () => {
  // State to manage the login form data
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });


  // Handle changes in the input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleSuscribe = async () => {  
    try {
      const data = await createUser(loginData);
      handleSubmit();
    } catch (error) {
      console.error('Failed to register', error)
    }
    
  }

  // Handle form submission for login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the login API endpoint with loginData
      const data = await login(loginData);
      // If login is successful, call Auth.login to store the token in localStorage
      Auth.login(data.token);
    } catch (err) {
      console.error('Failed to login', err);  // Log any errors that occur during login
    }
  };

  return (
    <>
    <div style={{justifyContent: "center"}}>
      
    <div className='card-container card bg-secondary m-5 p-5' style={{width: "100%"}}>
      <form className='form login-form' onSubmit={handleSubmit}>
        <h1>Login</h1>
        {/* Username input field */}
        <div className="form-group">
          <label className="m-2">Email</label>
          <input 
            className="form-input"
            type='text'
            name='email'
            value={loginData.email || ''}
            onChange={handleChange}
          />
        </div>
        {/* Password input field */}
        <div className="form-group">
          <label className="m-2">Password</label>
          <input 
            className="form-input"
            type='password'
            name='password'
            value={loginData.password || ''}
            onChange={handleChange}
          />
        </div>
        {/* Submit button for the login form */}
        <div className="form-group">
          <button className="btn btn-primary" type='submit'>Login</button>
          <button className="btn btn-primary" type='button' onClick={handleSuscribe}>Suscribe</button>
        </div>
      </form>
    </div>

    </div>
    </>
  )
};

export default Login;
