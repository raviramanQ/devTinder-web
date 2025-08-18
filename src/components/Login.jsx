import React, { useState } from 'react'
import axios from 'axios'
import { addUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {

    const [emailId, setEmailId] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [firstName, setfirstName] = React.useState('');
    const [lastName, setlastName] = React.useState('');
    const [isLoginForm, setisLoginForm] = React.useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error,setError] = useState("");

    const handleLogin = async () => {
        try{

            const res = await axios.post(
              BASE_URL+"/login", 
              { 
                emailId,
                password
            },
          {
            withCredentials: true
          });
          console.log(res.data);
          dispatch(addUser(res.data));
          return navigate("/feed");
        }
        catch(e){
          setError(e?.response?.data)
            console.error(e);
        }
    };

    const handleSignUp = async () => {

      try{

        const res = await axios.post(BASE_URL+"/signup",{
          firstName,lastName,emailId,password
        },
          {withCredentials:true}
        );
// console.log('---resss---',res);
        dispatch(addUser(res?.data?.data));

        return navigate("/profile");

      }
      catch(err){

      }
    }
    

  return (
    <div className='flex justify-center my-20'>
     <div className="card bg-base-300 w-96 shadow-sm">
     <div className="card-body">
       <h2 className="card-title justify-center">{isLoginForm?'Login':'Sign Up'}</h2>
       <div>
       <label className="label">
         <span className="label-text">Email ID</span>
       </label>
       <input type="email" 
       className="input input-bordered" 
       value={emailId} 
       onChange={(e) => setEmailId(e.target.value)}
       />
       </div>
       <div>
       <label className="label">
         <span className="label-text">Password</span>
       </label>
       <input type="password" 
        className="input input-bordered" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
       </div>
       {!isLoginForm && <>
       <div>
       <label className="label">
         <span className="label-text">First Name</span>
       </label>
       <input type="text" 
        className="input input-bordered" 
        value={firstName}
        onChange={(e) => setfirstName(e.target.value)}
        />
       </div>
       <div>
       <label className="label">
         <span className="label-text">Last Name</span>
       </label>
       <input type="text" 
        className="input input-bordered" 
        value={lastName}
        onChange={(e) => setlastName(e.target.value)}
        />
       </div>
       </>
       }
       <p className='text-red-500'>{error}</p>
       <div className="card-actions justify-center">
       <button className="btn btn-primary" onClick={isLoginForm?handleLogin:handleSignUp}>{isLoginForm?'Login':'Sign Up'}</button>
      </div>
      <p className='cursor-pointer justify-center mx-20 py-2' onClick={() => setisLoginForm((value) => !value)}>{isLoginForm ? "New User? SignUp Here" : "Existing User? Login Here"}</p>
      </div>
     </div>
    </div>
  );
};

export default Login