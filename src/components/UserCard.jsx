import React from 'react'
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { removeFeed } from '../utils/feedSlice';
import { useDispatch } from 'react-redux';

const UserCard = ({ user }) => {
  const { _id,firstName, lastName, age, photoUrl, about, gender } = user;

  const dispatch = useDispatch();

  const sendRequest = async (status,userId)=>{

    const res = await axios.post(BASE_URL+"/request/send/"+status+"/"+userId,{},{withCredentials:true});

    dispatch(removeFeed(userId));

  }

  return (
    <div className="card bg-base-100 shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow max-w-lg mx-auto">
      {/* Image */}
      <figure className="bg-base-200">
        <img
          src={photoUrl || "https://via.placeholder.com/300x200?text=No+Photo"}
          alt="Profile"
          className="w-full h-64 object-cover"
        />
      </figure>

      {/* Body */}
      <div className="card-body text-center">
        <h2 className="card-title justify-center text-xl font-bold">
          {firstName || "First"} {lastName || "Last"}
        </h2>

        {age && gender && (
          <p className="text-sm text-gray-500">
            {age} years old, {gender}
          </p>
        )}

        <p className="mt-2 text-gray-600 line-clamp-3">
          {about || "No description provided..."}
        </p>

        {/* Buttons */}
        <div className="card-actions flex justify-center gap-4 mt-4">
          <button className="btn btn-primary w-32" onClick={()=>sendRequest('ignored',_id)}>Ignore</button>
          <button className="btn btn-secondary w-32" onClick={()=>sendRequest('interested',_id)}>Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
