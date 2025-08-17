import React,{useEffect} from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'

const Connections = () => {

const connections = useSelector((store) => store.connection);
console.log('-0877---',connections);


const dispatch = useDispatch();
    const fetchConnections = async () => {
        try{
    
            const res = await axios.get(BASE_URL+"/user/connections",{withCredentials:true});
    
            console.log('----',res.data.data);

            dispatch(addConnections(res.data.data));
    
        }
        catch(err){
    
        }
    }
    
    useEffect(()=>{

      fetchConnections();

    },[]);

    if(!connections) return;

    if(connections.length == 0) return <h1>No connections Found</h1>

    return (
        <div className="flex flex-col items-center my-10 px-4">
          {/* Heading */}
          <h1 className="font-bold text-3xl text-white mb-8">Connections</h1>
      
          <div className="w-full max-w-xl flex flex-col gap-6">
            {connections.map((connection, idx) => {
              const { firstName, lastName, age, gender, about, photoUrl } = connection;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-4 bg-gray-800 text-white p-5 rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-transform duration-300"
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
                </div>
              );
            })}
          </div>
        </div>
      );
      
}

export default Connections