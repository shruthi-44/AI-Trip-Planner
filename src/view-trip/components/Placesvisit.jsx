import React from 'react'
import PlaceCardItem from './PlaceCardItem.jsx';

function Placesvisit({trip}) {
  return (
    <div >
        <h2 className='font-bold text-xl my-7'>Places To Visit</h2>
        <div>
        {trip?.tripData?.travelPlan?.itinerary?.map((item,i)=>(
            <div key={i}>
                <h2 className='font-medium text-l'>{item?.day}</h2>
                <div className='grid md:grid-cols-2 gap-4'>
                          {item.plan?.map((place,i)=>(
                          <PlaceCardItem place={place} trip={trip}/>
                        ))}
                   </div>
        </div>
        ))}
      </div>
    </div>
  )
}

export default Placesvisit