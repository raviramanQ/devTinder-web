import React from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest } from '../utils/requestSlice'
import { useEffect } from 'react'

const Requests = () => {

  const requests = useSelector((store) => store.request);
  console.log('-0877---',requests);


    const dispatch = useDispatch();
    const fetchRequests = async () => {
        try{
    
            const res = await axios.get(BASE_URL+"/user/request/received",{withCredentials:true});
    
            console.log('----',res.data.data);

            dispatch(addRequest(res.data.data));
    
        }
        catch(err){
    
        }
    }
    
    useEffect(()=>{

      fetchRequests();

    },[]);

    if(!requests) return;

    if(requests.length == 0) return <h1>No request Found</h1>


    return (
      <div className="flex flex-col items-center my-10 px-4">
        {/* Heading */}
        <h1 className="font-bold text-3xl text-white mb-8">Requests</h1>

        <div className="w-full max-w-xl flex flex-col gap-6">
            {requests.map((request, idx) => {
              const { firstName, lastName, age, gender, about, photoUrl } = request.fromUserId;
              return (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-4 bg-gray-800 text-white p-5 rounded-2xl shadow-lg duration-300"
                >
                  <img
                    src={photoUrl}
                    alt={`${firstName} ${lastName}`}
                    className="w-16 h-16 rounded-full object-cover border-1 border-gray-700"
                  />
                  <div>
                    <h2 className="text-xl font-semibold">
                      {firstName} {lastName}
                    </h2>
                    {age && gender && (
                      <p className="text-sm text-gray-400">
                        {age}, {gender}
                      </p>
                    )}
                    <p className="text-sm text-gray-300">{about}</p>
                  </div>
                  <div>
                    <button className='btn btn-primary mx-2'>Reject</button>
                    <button className='btn btn-secondary mx-2'>Accept</button>

                  </div>
                </div>
              );
            })}
          </div>
    
        
      </div>
    );
}

export default Requests