import React, { useState } from 'react';
import './UserAddress.css';
import { MdOutlineMyLocation } from "react-icons/md";
import { useRecoilState } from 'recoil';
import { addressAtom } from '../../../atom';

const UserAddress = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [address, setAddress] = useRecoilState(addressAtom);
  const [error, setError] = useState(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  const showPosition = (position) => {
    setLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
    setError(null);
  };

  const showError = (error) => {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        setError("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        setError("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        setError("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        setError("An unknown error occurred.");
        break;
      default:
        setError("An unknown error occurred.");
        break;
    }
  };

  const handleUseCurrentLocation = async () => {
    getLocation();
    if (location.latitude && location.longitude) {
      try {
        const response = await fetch(`http://localhost:3000/address?lat=${location.latitude}&lon=${location.longitude}`);
        const data = await response.json();
        const feature = data.features[0];
        setAddress({
            flat: feature.properties.name || '',
            area: feature.properties.county || '',
            pincode: feature.properties.postcode || '',
            city: feature.properties.state_district || '',
            state: feature.properties.state || ''
      });
        console.log(data);
      } catch (error) {
        console.error('Error fetching address:', error);
      }
    } else {
      console.log('Location not available');
    }
  };

  return (
    <div>
      <div className='header'>
        <p className="text">Location</p>
      </div>
      <div className='mt-20 ml-4 mr-4 bg-white'>
        <div className='flex items-center justify-center bg-white'>
          <div className="p-4 rounded-lg">
            <div className="relative bg-inherit">
              <input type="text" value={address.address} onChange={(e)=> setAddress({ ...address, flat: e.target.value })} id="building" name="building" className="bg-white peer bg-transparent h-10 w-80 rounded-lg text-black placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600" placeholder="Type inside me"/>
              <label htmlFor="building" className="bg-white absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all">Building, Company, Apartment, Lane</label>
            </div>
          </div>
          <div className="p-4 rounded-lg">
            <div className="relative bg-inherit">
              <input type="text" value={address.area} onChange={(e)=> setAddress({ ...address, area: e.target.value })} id="area" name="area" className="bg-white peer bg-transparent h-10 w-80 rounded-lg text-black placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600" placeholder="Type inside me"/>
              <label htmlFor="area" className="bg-white absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all">Area, Locality, Village</label>
            </div>
          </div>
        </div>
        <div className='flex items-center justify-center'>
          <div className="p-4 rounded-lg">
            <div className="relative bg-inherit">
              <input type="text" value={address.pincode} onChange={(e)=> setAddress({ ...address, pincode: e.target.value })} id="pincode" name="pincode" className="bg-white peer bg-transparent h-10 w-52 rounded-lg text-black placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600" placeholder="Type inside me"/>
              <label htmlFor="pincode" className="bg-white absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all">Pincode</label>
            </div>
          </div>
          <div className="p-4 rounded-lg">
            <div className="relative bg-inherit">
              <input type="text" value={address.city} onChange={(e)=> setAddress({ ...address, city: e.target.value })} id="city" name="city" className="bg-white peer bg-transparent h-10 w-52 rounded-lg text-black placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600" placeholder="Type inside me"/>
              <label htmlFor="city" className="bg-white absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all">City</label>
            </div>
          </div>
          <div className="p-4 rounded-lg">
            <div className="relative bg-inherit">
              <input type="text" value={address.state} onChange={(e)=> setAddress({ ...address, state: e.target.value })} id="state" name="state" className="bg-white peer bg-transparent h-10 w-52 rounded-lg text-black placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600" placeholder="Type inside me"/>
              <label htmlFor="state" className="bg-white absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all">State</label>
            </div>
          </div>
        </div>
      </div>
      <div className="inline-flex items-center justify-center w-full">
        <hr className="w-64 h-px my-8 border-0 dark:bg-gray-700"/>
        <span className="absolute px-3 text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-black text-xl font-semibold">OR</span>
      </div>
      <div className="flex flex-col items-center justify-center gap-5 mt-6 md:flex-row">
        <div className="inline-block w-auto text-center min-w-[200px] px-6 py-4 text-white transition-all rounded-md shadow-xl sm:w-auto bg-gradient-to-r from-blue-600 to-blue-500 hover:bg-gradient-to-b shadow-blue-200 hover:shadow-2xl hover:shadow-blue-400 hover:-tranneutral-y-px">
          <button onClick={handleUseCurrentLocation} className='locate inline-flex items-center justify-center'>
            <MdOutlineMyLocation className="text-xl text-white" />
            <p className='text-xl'>Use Current Location</p>
          </button>
        </div>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default UserAddress;