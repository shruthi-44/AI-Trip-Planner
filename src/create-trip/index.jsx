import Places from './Places.jsx';
import React, { useState,useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {SelectBudgetOptions, SelectTravelList} from '@/constants/options.jsx';
import { toast } from "sonner"
import { AI_PROMPT } from '@/constants/options.jsx';
import { generateTripPlan } from '@/service/gemini.js';
import axios from 'axios';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { setDoc, doc } from "firebase/firestore";
import { db } from '@/service/firebaseConfig.jsx'; 
import { useNavigate } from 'react-router-dom';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  } from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google"

function CreateTrip() {
 

  const [destination, setDestination] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
   const [openDialog,setOpenDialog]=useState(false);

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
      setFormData({
    ...formData,
    [name]: value
  });
};
  useEffect(()=>{ 
    console.log(formData)
  },[formData])
 const login=useGoogleLogin({
    onSuccess:(codeResp)=>GetUserProfile(codeResp,setOpenDialog),
    onError:(error)=>console.log(error)
  })
  
 const handleSubmit = async () => {
   const user = localStorage.getItem('user')
    if(!user){
      setOpenDialog(true)
      return ;
    }

  if (formData.totalDays > 5 || formData.totalDays < 1) {
    toast("Total days must be between 1 and 5");
    return;
  }

  if (!destination || !formData.totalDays || !formData.budget || !formData.traveler) {
    toast("Please fill all the fields");
    return;
  }

  setLoading(true);


  
    const FINAL_PROMPT = AI_PROMPT
  .replace('{location}', formData?.location?.properties?.name || "your destination")
  .replace('{totalDays}', formData?.totalDays || "3")
  .replace('{traveler}', formData?.traveler || "2 people")
  .replace('{budget}', formData?.budget || "moderate");


    try {
    const aiResponse = await generateTripPlan(FINAL_PROMPT);
    console.log("-- AI Response --", aiResponse);
    SaveAiTrip(aiResponse);
    toast("Trip plan generated!");
  } catch (error) {
    console.error("AI trip generation failed:", error);
    toast("Failed to generate trip. Please try again.");
  } finally {
    setLoading(false);
  }
 
  
};

 const SaveAiTrip = async (TripData) => {
  setLoading(true);
  const user = JSON.parse(localStorage.getItem("user"));
  const docId = Date.now().toString();

  await setDoc(doc(db, "AiTrips", docId), {
    userSelection: formData,
    tripData: TripData, // no JSON.parse here!
    userEmail: user?.email,
    id: docId
  });

  setLoading(false);
  navigate('/view-trip/' + docId);
};


  
const GetUserProfile = (tokenInfo, setOpenDialog, OnGenerateTrip) => {
  console.log("Access Token:", tokenInfo?.access_token);

  axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
    headers: {
      Authorization: `Bearer ${tokenInfo?.access_token}`,
      Accept: 'application/json',
    }
  })
  .then((resp) => {
    console.log("User Info:", resp.data);
    localStorage.setItem('user', JSON.stringify(resp.data));
    
    setOpenDialog(false);
    OnGenerateTrip();  // Call trip generation after user login
  })
  .catch((error) => {
    console.error("Failed to fetch user profile:", error.response?.data || error.message);
  });
};


return (
    <div className="max-w-4xl mx-auto px-5 sm:px-10 mt-10 space-y-10">
       <h2 className="font-bold text-3xl mb-0">Tell us your travel preferences 🏕️📍</h2>
      <p className="mt-3 text-gray-500 text-xl  ">
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences
      </p>
      <div>
        <h2 className="text-xl font-semibold mb-2">What is destination of choice?</h2>
        <Places onSelect={(place) => {
  setDestination(place); handleInputChange('location', place);
}} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">How many days are you planning your trip</h2>
        <Input
         
          placeholder="e.g. 5"
          onChange={(v)=>handleInputChange('totalDays',v.target.value)}
          className="w-full"
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold">What is Your Budget?</h2>
        <p className="text-gray-500 mb-4">
          The budget is exclusively allocated for activities and dining purposes.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          { SelectBudgetOptions.map((item,i) => (
            <div key={i}
              onClick={()=>handleInputChange('budget',item.title)}
              className={`border rounded-md p-4 cursor-pointer hover:shadow-xl flex flex-col items-center ${
               formData.budget === item.title ? 'border-blue-600 shadow-md' : ''
              }`}
              >
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Who do you plan on traveling with on your next adventure?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {SelectTravelList.map((item,i) => (
            <div
              key={i}
               onClick={()=>handleInputChange('traveler',item.people)}
              className={`border rounded-md p-4 cursor-pointer hover:shadow-xl flex flex-col items-center ${
               formData.traveler === item.people? 'border-blue-600 shadow-md' : ''
              }`}
            >
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              <h2>{item.people}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center pt-0 pb-10">
        <Button onClick={handleSubmit} disabled={loading} >
          {loading ? 
          <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
           : 'Generate Trip' }
          </Button>
      </div>
     <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <h1 className="text-2xl font-bold text-blue-600">TripBot.</h1>
              <h2 className="font-bold text-lg mt-6">Sign In with Google</h2>
              <p>Sign In to the App with Google authentication securely</p>
              <Button 
              onClick={login} className="w-full mt-5 flex gap-4 items-center">
                <FcGoogle className="h-7 w-7"/>
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  );
}

export default CreateTrip;


