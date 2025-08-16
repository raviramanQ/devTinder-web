import React, { useState } from 'react'
import axios from 'axios'
import { addUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {

    const [emailId, setEmailId] = React.useState('');
    const [password, setPassword] = React.useState('');
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
    

  return (
    <div className='flex justify-center my-20'>
     <div className="card bg-base-300 w-96 shadow-sm">
     <div className="card-body">
       <h2 className="card-title justify-center">Login</h2>
       <div>
       <label className="label">
         <span className="label-text">Email ID</span>
       </label>
       <input type="email" placeholder="email" 
       className="input input-bordered" 
       value={emailId} 
       onChange={(e) => setEmailId(e.target.value)}
       />
       </div>
       <div>
       <label className="label">
         <span className="label-text">Password</span>
       </label>
       <input type="password" placeholder="password"
        className="input input-bordered" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
       </div>
       <p className='text-red-500'>{error}</p>
       <div className="card-actions justify-center">
       <button className="btn btn-primary" onClick={handleLogin}>Login</button>
      </div>
      </div>
     </div>
    </div>
  );
};

export default Login