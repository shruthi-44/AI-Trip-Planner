import axios from 'axios';

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY; // Use .env

const FALLBACK_IMAGE = 'https://via.placeholder.com/400x300?text=No+Image';

export const fetchPlaceImage = async (placeName) => {
  if (!placeName) return FALLBACK_IMAGE;

  try {
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query: placeName,
        per_page: 1,
        orientation: 'landscape',
      },
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    });

    const imageUrl = response.data?.results?.[0]?.urls?.regular;
    return imageUrl || FALLBACK_IMAGE;
  } catch (error) {
    console.error('❌ Error fetching Unsplash image:', error);
    return FALLBACK_IMAGE;
  }
};
