import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPlaceImage } from '@/service/GlobalAPI';

function Hotels({ trip }) {
  const hotels = trip?.tripData?.tripData?.travelPlan?.hotels || [];
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const fetchedImages = await Promise.all(
        hotels.map((hotel) => fetchPlaceImage(hotel.hotelName))
      );
      setImages(fetchedImages);
    };

    if (hotels.length > 0) fetchImages();
  }, [hotels]);

  return (
    <div>
      <h2 className="font-bold text-xl my-7">Hotel Recommendations</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {hotels.map((hotel, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-transform hover:scale-105 flex flex-col h-full"
          >
            <Link
              to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                hotel.hotelName + ', ' + hotel.address
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="p-4 flex flex-col h-full">
                <img
                  src={images[index] || '/landing.jpg'}
                  alt={hotel.hotelName}
                  className="rounded-xl w-full h-48 object-cover mb-4"
                />
                <div className="flex flex-col justify-between flex-grow">
                  <div className="mb-2">
                    <h2 className="font-semibold text-lg">{hotel.hotelName}</h2>
                    <p className="text-sm text-gray-500">
                      📍{hotel?.address?.split(' ').slice(0, 5).join(' ')}
                    </p>
                  </div>
                  <div className="mt-auto text-sm">
                    <p>💰 {hotel.price}</p>
                    <p>⭐ {hotel.rating}</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
