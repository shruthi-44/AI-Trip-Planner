import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { FaLocationDot } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { fetchPlaceImage } from '@/service/GlobalAPI'; // ✅ Make sure path is correct

function PlaceCardItem({ place, trip }) {
  const [imageUrl, setImageUrl] = useState('/landing.jpg'); // fallback image

  useEffect(() => {
    const loadImage = async () => {
      const url = await fetchPlaceImage(place.placeName);
      setImageUrl(url);
    };

    loadImage();
  }, [place.placeName]);

  return (
    <div>
      <Link
        to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          place.placeName + ',' + trip?.userSelection?.location?.properties?.name
        )}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="my-4 bg-gray-50 p-2 gap-2 border rounded-lg flex flex-col md:flex-row hover:scale-105 transition-all hover:shadow-md cursor-pointer">
          <div className="py-2 mx-3">
            <img
              src={imageUrl}
              alt={place.placeName}
              className="w-[140px] h-[140px] rounded-xl object-cover"
            />
          </div>
          <div className="flex-1">
            <h2 className="font-medium text-sm text-orange-600">{place.bestTimeToVisit}</h2>
            <h2 className="font-bold">{place.placeName}</h2>
            <p className="text-sm text-gray-500">{place.placeDetails}</p>
            <h2 className="text-blue-700 text-sm">{place.ticketPricing}</h2>
            <h2 className="text-sm text-yellow-500">⭐{place.rating}</h2>
          </div>
          <div className="mt-4 md:mt-36 md:ml-auto">
            <Button>
              <FaLocationDot />
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default PlaceCardItem;
