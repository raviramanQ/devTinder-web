import React, { useState } from 'react'
import axios from 'axios'
import { addUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import UserCard from './UserCard';

const Editprofile = (user) => {

    console.log('-7656789----',user.user);
    

    const [firstName, setFirstName] = React.useState(user.user.firstName);
    const [lastName, setLastName] = React.useState(user.user.lastName);
    const [age, setAge] = React.useState(user.user.age);
    const [photoUrl, setPhotoUrl] = React.useState(user.user.photoUrl);
    const [gender, setGender] = React.useState(user.user.gender);
    const [about, setAbout] = React.useState(user.user.about);
    const [error,setError] = useState("");
    const [showToasst, setShowToast] = useState(false);

    const dispatch = useDispatch();
    // const navigate = useNavigate();

    const saveProfile = async () => {
        setError("");
        try{

            const res = await axios.patch(
              BASE_URL+"/profile/edit", 
              { 
                firstName,
                lastName,
                age,
                gender,
                about,
                photoUrl,
            },
          {
            withCredentials: true
          });
        //   console.log(res.data);
          dispatch(addUser(res.data.data));
          setShowToast(true);

          const i = setTimeout(() => {
            setShowToast(false);
          },3000);
        }
        catch(e){
          setError(e?.response?.data)
            console.error(e);
        }
    };
    

    return (
        <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10 items-stretch max-w-6xl mx-auto">
          {/* Edit Profile Card */}
          <div className="card bg-base-100 shadow-2xl rounded-2xl flex flex-col flex-1">
            <div className="card-body flex flex-col flex-1">
              <h2 className="text-2xl font-bold text-center mb-4">Edit Profile</h2>
      
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                {/* First Name */}
                <div>
                  <label className="label">
                    <span className="label-text">First Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="First name"
                    className="input input-bordered w-full"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
      
                {/* Last Name */}
                <div>
                  <label className="label">
                    <span className="label-text">Last Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Last name"
                    className="input input-bordered w-full"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
      
                {/* Age */}
                <div>
                  <label className="label">
                    <span className="label-text">Age</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Age"
                    className="input input-bordered w-full"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>
      
                {/* Gender */}
                <div>
                  <label className="label">
                    <span className="label-text">Gender</span>
                  </label>
                  <select
                    className="select select-bordered w-full"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option disabled value="">
                      Select gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
      
                {/* Photo URL */}
                <div className="sm:col-span-2">
                  <label className="label">
                    <span className="label-text">Photo URL</span>
                  </label>
                  <input
                    type="text"
                    placeholder="https://example.com/photo.jpg"
                    className="input input-bordered w-full"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </div>
      
                {/* About */}
                <div className="sm:col-span-2 flex-1">
                  <label className="label">
                    <span className="label-text">About</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered w-full"
                    placeholder="Tell us about yourself..."
                    rows={3}
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </div>
              </div>
      
              {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      
              <div className="card-actions justify-center mt-4">
                <button className="btn btn-primary w-full sm:w-1/2" onClick={saveProfile}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
      
          {/* Profile Preview */}
          <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
        </div>
        {showToasst && (<div className="toast toast-center toast-top">
        <div className="alert alert-success">
            <span>Profile Edit successfully.</span>
        </div>
        </div>
        )
    }
        </>
        
      );
      
      
};

export default Editprofile