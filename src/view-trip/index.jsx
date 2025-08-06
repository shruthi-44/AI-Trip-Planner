import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import InfoSection from './components/InfoSection.jsx';
import Hotels from './components/Hotels.jsx';
import Placesvisit from './components/Placesvisit.jsx';
import Footer from './components/Footer.jsx';
function Viewtrip() {
    const {tripId} = useParams();
    const [trip,setTrip] = useState();
    const GetTripData=async()=>{
        const docRef = doc(db, "AiTrips", tripId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setTrip(docSnap.data());
          } else {
            console.log("No such document!");
            toast('No trip found!')
          }
    }
    useEffect(()=>{
        tripId&&GetTripData();
    },[tripId])
  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
    <InfoSection trip={trip} />
      <Hotels trip={trip}/>
      <Placesvisit trip={trip} />
      <Footer />
    </div>
  )
}

export default Viewtrip