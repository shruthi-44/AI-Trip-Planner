import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPlaceImage } from '@/service/GlobalAPI';

function UserTripCard({ trip }) {
  const [photoUrl, setPhotoUrl] = useState('/landing.jpg'); // fallback

  useEffect(() => {
    const loadImage = async () => {
      const placeName = trip?.userSelection?.location?.properties?.name;
      if (placeName) {
        const url = await fetchPlaceImage(placeName);
        setPhotoUrl(url);
      }
    };
    loadImage();
  }, [trip]);

  return (
    <Link to={'/view-trip/' + trip?.id}>
      <div className="hover:scale-105 transition-all hover:shadow-sm">
        <img
          src={photoUrl}
          alt={trip?.userSelection?.location?.properties?.name || 'Trip Location'}
          className="rounded-xl h-[200px] w-full object-cover"
        />
        <div>
          <h2 className="font-medium text-lg">
            {trip?.userSelection?.location?.properties?.name}
          </h2>
          <h2 className="text-sm text-gray-600">
            {trip?.userSelection?.totalDays} Days trip with {trip?.userSelection?.budget}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCard;
