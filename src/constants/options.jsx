export const SelectBudgetOptions=[
    {
        id:1,
        title:'Cheap',
        desc:"Stay conscious of costs",
        icon:'💵',
    },
    {
        id:2,
        title:'Moderate',
        desc:"Keep cost on the average side",
        icon:'💰',
    },
    {
        id:3,
        title:'Luxury',
        desc:"Don't worry about cost",
        icon:'💎',
    },
]

export const SelectTravelList=[
    {
        id:1,
        title:'Just Me',
        desc:"A sole traveles",
        icon:'🙋🏾‍♀️',
        people:'1',
    },
    {
        id:2,
        title:'A couple',
        desc:"Two travelers",
        icon:'👫🏾',
        people:'2',
    },
    {
        id:3,
        title:'Family',
        desc:"A group of fun loving adv",
        icon:'🏡',
        people:'3 to 5 people',
    },
    {
        id:4,
        title:'Friends',
        desc:"A bunch of thrill-seekers",
        icon:'👩‍👩‍👦‍👦',
        people:'5 to 12 people',
    },
]


export const AI_PROMPT = `
Generate a travel plan **strictly in valid JSON**. 
Rules:
- Return only JSON, no text before or after, no markdown, no code fences.
- All keys must match exactly as provided.
- All numbers must be valid JSON numbers (no strings for coordinates or ratings).
- No trailing commas.
- Ensure JSON is well-formed and parsable.

Requirements:
- Location: {location}
- Duration: {totalDays} Days
- Group Size: {traveler}
- Budget: {budget}
- At least 4 real or realistic hotel recommendations matching budget & group size.
- Hotels must have real or realistic addresses in {location}.
- Include coordinates for each hotel and attraction.
- For each day: at least 3 varied attractions (historical sites, parks, local attractions).

Output JSON in this exact structure:
{
  "tripData": {
    "travelPlan": {
      "location": "{location}",
      "duration": "{totalDays} Days",
      "groupSize": "{traveler}",
      "budget": "{budget}",
      "hotels": [
        {
          "hotelName": "string",
          "address": "string",
          "price": number,
          "image": "string",
          "geoCoordinates": { "lat": number, "lng": number },
          "rating": number,
          "description": "string"
        }
      ],
      "itinerary": [
        {
          "day": "Day 1",
          "places": [
            {
              "placeName": "string",
              "placeDetails": "string",
              "image": "string",
              "geoCoordinates": { "lat": number, "lng": number },
              "ticketPricing": "string",
              "rating": number,
              "bestTimeToVisit": "Morning | Afternoon | Evening"
            }
          ]
        }
      ]
    }
  }
}
`;
