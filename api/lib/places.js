import { Client } from '@googlemaps/google-maps-services-js';

const client = new Client({});
const businessPlaceID = 'ChIJLbSMfFK76IgRiFeXZHbznxo';
const key = process.env.GOOGLE_MAPS_API_KEY;

export default async () => {
  try {
    const response = await client.placeDetails({ params: { key, place_id: businessPlaceID, fields: ['reviews'] } });
    return response.data.result;
  } catch (error) {
    console.log(error);
    return null;
  }
}