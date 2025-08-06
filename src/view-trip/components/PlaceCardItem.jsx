import { Button } from '@/components/ui/button';
// import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';

function PlaceCardItem({ place ,  trip }) {
    // const [photoUrl, setPhotoUrl] = useState();

    // useEffect(() => {
    //     place && GetPlaceImg();
    // }, [place])

    // const GetPlaceImg = async () => {
    //     const data = {
    //         textQuery: place.placeName
    //     }
    //     const result = await GetPlaceDetails(data).then(resp => {
    //         const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name)
    //         setPhotoUrl(PhotoUrl);

    //     })
    // }
   return (
        <div>
           <Link
                         to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                           place.placeName +","+ trip?.userSelection?.location?.properties?.name 
                         )}`}
                         target="_blank"
              rel="noopener noreferrer"
                         >
                <div className='my-4 bg-gray-50 p-2 gap-2 border rounded-lg flex flex-col md:flex-row hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
                    <div className='py-2 mx-3'>
                        <img src='/landing.jpg' className='w-[140px] h-[140px] rounded-xl object-cover' />
                    </div>
                    <div className='flex-1'>
                        <h2 className='font-medium text-sm text-orange-600'>{place.bestTime}</h2>
                        <h2 className='font-bold'>{place.placeName}</h2>
                        <p className='text-sm text-gray-500'>{place.placeDetails}</p>
                        <h2 className='text-blue-700 text-sm'>{place.ticketPricing}</h2>
                        <h2 className='text-sm text-yellow-500'>⭐{place.rating}</h2>
                    </div>
                    <div className='mt-4 md:mt-36 md:ml-auto'>
                        <Button><FaLocationDot /></Button>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default PlaceCardItem