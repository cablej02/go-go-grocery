import { useState, useEffect} from "react";
import Auth from '../utils/auth';
import { login, createUser } from "../api/authAPI";

const Login = () => {
  // State to manage the login form data
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [errorText, setErrorText] = useState('');

  // Clear the error message when the component is loaded
  useEffect(() => {
    setErrorText('');
  },[]);

  // Handle changes in the input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  // Handle form submission for login
  const handleLogin = async () => {
    console.log("logging in:",loginData)
    try {
      // Call the login API endpoint with loginData
      const data = await login(loginData);
      console.log(data)
      // If login is successful, call Auth.login to store the token in localStorage
      Auth.login(data.token);
    } catch (err) {
      setErrorText("Failed to login")
      console.error('Failed to login', err);  // Log any errors that occur during login
    }
  };

  const handleRegister = async () => {
    console.log("registering:",loginData)
    try {
      // Call the login API endpoint with loginData
      const data = await createUser(loginData);
      console.log(data)

      // If account creation is successful, login the user
      if(data){
        handleLogin();
      }else{
        setErrorText("Failed to create account")
      }

    } catch (err) {
      setErrorText("Failed to create account")
      console.error('Failed to login', err);  // Log any errors that occur during login
    }
  }

  return (
    <>
      <div className='card-container card bg-dark my-5 p-4 mx-auto' style={{maxWidth: '500px', width: '100%'}}>
        <form className='form login-form' onSubmit={handleLogin}>
          <h1 className="">Login</h1>
          {/* Username input field */}
          <div className="form-group mt-3">
            {/* <label className="m-2 text-end" style={{minWidth: '80px'}}>Email</label> */}
            <input 
              className="form-input"
              type="email"
              name='email'
              value={loginData.email || ''}
              onChange={handleChange}
              placeholder="Email..."
            />
          </div>
          {/* Password input field */}
          <div className="form-group mt-2">
            {/* <label className="m-2 text-end" style={{minWidth: '80px'}}>Password</label> */}
            <input 
              className="form-input"
              type='password'
              name='password'
              value={loginData.password || ''}
              onChange={handleChange}
              placeholder="Password..."
            />
          </div>
          {/* Submit button for the login form */}
          <div className="form-group mt-3 d-flex gap-3 justify-content-center align-items-center">
            <button className="btn btn-success" type='button' onClick={handleLogin}>Login</button>
            <button className="btn btn-primary" type='button' onClick={handleRegister}>Register</button>
          </div>
          {/* set font color red with bootstrap */}
          <p className="text-danger" >{errorText}</p>
        </form>
      </div>
    </>
  )
};

export default Login;
