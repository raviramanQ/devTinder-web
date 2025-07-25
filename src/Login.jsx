import React from 'react'
import axios from 'axios'

const Login = () => {

    const [emailId, setEmailId] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleLogin = async () => {
        try{

            const res = await axios.post("http://localhost:7777/login", {
                emailId,
                password
            });
        }
        catch(e){
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
       <div className="card-actions justify-center">
       <button className="btn btn-primary" onClick={handleLogin}>Login</button>
      </div>
      </div>
     </div>
    </div>
  );
};

export default Login