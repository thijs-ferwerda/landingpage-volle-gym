export default async function handler(req, res) {
    // Volle Gym Nederland Place ID
    const PLACE_ID = 'ChIJ7R69iF5rxkcRHsC5oGOCanI';
    // API key provided by user
    const API_KEY = 'AIzaSyDb9FMqYFQhvBhAJ2R7DmPdBZGh4-Ww0Sc';

    try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&language=nl&reviews_sort=newest&key=${API_KEY}`);

        if (!response.ok) {
            throw new Error(`Google API responded with status ${response.status}`);
        }

        const data = await response.json();

        // Cache this response at the edge for 1 hour (3600 seconds) to save API quota
        res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching Google Reviews:', error);
        res.status(500).json({ error: 'Failed to fetch live reviews' });
    }
}
