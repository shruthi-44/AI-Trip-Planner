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


export const AI_PROMPT = `Generate a travel plan in strict JSON format. 
Requirements:
- Provide at least 4 high-quality hotel recommendations that are **local to the destination** ({location}).
-recommend for hotels that are **budget-friendly** to **moderate** based on the provided budget ({budget}).
- Hotels must be real or realistic, include addresses specific to {location}, and match the group size and {budget}.
- Prioritize hotels with high ratings and diverse pricing (budget-friendly to moderate).
- Only include hotels around {location}, not generic or international chains unless available locally.
- Include a detailed itinerary for each day, with at least 3 places to visit per day.

The JSON must have this exact structure:

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
          "price": "string",
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

Ensure that all keys are exactly as shown above. Do not include explanations or markdown. Only output pure JSON.`;
