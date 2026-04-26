const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize conditionally
const genAI = process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'YOUR_GEMINI_API_KEY_HERE'
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

exports.generateItinerary = async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) return res.status(400).json({ message: 'Query is required' });

    if (!genAI) {
      console.log('No valid Gemini API Key found. Returning advanced fallback mock data.');
      return res.json({
        success: true,
        data: {
          intent: 'trip_planning',
          location: 'Goa',
          budget: '15000',
          duration: '3 days',
          lowestPrices: {
            flight: '4599',
            train: '1450',
            bus: '899',
            cab: '12000',
            hotel: '2500',
            villa: '8500'
          },
          itinerary: [
            { day: 1, title: 'Arrival & Beach Relaxing', description: 'Check-in to a beachside resort. Explore Baga Beach in the evening.' },
            { day: 2, title: 'Forts & Culture', description: 'Visit Aguada Fort, followed by a trip to the Basilica of Bom Jesus.' },
            { day: 3, title: 'Water Sports & Departure', description: 'Enjoy parasailing at Calangute beach before heading to the airport.' }
          ],
          recommendedHotels: [
            { name: 'Seaside Resort Baga', price: 2500, rating: 4.2 },
            { name: 'Heritage Homestay Panaji', price: 1800, rating: 4.5 }
          ]
        }
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `You are an expert AI travel assistant for YatraMind. Parse the user's natural language query: "${query}"
Return ONLY a valid JSON object with the exact following schema:
{
  "intent": "string",
  "location": "string",
  "currencySymbol": "string (MUST BE exactly '$' for international OR '₹' for India)",
  "budget": "string (Mandatory realistic total cost range. E.g. '50000 - 85000' or '1200 - 2500'. DO NOT write 'Not specified'. Provide a raw estimate!)",
  "duration": "string (E.g. '5 days'. DO NOT write 'Not specified'!)",
  "lowestPrices": {
    "flight": "lowest available flight price in target currency (number only)",
    "train": "lowest available train price in target currency (number only)",
    "bus": "lowest available bus price in target currency (number only)",
    "cab": "lowest available cab/taxi price in target currency (number only)",
    "hotel": "lowest available hotel price per night in target currency (number only)",
    "villa": "lowest available villa price per night in target currency (number only)"
  },
  "itinerary": [{"day": number, "title": "string", "description": "string"}],
  "recommendedHotels": [{"name": "string", "price": number, "rating": number}]
}
Generate highly realistic prices based on general current market knowledge. Ensure international destinations use USD prices and Indian destinations use INR.`;

    const result = await model.generateContent(prompt);
    const aiData = JSON.parse(result.response.text());

    res.json({ success: true, data: aiData });
  } catch (error) {
    console.error('AI API Key rejected/failed. Falling back to advanced mock data.');
    return res.json({
      success: true,
      data: {
        intent: 'trip_planning',
        location: 'Goa',
        budget: '15000',
        duration: '3 days',
        lowestPrices: {
          flight: '4599',
          train: '1450',
          bus: '899',
          cab: '12000',
          hotel: '2500',
          villa: '8500'
        },
        itinerary: [
          { day: 1, title: 'Arrival & Beach Relaxing', description: 'Check-in to a beachside resort. Explore Baga Beach in the evening.' },
          { day: 2, title: 'Forts & Culture', description: 'Visit Aguada Fort, followed by a trip to the Basilica of Bom Jesus.' },
          { day: 3, title: 'Water Sports & Departure', description: 'Enjoy parasailing at Calangute beach before heading to the airport.' }
        ],
        recommendedHotels: [
          { name: 'Seaside Resort Baga', price: 2500, rating: 4.2 },
          { name: 'Heritage Homestay Panaji', price: 1800, rating: 4.5 }
        ]
      }
    });
  }
};
