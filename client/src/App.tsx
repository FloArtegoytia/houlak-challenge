import React, { useState } from 'react';
import { Container, Grid, Paper, TextField, Button, CircularProgress, Alert, Typography, Card, CardMedia, CardContent } from '@mui/material';
import axios from 'axios';

interface Image {
  height: number, 
  url: string, 
  width: number
}

interface Album {
  id: string;
  name: string;
  images: Array<Image>;
}

const App = () => {
  const [artistName, setArtistName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [albums, setAlbums] = useState<Album[]>([]);

  const handleOnClick = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8080/albums', {
        name: artistName,
      });
      
      setAlbums([]);
      response.data.map((album: any) => {
        const auxAlbum = {
          id: album.id,
          name: album.name,
          images: album.images
        } as Album;

        setAlbums(oldArray => [...oldArray, auxAlbum]);
      })

    } catch (error) {
      console.error(error);
      setError('Error al obtener los álbumes del artista.');
    }

    setIsLoading(false);
  }

  const selectImage = (images: Image[]): string => {
    const screenWidth = window.innerWidth;
    const selectedImage = images.find((image) => image.height <= screenWidth);

    if (selectedImage) {
      return selectedImage.url;
    } else {
      return images[images.length - 1].url;
    }
  };

  const renderAlbumList = (
    <Grid container spacing={2} mt={4}>
      {albums.map((album) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={album.id}>
          <Card>
            <CardMedia
              component="img"
              alt={album.name}
              image={selectImage(album.images)}
            />
            <CardContent>
              <Typography variant="h6" component="h3" gutterBottom>
                {album.name}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )

  return (
    <Container maxWidth="md" className="py-4" sx={{ mt:"24px" }}>
      <Grid container spacing={3} justifyContent="center" direction="column">
        <Typography variant="h4" sx={{ mt:"24px", ml:"24px" }}>Spotify Albums</Typography>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} className="p-3">
            <TextField
              label="Artist name"
              fullWidth
              value={artistName}
              onChange={(event) => setArtistName(event.target.value)}
            />

            <Button variant="contained" color="primary" type="submit" disabled={isLoading} onClick={handleOnClick}>
              {isLoading ? <CircularProgress size={24} /> : 'Buscar'}
            </Button>

            {error && (
              <Alert severity="error" className="mt-3">
                {error}
              </Alert>
            )}
          </Paper>
        </Grid>
      </Grid>
      {renderAlbumList}
    </Container> 
  );
}

export default App;
