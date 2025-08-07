import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { IoIosSend } from "react-icons/io";
import { fetchPlaceImage } from '@/service/GlobalAPI';

function InfoSection({ trip }) {
  const [imageUrl, setImageUrl] = useState('/landing.jpg'); // fallback

  const locationName = trip?.userSelection?.location?.properties?.name;

  useEffect(() => {
    if (locationName) {
      fetchPlaceImage(locationName).then((url) => {
        if (url) setImageUrl(url);
      });
    }
  }, [locationName]);

  return (
    <div>
      <img
        src={imageUrl}
        className='h-[330px] w-full object-cover rounded-xl'
        alt='Trip Cover'
      />

      <div className='flex justify-between items-center'>
        <div className='my-6 flex flex-col gap-2'>
          <h2 className='font-bold text-3xl'>
            {locationName}
          </h2>

          <div className='flex gap-6 mt-2 flex-wrap py-0 '>
            <h2 className='bg-gray-200 font-medium text-gray-600 rounded-full p-1 px-4 md:text-md'>
              🗓️  {trip?.userSelection?.totalDays} Days
            </h2>
            <h2 className='bg-gray-200 font-medium text-gray-600 rounded-full p-1 px-4 md:text-md'>
              👩‍👧‍👦 Travelers: {trip?.userSelection?.traveler}
            </h2>
            <h2 className='bg-gray-200 font-medium text-gray-600 rounded-full p-1 px-4 md:text-md'>
              💵 Budget: {trip?.userSelection?.budget}
            </h2>
          </div>
        </div>

        <Button className='mr-6'>
          <IoIosSend />
        </Button>
      </div>

     
    </div>
  );
}

export default InfoSection;

