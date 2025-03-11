export const reverseGeocode = async (
  latitude: number,
  longitude: number,
): Promise<string | null> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
    );
    const data = await response.json();

    if (data.address) {
      const {road, neighbourhood, suburb, city, state, postcode, country} =
        data.address;

      const addressParts = [
        data.name || '',
        road || '',
        neighbourhood || '',
        suburb || '',
        city || '',
        state || '',
        postcode || '',
        country || '',
      ].filter(Boolean);

      console.log({addressParts})

      return addressParts.join(', ');
    }

    return null;
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    return null;
  }
};
