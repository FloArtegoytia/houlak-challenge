import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

const getAccessToken = async () => {
    try {
      const response = await axios.post('https://accounts.spotify.com/api/token', null, {
        params: {
          grant_type: 'client_credentials'
        },
        headers: {
          'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
        }
      });
  
      return response.data.access_token;
    } catch (error) {
      console.error(error);
    }
}

export const getAlbumsByArtist = async (artistName: string) => {
    const accessToken = await getAccessToken();
    try {
        
        // get the artist ID 
        const artistResponse = await axios.get(`https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist&limit=1`, {
            headers: {
            'Authorization': `Bearer ${accessToken}`
            }
        });

        const artistId = artistResponse.data.artists.items[0].id;
    
        // get the artist albums
        const albumsResponse = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album&limit=50`, {
            headers: {
            'Authorization': `Bearer ${accessToken}`
            }
        });
        
        const albumsIds = albumsResponse.data.items.map((album: any) => album.id);
        const albumsPopularity = [];

        for (let i = 0; i < albumsIds.length; i++) {
            const albumId = albumsIds[i];

            const albumResponse = await axios.get(`https://api.spotify.com/v1/albums/${albumsIds[i]}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            });
            albumsPopularity.push(albumResponse.data);
        };

        // sort the albums for popularity
        const sortedAlbums = albumsPopularity.sort((a: any, b: any) => b.popularity - a.popularity);
        return sortedAlbums;

        } catch (error) {
            console.error(error);
        }
  }